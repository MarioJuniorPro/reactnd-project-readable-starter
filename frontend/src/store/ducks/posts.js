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
  // list: [
  //   {
  //       "id": "8xf0y6ziyjabvozdd253nd",
  //       "timestamp": 1467166872634,
  //       "title": "Udacity is the best place to learn React",
  //       "body": "Everyone says so after all.",
  //       "author": "thingtwo",
  //       "category": "react",
  //       "voteScore": 6,
  //       "deleted": false,
  //       "commentCount": 2
  //   },
  //   {
  //       "id": "6ni6ok3ym7mf1p33lnez",
  //       "timestamp": 1468479767190,
  //       "title": "Learn Redux in 10 minutes!",
  //       "body": "Just kidding. It takes more than 10 minutes to learn technology.Just kidding. It takes more than 10 minutes to learn technology.Just kidding. It takes more than 10 minutes to learn technology.Just kidding. It takes more than 10 minutes to learn technology.",
  //       "author": "thingone",
  //       "category": "redux",
  //       "voteScore": -5000,
  //       "deleted": false,
  //       "commentCount": 4000
  //   }
  list: [],
  isFetching: false
  // filter: 'all'
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

// export function getPosts(filter) {
//   return {
//     type: Types.A,
//     payload: {
//       a,
//       b
//     }
//   }
// }

export function act(a, b) {
  return {
    type: Types.A,
    payload: {
      a,
      b
    }
  }
}

// Async Action Creators

const dataset = [
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
  },
  {
    id: '6ni6ok3ym7mf1p33lnez',
    timestamp: 1468479767190,
    title: 'Learn Redux in 10 minutes!',
    body:
      'Just kidding. It takes more than 10 minutes to learn technology.Just kidding. It takes more than 10 minutes to learn technology.Just kidding. It takes more than 10 minutes to learn technology.Just kidding. It takes more than 10 minutes to learn technology.',
    author: 'thingone',
    category: 'redux',
    voteScore: -5000,
    deleted: false,
    commentCount: 4000
  }
]

export const getPosts = category => dispatch => {
  console.log('category',category)
  dispatch({ type: Types.FETCH_DATA_START })
  return api
    .getPosts(category)
    .then(resp => {
      dispatch({ type: Types.FETCH_DATA_SUCCESS, payload: { list: resp.data } })
    })
    .catch(error => {
      dispatch({ type: Types.FETCH_DATA_FAIL, payload: { error } })
    })
}
