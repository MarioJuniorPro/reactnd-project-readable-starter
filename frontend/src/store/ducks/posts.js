import * as api from '../../api/readable-api'

import { delayPromise } from '../../utils/delay-promise'
// Action Types

export const Types = {
  FETCH_DATA_SUCCESS: 'posts/FETCH_DATA_SUCCESS',
  FETCH_DATA_FAIL: 'posts/FETCH_DATA_FAIL',
  FETCH_DATA_START: 'posts/FETCH_DATA_START'
}

// Reducer

const initialState = {
  list: [],
  isFetching: false
}

export default function reducer(state = initialState, action) {
  const { payload } = action
  switch (action.type) {
    case Types.FETCH_DATA_START:
      return { ...state, isFetching: true }
    case Types.FETCH_DATA_SUCCESS:
      return { ...state, list: payload.list, isFetching: false }
    case Types.FETCH_DATA_FAIL:
      return { ...state, list: [], isFetching: false }
    default:
      return state
  }
}

// Action Creators

export const fetchDataSuccess = (data) => ({
  type: Types.FETCH_DATA_SUCCESS,
  payload: { list: data }
})


export const fetchDataFail = (error) => ({
  type: Types.FETCH_DATA_FAIL,
  payload: { error }
})

// Async Action Creators

export const getPosts = category => dispatch => {
  dispatch({ type: Types.FETCH_DATA_START })
  return api
    .getPosts(category)
    .then(resp => {
      resp.ok
        ? dispatch(fetchDataSuccess(resp.data))
        : dispatch(fetchDataFail(resp.problem))
    })
    .catch(error => {
      dispatch(fetchDataFail(error))
    })
}

// Selector

export const getVisiblePosts = (posts = [], category) => category ? posts.filter(post => post.category === category) : posts
