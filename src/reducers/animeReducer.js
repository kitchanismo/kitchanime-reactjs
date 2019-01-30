import http from '../services/httpService'

export default async (state, action) => {
  const { num, limit } = action.payload

  switch (action.type) {
    case 'FETCH_ANIMES':
      const data = await http
        .get(`/api/animes/page/${num}?limit=${limit}`)
        .then(response => response.data.data)
      return { ...state, animes: data }
    default: {
      return state
    }
  }
}
