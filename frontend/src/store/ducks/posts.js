import * as api from '../../api/readable-api'

// Action Types

export const Types = {
  FETCH_DATA_SUCCESS: 'posts/FETCH_DATA_SUCCESS',
  FETCH_DATA_FAIL: 'posts/FETCH_DATA_FAIL',
  FETCH_DATA_START: 'posts/FETCH_DATA_START',
  UPDATE_VOTE_SCORE: 'posts/UPDATE_VOTE_SCORE',
  UPDATE_SORT_BY: 'posts/UPDATE_SORT_BY',
  DELETE_POST_SUCCESS: 'posts/DELETE_POST_SUCCESS'
}

// Reducer

const initialState = {
  list: [],
  isFetching: false,
  sortBy: 'voteScore_desc'
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
    case Types.DELETE_POST_SUCCESS: {
      return {
        ...state,
        list: state.list.filter(post => post.id !== payload.id)
      }
    }
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

export const deletePostSuccess = id => ({
  type: Types.DELETE_POST_SUCCESS,
  payload: { id }
})

export const updateSortBy = sortBy => ({
  type: Types.UPDATE_SORT_BY,
  payload: { sortBy }
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