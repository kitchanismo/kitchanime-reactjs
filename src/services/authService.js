import http from './httpService'
import jwtDecode from 'jwt-decode'

function saveJwt({ token, refreshToken }) {
  localStorage.setItem('access-token', token)
  localStorage.setItem('refresh-token', refreshToken)
}

async function login(user) {
  const { jwt } = await http.post('/auth/login', user).then(data => data.data)
  if (!jwt) return false
  saveJwt(jwt)
  return true
}

async function register(user) {
  const { jwt } = await http
    .post('/auth/register', user)
    .then(data => data.data)

  if (!jwt) return false

  saveJwt(jwt)
  return true
}

function logout() {
  localStorage.removeItem('access-token')
  localStorage.removeItem('refresh-token')
}

function getDecodeToken() {
  try {
    const jwt = localStorage.getItem('access-token')
    return { ...jwtDecode(jwt) }
  } catch (ex) {
    return null
  }
}

const getCurrentUser = () =>
  getDecodeToken() ? { ...getDecodeToken().data } : null

const isValidUser = () => (getDecodeToken() ? true : false)

const isAdmin = () => (getDecodeToken() ? getDecodeToken().data.isAdmin : null)

function isUsernameTaken(username) {
  return http.get('/auth/is-taken?username=' + username).then(data => data.data)
}

function isEmailTaken(email) {
  return http.get('/auth/is-taken?email=' + email).then(data => data.data)
}

const jwt = {
  token: localStorage.getItem('access-token'),
  refreshToken: localStorage.getItem('refresh-token')
}

export default {
  login,
  register,
  logout,
  getCurrentUser,
  isUsernameTaken,
  isEmailTaken,
  jwt,
  isValidUser,
  isAdmin
}
