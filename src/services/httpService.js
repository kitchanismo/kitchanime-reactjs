import axios from 'axios'
import { toast } from 'react-toastify'
import { appUrl } from '../config.json'

// const token =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU0NzMwMzEwOX0.62iSFsOgQwDM6bsLXgUIq0ZkBV-vy4TehQn0upw2veA'

axios.interceptors.response.use(null, error => {
  return throwError(error)
})

axios.interceptors.request.use(
  config => {
    config.baseURL = appUrl

    return config
  },
  error => {
    return throwError(error)
  }
)

function setJwt({ token }) {
  axios.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${token}`

      return config
    },
    error => {
      return throwError(error)
    }
  )
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  axios,
  setJwt
}

function throwError(error) {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  if (!expectedError) {
    toast.error('An unexpected error occurrred.')
  }

  return Promise.reject(error)
}
