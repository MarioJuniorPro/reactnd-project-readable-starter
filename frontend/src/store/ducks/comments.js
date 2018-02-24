import * as api from '../../api/readable-api'

// Action Types

export const Types = {
  FETCH_COMMENTS_SUCCESS: 'categories/FETCH_COMMENTS_SUCCESS',
  FETCH_COMMENTS_FAIL: 'categories/FETCH_COMMENTS_FAIL',
  FETCH_COMMENTS_START: 'categories/FETCH_COMMENTS_START',
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
      const commentTable = { ...state.commentTable, [payload.postId] : payload.comments}
      return { ...state, commentTable: commentTable, isFetching: false }
    case Types.FETCH_COMMENTS_FAIL:
      return { ...state, isFetching: false }
    default:
      return state
  }
}

// Action Creators

export const fetchCommentsStart = data => ({
  type: Types.FETCH_COMMENTS_START
})

export const fetchCommentsSuccess = (data) => ({
  type: Types.FETCH_COMMENTS_SUCCESS,
  payload: {postId: data.postId, comments: data.comments}
})

export const fetchCommentsFail = error => ({
  type: Types.FETCH_COMMENTS_FAIL,
  payload: { error }
})


// Async Action Creators

export const fetchComments = postId => dispatch => {
  dispatch(fetchCommentsStart())
  return api
    .getComments(postId)
    .then(resp => {
      console.log(resp.ok, resp.data)
      resp.ok
        ? dispatch(fetchCommentsSuccess({postId, comments: resp.data})) 
        : dispatch(fetchCommentsFail(resp.problem))
    })
}

export const createComment = (comment) => dispatch => {
  return api.createComment(comment).then(resp => {
    if(resp.ok){
      const postId = comment.parentId
      fetchComments(postId)(dispatch)
    }
  })
}

// Selector

export const getComments= (state, postId) => {
  return state.commentTable[postId] || []
}