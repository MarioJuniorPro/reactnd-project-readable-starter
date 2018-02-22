import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'

import { default as reducer, Types, fetchPosts } from './posts'
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
      voteScore: 6,
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

    it('should handle GET_POSTS_SUCCESS', () => {
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

    it('should handle GET_POSTS_FAIL', () => {
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

    it('should handle GET_POSTS_START', () => {
      const action = { type: Types.FETCH_DATA_START }

      const actual = reducer(undefined, action)
      const expected = {
        list: [],
        isFetching: true
      }
      expect(actual).toEqual(expected)
    })

    describe('async action creators', () => {
      //Setup the mock of API
      const mockApi = new MockAdapter(api.axiosInstance)
      mockApi.onGet('/posts').reply(201, mockPostList)

      afterEach(function() {
        mockApi.reset()
      })

      it('should execute getPosts', (done) => {
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
        }, 1000)
      })
    })
    // it('should handle GET_POSTS_START')
    // it('should handle GET_POSTS_FAIL')
    // it('should handle UPDATE_POST_SUCCESS');
  })
})
