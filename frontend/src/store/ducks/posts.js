// Action Types

export const Types = {
  A: 'posts.A'
}

// Reducer

const initialState = {
  posts: [],
  filter: 'all'
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.A:
      return {}
    default:
      return state
  }
}

// Action Creators

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
