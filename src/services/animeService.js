import http from './httpService'
import { apiUrl } from '../config.json'

const apiEndpoint = apiUrl + '/animes'

function movieUrl(id) {
  return `${apiEndpoint}/${id}`
}

// export function getAnimes() {
//   return http.get(apiEndpoint)
// }

export function getAnime(movieId) {
  return http.get(movieUrl(movieId))
}

export function getAnimes() {
  return new Promise((resolve, reject) => {
    resolve([
      { id: 1, title: 'abc', description: '123' },
      { id: 2, title: 'bcd', description: '435' }
    ])
  })
}
