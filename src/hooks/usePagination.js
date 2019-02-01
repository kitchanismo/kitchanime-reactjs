import { useEffect, useReducer, useRef } from 'react'
import {
  SET_ITEMS,
  SET_PAGENUM,
  SET_PAGES,
  SET_TOTAL,
  SET_REFRESH
} from './types'

const reducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case SET_PAGENUM:
      return { ...state, pageNum: payload }
    case SET_ITEMS:
      return { ...state, items: payload }
    case SET_PAGES:
      return { ...state, pages: payload }
    case SET_TOTAL:
      return { ...state, total: payload }
    case SET_REFRESH:
      return { ...state, refresh: payload }
    case 'SEARCH_TITLE':
      return { ...state, title: payload }
    default:
      return state
  }
}

// customize the properties of response data in the usePagination arguments
//
//
// consume usePagination e.g.
// const { state: { items: movies, pageNum, pages, total }, dispatch}
// = usePagination({ request: getMovies, take: 10, total: 'count', pages: 'pagesCount', data: 'movies' })

const usePagination = ({
  request,
  data = 'data',
  pages = 'lastPage',
  total = 'total',
  take = 15
}) => {
  const initialState = {
    items: [],
    pageNum: 1,
    pages: 0,
    total: 0,
    take,
    refresh: null
  }
  const [{ refresh, title, pageNum, ...rest }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(
    () => {
      request(pageNum, take, title)
        .then(response => {
          dispatch({ type: SET_ITEMS, payload: response[data] })
          dispatch({ type: SET_PAGES, payload: response[pages] })
          dispatch({ type: SET_TOTAL, payload: response[total] })
        })
        .catch(error => {
          dispatch({ type: SET_ITEMS, payload: [] })
          dispatch({ type: SET_PAGES, payload: 0 })
          dispatch({ type: SET_TOTAL, payload: 0 })
          dispatch({ type: SET_PAGENUM, payload: 0 })
        })
    },
    [refresh, title]
  )

  return {
    state: { pageNum, take, ...rest },
    dispatch
  }
}

export default usePagination
