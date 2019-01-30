import React, { useReducer, useEffect } from 'react'
import animeReducer from '../reducers/animeReducer'

const TestReducer = () => {
  const [state, dispatch] = useReducer(animeReducer, [])
  const handleFetch = () => {
    dispatch({
      type: 'FETCH_ANIMES',
      payload: { num: 1, limit: 3 }
    })
    console.log(state)
  }
  return <button onClick={handleFetch}>hey</button>
}

export default TestReducer
