import http from './httpService'
import auth from './authService'

export function postStudio(studio) {
  http.setJwt(auth.jwt())
  return http.post('/api/studios', studio).then(data => data.data)
}
