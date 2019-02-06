import axios from 'axios'
import { toast } from 'react-toastify'
import { appUrl as apiURL } from '../config.json'

axios.interceptors.response.use(
  response => response,
  error => {
    return throwError(error)
  }
)

axios.interceptors.request.use(config => {
  config.baseURL = process.env.API_URL || apiUrl
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

function saveJwt({ token, refreshToken }) {
  localStorage.setItem('access-token', token)

  localStorage.setItem('refresh-token', refreshToken)
}
let isRefreshing = false

function throwError(error) {
  const config = error.config

  if (error.response && error.response.data.status.name === 'ExpiredJwtToken') {
    toast.error('jwt is expired')
    return Promise.reject(error)
  }
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500
  if (!expectedError) {
    toast.error('An unexpected error occurrred.')
  }
  return Promise.reject(error)

  // if (error.response && error.response.data.status.name === 'ExpiredJwtToken') {
  //   if (!isRefreshing) {
  //     isRefreshing = true
  //     axios.interceptors.request.use(config => {
  //       config.headers.Authorization = `Bearer ${localStorage.getItem(
  //         'access-token'
  //       )}`

  //       return config
  //     })
  //     axios
  //       .post('/token/refresh', {
  //         refreshToken: localStorage.getItem('refresh-token')
  //       })
  //       .then((data,x) => {
  //         console.log(data,x)
  //         // saveJwt(data.data.jwt)
  //         isRefreshing = false
  //       })
  //   }
  //   return config
  // }
}
