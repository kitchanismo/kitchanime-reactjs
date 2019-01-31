import { useEffect, useReducer } from 'react'
import { getPagedAnimes } from '../services/animeService'

const useAnimes = (initLimit = 5) => {
  const initialState = {
    total: 0,
    animes: [],
    pageNum: 1,
    pages: 0,
    limit: initLimit,
    refresh: true
  }

  const reducer = (state, action) => {
    const { payload, type } = action
    switch (type) {
      case 'SET_PAGENUM':
        return { ...state, pageNum: payload }
      case 'FETCH_ANIMES':
        return { ...state, animes: payload }
      case 'SET_PAGES':
        return { ...state, pages: payload }
      case 'SET_TOTAL':
        return { ...state, total: payload }
      case 'SET_REFRESH':
        return { ...state, refresh: payload }
      default:
        return state
    }
  }

  const [{ refresh, pageNum, limit, ...rest }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(
    () => {
      if (refresh) {
        getPagedAnimes(pageNum, limit).then(response => {
          const { data, lastPage, total } = response
          dispatch({ type: 'FETCH_ANIMES', payload: data })
          dispatch({ type: 'SET_PAGES', payload: lastPage })
          dispatch({ type: 'SET_TOTAL', payload: total })
          dispatch({ type: 'SET_REFRESH', refresh: false })
        })
      }
    },
    [refresh]
  )

  return {
    state: { refresh, pageNum, limit, ...rest },
    dispatch
  }
}

export default useAnimes
