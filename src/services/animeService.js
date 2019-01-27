import http from './httpService'

export function getAnimes() {
  return http.get('/animes').then(data => data.data)
}

export function getPagedAnimes(num, limit) {
  return http
    .get(`/animes/page/${num}?limit=${limit}`)
    .then(data => data.data.data)
}

export function getGenres() {
  return http.get('/genres').then(data => data.data)
}

export function getStudios() {
  return http.get('/studios').then(data => data.data)
}

export function getAnime(id) {
  return http.get(`/animes/${id}`).then(data => data.data)
}

export function getSeasons() {
  return [
    { label: 'winter', value: 'winter' },
    { label: 'spring', value: 'spring' },
    { label: 'summer', value: 'summer' },
    { label: 'fall', value: 'fall' }
  ]
}

export function getTypes() {
  return [
    { label: 'tv', value: 'tv' },
    { label: 'movie', value: 'movie' },
    { label: 'ova', value: 'ova' },
    { label: 'ona', value: 'ona' },
    { label: 'other', value: 'other' }
  ]
}

export function postAnime(anime) {
  return http.post('/animes', anime).then(data => data.data)
}

export function putAnime(id, anime) {
  return http.put('/animes/' + id, anime).then(data => data.data)
}

export function deleteAnime(id) {
  return http.delete('/animes/' + id).then(data => data.data)
}
