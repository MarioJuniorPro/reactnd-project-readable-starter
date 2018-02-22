import { create } from 'apisauce'

// define the api
const api = create({
  baseURL: 'http://localhost:3001',
  headers: { Authorization: 'MarioJuniorPro' }
})

// start making calls

export const getPosts = category => {
  const url = category ? `/${category}/posts` : '/posts'
  return api.get(url)
}

export const upVotePost = id => {
  const url = `/posts/${id}`
  return api.post(url, {
    option: 'upVote'
  })
}

export const downVotePost = id => {
  const url = `/posts/${id}`
  return api.post(url, {
    option: 'downVote'
  })
}

export const deletePost = id => {
  const url = `/posts/${id}`
  return api.delete(url)
}


export const axiosInstance = api.axiosInstance
