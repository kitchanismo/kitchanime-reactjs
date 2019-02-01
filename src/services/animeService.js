import http from './httpService'
import auth from './authService'

export function getAnimes() {
  return http.get('/api/animes').then(data => data.data)
}

export function getPagedAnimes(num, limit, title = '') {
  return http
    .get(`/api/animes/page/${num}?limit=${limit}&title=${title}`)
    .then(data => data.data.data)
}

export function getGenres() {
  return http.get('/api/genres').then(data => data.data)
}

export function getStudios() {
  return http.get('/api/studios').then(data => data.data)
}

export function getAnime(id) {
  return http.get(`/api/animes/${id}`).then(data => data.data)
}

export const getSeasons = [
  { label: 'Winter', value: 'winter' },
  { label: 'Spring', value: 'spring' },
  { label: 'Summer', value: 'summer' },
  { label: 'Fall', value: 'fall' }
]

export const getTypes = [
  { label: 'TV', value: 'tv' },
  { label: 'Movie', value: 'movie' },
  { label: 'OVA', value: 'ova' },
  { label: 'ONA', value: 'ona' },
  { label: 'Other', value: 'other' }
]

export function postAnime(anime) {
  http.setJwt(auth.jwt())
  return http.post('/api/animes', anime).then(data => data.data)
}

export function putAnime(id, anime) {
  http.setJwt(auth.jwt())
  return http.put('/api/animes/' + id, anime).then(data => data.data)
}

export function deleteAnime(id) {
  http.setJwt(auth.jwt())
  return http.delete('/api/animes/' + id).then(data => data.data)
}
