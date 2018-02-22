import * as api from '../../api/readable-api'

// Action Types

export const Types = {
  FETCH_DATA_SUCCESS: 'categories/FETCH_DATA_SUCCESS',
  FETCH_DATA_FAIL: 'categories/FETCH_DATA_FAIL',
  FETCH_DATA_START: 'categories/FETCH_DATA_START',
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

// Async Action Creators

export const fetchCategories = () => dispatch => {
  dispatch(fetchDataStart())
  return api
    .getCategories()
    .then(resp => {
      console.log('resp', resp.ok, resp.problem)
      resp.ok
        ? dispatch(fetchDataSuccess(resp.data.categories))
        : dispatch(fetchDataFail(resp.problem))
    })
}

// Selector