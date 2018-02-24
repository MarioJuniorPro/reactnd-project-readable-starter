import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter'
import configureStore from 'redux-mock-store'

import {
  default as reducer,
  Types,
  fetchCategories
} from './categories'
import * as api from '../../api/readable-api'

describe('Categories Duck', () => {
  const middlewares = [thunk] // add your middlewares like `redux-thunk`
  const mockStore = configureStore(middlewares)

  const mockCategoryList = [
    {
      name: 'react',
      path: 'react'
    },
    {
      name: 'redux',
      path: 'redux'
    },
    {
      name: 'udacity',
      path: 'udacity'
    }
  ]

  describe('categories reducer', () => {
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

    it('should handle FETCH_CATEGORIES_SUCCESS', () => {
      const action = {
        type: Types.FETCH_CATEGORIES_SUCCESS,
        payload: { list: mockCategoryList }
      }

      const actual = reducer(undefined, action)
      const expected = {
        list: mockCategoryList,
        isFetching: false
      }
      expect(actual).toEqual(expected)
    })

    it('should handle FETCH_CATEGORIES_FAIL', () => {
      const action = {
        type: Types.FETCH_CATEGORIES_FAIL,
        payload: { error: 'Ops! some error' }
      }

      const actual = reducer(undefined, action)
      const expected = {
        list: [],
        isFetching: false
      }
      expect(actual).toEqual(expected)
    })

    it('should handle FETCH_CATEGORIES_START', () => {
      const action = { type: Types.FETCH_CATEGORIES_START }

      const actual = reducer(undefined, action)
      const expected = {
        list: [],
        isFetching: true
      }
      expect(actual).toEqual(expected)
    })

    describe('async action creators', () => {
      //Setup the mock of API
      let mockApi

      beforeEach(() => {
        mockApi = new MockAdapter(api.axiosInstance)
        mockApi.onGet('/categories').reply(200, { categories: mockCategoryList})
      })

      afterEach(() => {
        mockApi.reset()
      })

      it(
        'should execute fetchCategories',
        done => {
          expect.assertions(2)
          const store = mockStore({})

          store.dispatch(fetchCategories()).then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({ type: Types.FETCH_CATEGORIES_START })
            expect(actions[1]).toEqual({
              type: Types.FETCH_CATEGORIES_SUCCESS,
              payload: { list: mockCategoryList }
            })
            done()
          })
        },
        1000
      )

it(
        'should execute fetchCategories with fail',
        done => {
          mockApi.onGet('/categories').reply(500)
          expect.assertions(2)
          const store = mockStore({})

          store.dispatch(fetchCategories()).then(() => {
            const actions = store.getActions()
            expect(actions[0]).toEqual({ type: Types.FETCH_CATEGORIES_START })
            expect(actions[1]).toEqual({
              payload: { error: 'SERVER_ERROR' },
              type: Types.FETCH_CATEGORIES_FAIL
            })
            done()
          })
        },
        1000
      )

   

    })
  })
})
