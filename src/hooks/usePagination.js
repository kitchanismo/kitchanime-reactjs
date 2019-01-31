import { useEffect, useReducer } from 'react'

export const FETCH_ITEMS = 'FETCH_ITEMS' // array
export const SET_PAGENUM = 'SET_PAGENUM' // number, active page
export const SET_PAGES = 'SET_PAGES' // number, total no. of pages
export const SET_TOTAL = 'SET_TOTAL' // number, total no. of items
export const SET_REFRESH = 'SET_REFRESH' // boolean, do reload page

const reducer = (state, action) => {
  const { payload, type } = action
  switch (type) {
    case SET_PAGENUM:
      return { ...state, pageNum: payload }
    case FETCH_ITEMS:
      return { ...state, items: payload }
    case SET_PAGES:
      return { ...state, pages: payload }
    case SET_TOTAL:
      return { ...state, total: payload }
    case SET_REFRESH:
      return { ...state, refresh: payload }
    default:
      return state
  }
}

// customize the properties of response data in the usePagination arguments
//
// consume usePagination e.g.
// const { state: { items: movies, pageNum, pages, total }, dispatch}
// = usePagination({ request: getMovies, take: 10, total: 'count', pages: 'pagesCount', items: 'movies' })

const usePagination = ({
  request,
  items = 'data',
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
    refresh: true
  }
  const [{ refresh, pageNum, ...rest }, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(
    () => {
      if (refresh) {
        request(pageNum, take).then(response => {
          dispatch({ type: 'FETCH_ITEMS', payload: response[items] })
          dispatch({ type: 'SET_PAGES', payload: response[pages] })
          dispatch({ type: 'SET_TOTAL', payload: response[total] })
          dispatch({ type: 'SET_REFRESH', refresh: false })
        })
      }
    },
    [refresh]
  )

  return {
    state: { refresh, pageNum, take, ...rest },
    dispatch
  }
}

export default usePagination
