import http from './httpService'
import { jwt } from './authService'

export function getAnimes() {
  return http.get('/api/animes').then(data => data.data)
}

export function getPagedAnimes(num, limit) {
  return http
    .get(`/api/animes/page/${num}?limit=${limit}`)
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

export function getSeasons() {
  return [
    { label: 'Winter', value: 'winter' },
    { label: 'Spring', value: 'spring' },
    { label: 'Summer', value: 'summer' },
    { label: 'Fall', value: 'fall' }
  ]
}

export function getTypes() {
  return [
    { label: 'TV', value: 'tv' },
    { label: 'Movie', value: 'movie' },
    { label: 'OVA', value: 'ova' },
    { label: 'ONA', value: 'ona' },
    { label: 'Other', value: 'other' }
  ]
}

export function postAnime(anime) {
  http.setJwt(jwt)
  return http.post('/api/animes', anime).then(data => data.data)
}

export function putAnime(id, anime) {
  http.setJwt(jwt)
  return http.put('/api/animes/' + id, anime).then(data => data.data)
}

export function deleteAnime(id) {
  http.setJwt(jwt)
  return http.delete('/api/animes/' + id).then(data => data.data)
}
