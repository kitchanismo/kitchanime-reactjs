import http from './httpService'
import auth from './authService'

export function postGenre(genre) {
  http.setJwt(auth.jwt())
  return http.post('/api/genres', genre).then(data => data.data)
}
