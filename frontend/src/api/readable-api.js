import {create} from 'apisauce'

// define the api
const api = create({
  baseURL: 'http://localhost:3001',
  headers: {'Authorization': 'MarioJuniorPro'}
})

// start making calls

export const getPosts = (category) => {
  const url = category ? `/${category}/posts` : '/posts'
  return api.get(url)
}

export const axiosInstance = api.axiosInstance
