import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'

import {
  default as reducer,
  Types,
  fetchPosts,
  upVotePost,
  downVotePost,
  getVisiblePosts
} from './posts'
import * as api from '../../api/readable-api'

describe('Posts Duck', () => {
  const middlewares = [thunk] // add your middlewares like `redux-thunk`
  const mockStore = configureStore(middlewares)

  const mockPostList = [
    {
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1467166872634,
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'react',
      voteScore: 0,
      deleted: false,
      commentCount: 2
    }
  ]

  describe('posts reducer', () => {
    it('should return an function by default', () => {
      const actual = typeof reducer
      const expected = 'function'
      expect(actual).toBe(expected)
    })

    it('should return the initial state', () => {
      const actual = reducer(undefined, {})
      const expected = { list: [], isFetching: false }
      expect(actual).toEqual(expected)
    })

    it('should handle FETCH_DATA_SUCCESS', () => {
      const action = {
        type: Types.FETCH_DATA_SUCCESS,
        payload: { list: mockPostList }
      }

      const actual = reducer(undefined, action)
      const expected = {
        list: mockPostList,
        isFetching: false
      }
      expect(actual).toEqual(expected)
    })

    it('should handle FETCH_DATA_FAIL', () => {
      const action = {
        type: Types.FETCH_DATA_FAIL,
        payload: { error: 'Ops! some error' }
      }

      const actual = reducer(undefined, action)
      const expected = {
        list: [],
        isFetching: false
      }
      expect(actual).toEqual(expected)
    })

    it('should handle FETCH_DATA_START', () => {
      const action = { type: Types.FETCH_DATA_START }

      const actual = reducer(undefined, action)
      const expected = {
        list: [],
        isFetching: true
      }
      expect(actual).toEqual(expected)
    })

    it('should handle UPDATE_VOTE_SCORE', () => {
      const initialState = {
        list: [
          {
            id: '8xf0y6ziyjabvozdd253nd',
            voteScore: 0
          },
          {
            id: '8xf0y6ziyjabvozdd253nx',
            voteScore: -1
          }
        ]
      }

      const action = {
        type: Types.UPDATE_VOTE_SCORE,
        payload: { id: '8xf0y6ziyjabvozdd253nd', voteScore: -1 }
      }

      const actual = reducer(initialState, action)
      const expected = {
        list: [
          {
            id: '8xf0y6ziyjabvozdd253nd',
            voteScore: -1
          }
        ]
      }
      expect(actual).toEqual(expected)
    })

    it('should getVisiblePost unfiltered', () => {
      const actual = getVisiblePosts(mockPostList)
      const expected = mockPostList
      expect(actual).toEqual(expected)
    })

    it('should getVisiblePost filtered', () => {
      const actual = getVisiblePosts(mockPostList, 'a not existing category')
      const expected = []
      expect(actual).toEqual(expected)
    })

    describe('async action creators', () => {
      //Setup the mock of API
      let mockApi

      beforeEach(() => {
        mockApi = new MockAdapter(api.axiosInstance)
        mockApi.onGet('/posts').reply(200, mockPostList)
        mockApi
          .onPost('/posts/8xf0y6ziyjabvozdd253nd', { option: 'upVote' })
          .reply(200, { id: '8xf0y6ziyjabvozdd253nd', voteScore: 27 })
        mockApi
          .onPost('/posts/8xf0y6ziyjabvozdd253nd', { option: 'downVote' })
          .reply(200, { id: '8xf0y6ziyjabvozdd253nd', voteScore: -15 })
      })

      afterEach(() => {
        mockApi.reset()
      })

      it(
        'should execute getPosts',
        done => {
          expect.assertions(2)
          const store = mockStore({})

          store.dispatch(fetchPosts()).then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({ type: Types.FETCH_DATA_START })
            expect(actions[1]).toEqual({
              type: Types.FETCH_DATA_SUCCESS,
              payload: { list: mockPostList }
            })
            done()
          })
        },
        1000
      )

      it(
        'should execute getPosts with fail',
        done => {
          mockApi.onGet('/posts').reply(500)
          expect.assertions(2)
          const store = mockStore({})

          store.dispatch(fetchPosts()).then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({ type: Types.FETCH_DATA_START })
            expect(actions[1]).toEqual({
              payload: { error: 'SERVER_ERROR' },
              type: Types.FETCH_DATA_FAIL
            })
            done()
          })
        },
        1000
      )

      it(
        'should execute upVotePost',
        done => {
          expect.assertions(1)
          const store = mockStore({})
          store.dispatch(upVotePost('8xf0y6ziyjabvozdd253nd')).then(() => {
            const actions = store.getActions()
            const actual = actions[0]
            const expected = {
              type: Types.UPDATE_VOTE_SCORE,
              payload: { id: '8xf0y6ziyjabvozdd253nd', voteScore: 27 }
            }
            expect(actual).toEqual(expected)
            done()
          })
        },
        1000
      )

      it(
        'should execute downVotePost',
        done => {
          expect.assertions(1)
          const store = mockStore({})
          store.dispatch(downVotePost('8xf0y6ziyjabvozdd253nd')).then(() => {
            const actions = store.getActions()
            const actual = actions[0]
            const expected = {
              type: Types.UPDATE_VOTE_SCORE,
              payload: { id: '8xf0y6ziyjabvozdd253nd', voteScore: -15 }
            }
            expect(actual).toEqual(expected)
            done()
          })
        },
        1000
      )
    })
  })
})
