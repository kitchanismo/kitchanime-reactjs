import http from './httpService'

export function isUsernameTaken(username) {
  return http
    .get('/api/users/is-taken?username=' + username)
    .then(data => data.data)
}

export function isEmailTaken(email) {
  return http.get('/api/users/is-taken?email=' + email).then(data => data.data)
}
