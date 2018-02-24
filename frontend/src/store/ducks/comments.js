import * as api from '../../api/readable-api'

// Action Types

export const Types = {
  FETCH_COMMENTS_SUCCESS: 'categories/FETCH_COMMENTS_SUCCESS',
  FETCH_COMMENTS_FAIL: 'categories/FETCH_COMMENTS_FAIL',
  FETCH_COMMENTS_START: 'categories/FETCH_COMMENTS_START',
  UPDATE_VOTE_SCORE: 'categories/UPDATE_VOTE_SCORE'
}

// Reducer

const initialState = {
  commentTable: {},
  isFetching: false
}

export default function reducer(state = initialState, action) {
  const { payload } = action
  switch (action.type) {
    case Types.FETCH_COMMENTS_START:
      return { ...state, isFetching: true }
    case Types.FETCH_COMMENTS_SUCCESS:
      const commentTable = {
        ...state.commentTable,
        [payload.postId]: payload.comments
      }
      return { ...state, commentTable: commentTable, isFetching: false }
    case Types.FETCH_COMMENTS_FAIL:
      return { ...state, isFetching: false }
    case Types.UPDATE_VOTE_SCORE: {
      const table = { ...state.commentTable }
      const commentTableUpdated = Object.keys(table).reduce(
        (acc, cur) => {
          acc[cur] = (table[cur] || []).map(comment => {
            return comment.id === payload.id
              ? { ...comment, voteScore: payload.voteScore }
              : comment
          })
          return acc
        }, {}
      )
      return { ...state, commentTable: commentTableUpdated, isFetching: false }
    }
    default:
      return state
  }
}

// Action Creators

export const fetchCommentsStart = data => ({
  type: Types.FETCH_COMMENTS_START
})

export const fetchCommentsSuccess = data => ({
  type: Types.FETCH_COMMENTS_SUCCESS,
  payload: { postId: data.postId, comments: data.comments }
})

export const fetchCommentsFail = error => ({
  type: Types.FETCH_COMMENTS_FAIL,
  payload: { error }
})

export const updateVoteScore = (id, voteScore) => ({
  type: Types.UPDATE_VOTE_SCORE,
  payload: { id, voteScore }
})

// Async Action Creators

export const fetchComments = postId => dispatch => {
  dispatch(fetchCommentsStart())
  return api.getComments(postId).then(resp => {
    console.log(resp.ok, resp.data)
    resp.ok
      ? dispatch(fetchCommentsSuccess({ postId, comments: resp.data }))
      : dispatch(fetchCommentsFail(resp.problem))
  })
}

export const createComment = comment => dispatch => {
  return api.createComment(comment).then(resp => {
    if (resp.ok) {
      const postId = comment.parentId
      fetchComments(postId)(dispatch)
    }
  })
}

export const upVoteComment = id => dispatch => {
  return api.upVoteComment(id).then(resp => {
    return resp.ok ? dispatch(updateVoteScore(id, resp.data.voteScore)) : null
  })
}

export const downVoteComment = id => dispatch => {
  return api.downVoteComment(id).then(resp => {
    return resp.ok ? dispatch(updateVoteScore(id, resp.data.voteScore)) : null
  })
}

// Selector

export const getComments = (state, postId) => {
  return state.commentTable[postId] || []
}
