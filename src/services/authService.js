import http from './httpService'

function saveJwt({ token, refreshToken }) {
  localStorage.setItem('access-token', token)
  localStorage.setItem('refresh-token', refreshToken)
}

export async function login(user) {
  const { jwt } = await http.post('/auth/login', user).then(data => data.data)
  if (!jwt) return false
  saveJwt(jwt)
  return true
}

export async function register(user) {
  const { jwt } = await http
    .post('/auth/register', user)
    .then(data => data.data)

  if (!jwt) return false

  saveJwt(jwt)
  return true
}

export function isUsernameTaken(username) {
  return http.get('/auth/is-taken?username=' + username).then(data => data.data)
}

export function isEmailTaken(email) {
  return http.get('/auth/is-taken?email=' + email).then(data => data.data)
}

export const jwt = {
  token: localStorage.getItem('access-token'),
  refreshToken: localStorage.getItem('refresh-token')
}
