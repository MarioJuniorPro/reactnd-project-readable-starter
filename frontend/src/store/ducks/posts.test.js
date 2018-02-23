import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'

import {
  default as reducer,
  Types,
  fetchPosts,
  upVotePost,
  downVotePost,
  getVisiblePosts,
  deletePost,
  getSortedPosts,
  getSortedAndVisiblePosts
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
    },
    {
      id: '8xf0y6ziyjabvozdd253ne',
      timestamp: 1467166872634,
      title: 'Mock 2',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'redux',
      voteScore: 0,
      deleted: true,
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
      const expected = { list: [], isFetching: false, sortBy: 'voteScore_desc' }
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
        isFetching: false,
        sortBy: 'voteScore_desc'
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
        isFetching: false,
        sortBy: 'voteScore_desc'
      }
      expect(actual).toEqual(expected)
    })

    it('should handle FETCH_DATA_START', () => {
      const action = { type: Types.FETCH_DATA_START }

      const actual = reducer(undefined, action)
      const expected = {
        list: [],
        isFetching: true,
        sortBy: 'voteScore_desc'
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
            id: 'haushdunx',
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
          },
          {
            id: 'haushdunx',
            voteScore: -1
          }
        ]
      }
      expect(actual).toEqual(expected)
    })

    it('should handle DELETE_POST_SUCCESS', () => {
      const initialState = {
        list: [
          {
            id: '8xf0y6ziyjabvozdd253nd'
          },
          {
            id: 'haushdunx'
          },
        ]
      }

      const action = {
        type: Types.DELETE_POST_SUCCESS,
        payload: { id: '8xf0y6ziyjabvozdd253nd' }
      }

      const actual = reducer(initialState, action)
      const expected = {
        list: [
          {
            id: 'haushdunx'
          }
        ]
      }
      expect(actual).toEqual(expected)
    });

    it('should getVisiblePost unfiltered using getVisiblePosts()', () => {
      const actual = getVisiblePosts({ list: mockPostList })
      const expected = [{
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 0,
        deleted: false,
        commentCount: 2
      }]
      expect(actual).toEqual(expected)
    })

    it('should getVisiblePost filtered using getVisiblePosts()', () => {
      const actual = getVisiblePosts({ list: mockPostList }, 'a not existing category')
      const expected = []
      expect(actual).toEqual(expected)
    })

    it('should sort list by sortBy voteScore_desc using getSortedPosts()', () => {
      const initialState = {
        list: [
          {
            id: 'vote1',
            timestamp: 1467166872634,
            voteScore: -10
          },
          {
            id: 'vote2',
            timestamp: 1467166072634,
            voteScore: 20,
          }
        ],
        sortBy: 'voteScore_desc'
      }

      const actual = getSortedPosts(initialState)
      const expected =  [
        {
          id: 'vote2',
          timestamp: 1467166072634,
          voteScore: 20,
        },
        {
          id: 'vote1',
          timestamp: 1467166872634,
          voteScore: -10
        }
      ]
      expect(actual).toEqual(expected)
    });

    it('should sort list by sortBy voteScore_asc using getSortedPosts()', () => {
      const initialState = {
        list: [
          {
            id: 'vote1',
            timestamp: 1467166872634,
            voteScore: -10
          },
          {
            id: 'vote2',
            timestamp: 1467166072634,
            voteScore: 20,
          }
        ],
        sortBy: 'voteScore_asc'
      }

      const actual = getSortedPosts(initialState)
      const expected =  [
        {
          id: 'vote1',
          timestamp: 1467166872634,
          voteScore: -10
        },
        {
          id: 'vote2',
          timestamp: 1467166072634,
          voteScore: 20,
        }
      ]
      expect(actual).toEqual(expected)
    });

    it('should sort list by sortBy timestamp_desc getSortedPosts()', () => {
      const initialState = {
        list: [
          {
            id: 'vote1',
            timestamp: 1467166872634,
            voteScore: -10
          },
          {
            id: 'vote2',
            timestamp: 1467166072634,
            voteScore: 20,
          }
        ],
        sortBy: 'timestamp_desc'
      }

      const actual = getSortedPosts(initialState)
      const expected =  [
        {
          id: 'vote1',
          timestamp: 1467166872634,
          voteScore: -10
        },
        {
          id: 'vote2',
          timestamp: 1467166072634,
          voteScore: 20,
        }
      ]
      expect(actual).toEqual(expected)
    });

    it('should sort list by sortBy timestamp_asc using getSortedPosts()', () => {
      const initialState = {
        list: [
          {
            id: 'vote1',
            timestamp: 1467166872634,
            voteScore: -10
          },
          {
            id: 'vote2',
            timestamp: 1467166072634,
            voteScore: 20,
          }
        ],
        sortBy: 'timestamp_asc'
      }

      const actual = getSortedPosts(initialState)
      const expected =  [
        {
          id: 'vote2',
          timestamp: 1467166072634,
          voteScore: 20,
        },
        {
          id: 'vote1',
          timestamp: 1467166872634,
          voteScore: -10
        },
      ]
      expect(actual).toEqual(expected)
    });

    it('should get visible sorted posts using getSortedAndVisiblePosts()', () => {
      const initialState = {
        list: [
          {
            id: 'vote1',
            timestamp: 1467166872634,
            voteScore: -10,
            deleted: true
          },
          {
            id: 'vote2',
            timestamp: 1467166072634,
            voteScore: -20,
            deleted: false
          },
          {
            id: 'vote3',
            timestamp: 1467166072634,
            voteScore: 30,
            deleted: false
          }
        ],
        sortBy: 'voteScore_desc'
      }

      const actual = getSortedAndVisiblePosts(initialState)
      const expected =  [
        {
          id: 'vote3',
          timestamp: 1467166072634,
          voteScore: 30,
          deleted: false
        },
        {
          id: 'vote2',
          timestamp: 1467166072634,
          voteScore: -20,
          deleted: false
        }
      ]
      expect(actual).toEqual(expected)
    });

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
        mockApi
          .onDelete('/posts/8xf0y6ziyjabvozdd253nd')
          .reply(200)
      })

      afterEach(() => {
        mockApi.reset()
      })

      it(
        'should execute fetchPosts',
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
        'should execute fetchPosts with fail',
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

      
      it(
        'should execute deletePost',
        done => {
          expect.assertions(1)
          const store = mockStore({})

          store.dispatch(deletePost('8xf0y6ziyjabvozdd253nd')).then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({ payload: { id: "8xf0y6ziyjabvozdd253nd" }, type: Types.DELETE_POST_SUCCESS})
            done()
          })
        },
        1000
      )
    })
  })
})
