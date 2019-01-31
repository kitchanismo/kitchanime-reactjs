import { useEffect, useReducer } from 'react'
import { SET_ITEMS } from './types'

const useResource = (request, items, args) => {
  const reducer = (state, action) => {
    const { payload, type } = action
    switch (type) {
      case SET_ITEMS:
        return { ...state, [items]: payload }
      default:
        return state
    }
  }
  const initialState = {
    [items]: [],
    refresh: true
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    request({ ...args }).then(response => {
      dispatch({ type: SET_ITEMS, payload: response[items] })
    })
  }, [])

  return { state, dispatch }
}

export default useResource
