import axios from 'axios'
import { toast } from 'react-toastify'
import { appUrl } from '../config.json'

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU0NzMwMzEwOX0.62iSFsOgQwDM6bsLXgUIq0ZkBV-vy4TehQn0upw2veA'

axios.interceptors.response.use(null, error => {
  return throwError(error)
})

axios.interceptors.request.use(
  config => {
    const { url } = config

    config.baseURL = appUrl

    if (url === '/auth/login' || url === '/auth/register') return config

    // if (method === 'post' || method === 'put' || method === 'delete')
    config.headers.Authorization = `Bearer ${token}`

    return config
  },
  error => {
    return throwError(error)
  }
)

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  axios
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
