import http from './httpService'

function setJwt({ token, refreshToken }) {
  localStorage.setItem('access-token', token)
  localStorage.setItem('refresh-token', refreshToken)
}

export async function login(user) {
  const { jwt } = await http.post('/auth/login', user).then(data => data.data)
  if (!jwt) return false
  setJwt(jwt)
  return true
}

export async function register(user) {
  const { jwt } = await http
    .post('/auth/register', user)
    .then(data => data.data)

  if (!jwt) return false

  setJwt(jwt)
  return true
}
