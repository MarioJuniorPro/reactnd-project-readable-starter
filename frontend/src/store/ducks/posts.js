import * as api from '../../api/readable-api'
import _ from 'lodash'

// Action Types

export const Types = {
  FETCH_POSTS_SUCCESS: 'posts/FETCH_POSTS_SUCCESS',
  FETCH_POSTS_FAIL: 'posts/FETCH_POSTS_FAIL',
  FETCH_POSTS_START: 'posts/FETCH_POSTS_START',
  UPDATE_VOTE_SCORE: 'posts/UPDATE_VOTE_SCORE',
  UPDATE_SORT_BY: 'posts/UPDATE_SORT_BY',
  DELETE_POST_SUCCESS: 'posts/DELETE_POST_SUCCESS',
  UPDATE_POST_SUCCESS: 'posts/UPDATE_POST_SUCCESS',
  FETCH_POST_SUCCESS: 'posts/FETCH_POST_SUCCESS',
  FETCH_POST_FAIL: 'posts/FETCH_POST_FAIL',
  FETCH_POST_START: 'posts/FETCH_POST_START',
  
}

// Reducer

const initialState = {
  list: [],
  isFetching: false,
  sortBy: 'voteScore_desc',
  activePost: null
}

export default function reducer(state = initialState, action) {
  const { payload } = action
  switch (action.type) {
    case Types.FETCH_POSTS_START:
      return { ...state, isFetching: true }
    case Types.FETCH_POSTS_SUCCESS:
      return { ...state, list: payload.list, isFetching: false }
    case Types.FETCH_POSTS_FAIL:
      return { ...state, list: [], isFetching: false }
    case Types.UPDATE_VOTE_SCORE: {
      const updatedList = state.list.map(post => {
        return post.id === payload.id
          ? { ...post, voteScore: payload.voteScore }
          : post
      })
      return { ...state, list: updatedList }
    }
    case Types.DELETE_POST_SUCCESS: {
      return {
        ...state,
        list: state.list.filter(post => post.id !== payload.id)
      }
    }
    case Types.UPDATE_POST_SUCCESS: {
      const postIndex = state.list.findIndex(post => post.id === payload.post.id)
      return {
        ...state,
        list: [...state.list.slice(0, postIndex), payload.post, ...state.list.slice(postIndex+1)]
      }
    }
    case Types.FETCH_POST_START: 
      return { ...state, isFetching: true }
    case Types.FETCH_POST_SUCCESS:
      return { ...state, activePost: payload.post, isFetching: false }
    case Types.FETCH_POST_FAIL: 
      return { ...state, activePost: null, isFetching: false }
    case Types.UPDATE_SORT_BY: {
      return {
        ...state,
        sortBy: payload.sortBy
      }
    }
    default:
      return state
  }
}

// Action Creators

export const fetchDataStart = data => ({
  type: Types.FETCH_POSTS_START
})

export const fetchDataSuccess = data => ({
  type: Types.FETCH_POSTS_SUCCESS,
  payload: { list: data }
})

export const fetchDataFail = error => ({
  type: Types.FETCH_POSTS_FAIL,
  payload: { error }
})

export const updateVoteScore = (id, voteScore) => ({
  type: Types.UPDATE_VOTE_SCORE,
  payload: { id, voteScore }
})

export const deletePostSuccess = id => ({
  type: Types.DELETE_POST_SUCCESS,
  payload: { id }
})

export const updatePostSuccess = post => ({
  type: Types.UPDATE_POST_SUCCESS,
  payload: { post }
})

export const updateSortBy = sortBy => ({
  type: Types.UPDATE_SORT_BY,
  payload: { sortBy }
})

export const fetchPostSuccess = post => ({
  type: Types.FETCH_POST_SUCCESS,
  payload: { post }
})

export const fetchPostFail = () => ({
  type: Types.FETCH_POST_FAIL
})


// Async Action Creators

export const fetchPosts = category => dispatch => {
  dispatch(fetchDataStart())
  return api.getPosts(category).then(resp => {
    resp.ok
      ? dispatch(fetchDataSuccess(resp.data))
      : dispatch(fetchDataFail(resp.problem))
  })
}

export const upVotePost = id => dispatch => {
  return api.upVotePost(id).then(resp => {
    return resp.ok ? dispatch(updateVoteScore(id, resp.data.voteScore)) : null
  })
}

export const downVotePost = id => dispatch => {
  return api.downVotePost(id).then(resp => {
    return resp.ok ? dispatch(updateVoteScore(id, resp.data.voteScore)) : null
  })
}

export const deletePost = id => dispatch => {
  return api.deletePost(id).then(resp => {
    return resp.ok ? dispatch(deletePostSuccess(id)) : null
  })
}

export const updatePost = post => dispatch => {
  return api.updatePost(post).then(resp => {
    return resp.ok ? dispatch(updatePostSuccess(resp.data)) : null
  })
}

export const fetchPost = id => dispatch => {
  dispatch(fetchDataStart())
  return api.getPost(id).then(resp => {
    return resp.ok && !_.isEmpty(resp.data)? dispatch(fetchPostSuccess(resp.data)) : dispatch(fetchPostFail())
  })
}

// Selector

export const getVisiblePosts = (state, category) => {
  const visiblePosts = state.list.filter(post => {
    if (post.deleted) return false
    return category ? post.category === category : true
  })
  return visiblePosts
}


export const getSortedPosts = (state) => {
  const [field, order] = state.sortBy.split('_')
  return state.list.slice().sort((a, b) => {
    return order === 'desc' ? (b[field] - a[field]) : (a[field] - b[field])
  })
}

export const getSortedAndVisiblePosts= (state, category) => {
  const withVisiblePosts = {...state, list: getVisiblePosts(state, category)}
  const withSortedPosts = {...withVisiblePosts, list: getSortedPosts(withVisiblePosts)}
  return withSortedPosts.list;
}