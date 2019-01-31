import axios from 'axios'
import { toast } from 'react-toastify'
import { appUrl } from '../config.json'

axios.interceptors.response.use(null, error => {
  return throwError(error)
})

axios.interceptors.request.use(config => {
  config.baseURL = appUrl
  return config
})

function setJwt({ token }) {
  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${token}`

    return config
  })
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
    setJwt({ token: '', refreshToken: '' })
  }

  return Promise.reject(error)
}
