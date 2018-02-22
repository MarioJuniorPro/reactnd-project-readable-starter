import * as api from '../../api/readable-api'

import { delayPromise } from '../../utils/delay-promise'
// Action Types

export const Types = {
  FETCH_DATA_SUCCESS: 'posts/FETCH_DATA_SUCCESS',
  FETCH_DATA_FAIL: 'posts/FETCH_DATA_FAIL',
  FETCH_DATA_START: 'posts/FETCH_DATA_START',
  UPDATE_VOTE_SCORE: 'posts/UPDATE_VOTE_SCORE'
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
    case Types.UPDATE_VOTE_SCORE: {
      const updatedList = state.list.map(post => {
        return post.id === payload.id
          ? { ...post, voteScore: payload.voteScore }
          : post
      })
      return { ...state, list: updatedList }
    }
    default:
      return state
  }
}

// Action Creators

export const fetchDataStart = data => ({
  type: Types.FETCH_DATA_START
})

export const fetchDataSuccess = data => ({
  type: Types.FETCH_DATA_SUCCESS,
  payload: { list: data }
})

export const fetchDataFail = error => ({
  type: Types.FETCH_DATA_FAIL,
  payload: { error }
})

export const updateVoteScore = (id, voteScore) => ({
  type: Types.UPDATE_VOTE_SCORE,
  payload: { id, voteScore }
})

// Async Action Creators

export const fetchPosts = category => dispatch => {
  dispatch(fetchDataStart())
  return api
    .getPosts(category)
    .then(resp => {
      resp.ok
        ? dispatch(fetchDataSuccess(resp.data))
        : dispatch(fetchDataFail(resp.problem))
    })
}

export const upVotePost = id => dispatch => {
  return api.upVotePost(id).then(resp => {
    resp.ok ? dispatch(updateVoteScore(id, resp.data.voteScore)) : null
  })
}

export const downVotePost = id => dispatch => {
  return api.downVotePost(id).then(resp => {
    resp.ok ? dispatch(updateVoteScore(id, resp.data.voteScore)) : null
  })
}

// Selector

export const getVisiblePosts = (posts = [], category) =>
  category ? posts.filter(post => post.category === category) : posts
