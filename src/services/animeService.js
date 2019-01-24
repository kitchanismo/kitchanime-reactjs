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

export function getAnime(id) {
  return http.get(`/animes/${id}`).then(data => data.data)
}

export function postAnime(anime) {
  return http.post('/animes', anime)
}
