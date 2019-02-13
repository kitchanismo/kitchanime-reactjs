import { useEffect, useReducer } from 'react'
import { mapToSelect } from '../services/utilsService'
import {
  getGenres,
  getStudios,
  getSeasons,
  getTypes
} from '../services/animeService'

export const SET_GENRES = 'SET_GENRES'
export const SET_STUDIOS = 'SET_STUDIOS'
export const SET_SEASONS = 'SET_SEASONS'
export const SET_TYPES = 'SET_TYPES'

const useAnime = () => {
  const reducer = (state, action) => {
    const { payload, type } = action
    switch (type) {
      case SET_GENRES:
        return { ...state, genres: payload }
      case SET_STUDIOS:
        return { ...state, studios: payload }
      case SET_SEASONS:
        return { ...state, seasons: payload }
      case SET_TYPES:
        return { ...state, types: payload }
      default:
        return state
    }
  }
  const initialState = {
    genres: [],
    studios: [],
    types: [],
    seasons: []
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getGenres().then(response => {
      dispatch({
        type: SET_GENRES,
        payload: response.genres.map(g => {
          return mapToSelect(g)
        })
      })
    })

    getStudios().then(response => {
      dispatch({
        type: SET_STUDIOS,
        payload: response.studios.map(g => {
          return mapToSelect(g)
        })
      })
    })

    dispatch({
      type: SET_SEASONS,
      payload: getSeasons
    })
    dispatch({
      type: SET_TYPES,
      payload: getTypes
    })
  }, [])

  return { state, dispatch }
}

export default useAnime
