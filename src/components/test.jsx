import React, { useReducer, useEffect, useState } from 'react'
import animeReducer from '../reducers/animeReducer'
import http from '../services/httpService'

const useAnimes = () => {
  // const [animes, setAnimes] = useState(async () => {
  //   const data = await http.get('/api/animes').then(data => data.data)
  //   console.log(data.animes)
  //   return data.animes
  // })
  // return animes
  const [animes, setAnimes] = useState([])
  const [refresh, setRefresh] = useState('')
  useEffect(
    async () => {
      const data = await http.get('/api/animes').then(data => data.data)
      setAnimes(data.animes)
    },
    [refresh]
  )
  return { animes, setAnimes, setRefresh }
}

const TestReducer = () => {
  const [state, dispatch] = useReducer(animeReducer, [])

  const { animes, setAnimes, setRefresh } = useAnimes()

  const handleFetch = async () => {
    const data = await http.get('/api/animes').then(data => data.data)
    dispatch({
      type: 'FETCH_ANIMES',
      payload: { ...data }
    })
  }

  const refreshAnimes = async () => {
    setRefresh(new Date())
  }

  const deleteAnime = id => {
    setAnimes(animes.filter(anime => anime.id !== id))
  }

  return (
    <div className="container">
      <button onClick={refreshAnimes}>fetch</button>
      <button>fetch</button>
      {state.count}
      <ul>
        {animes.map((anime, i) => (
          <li key={i} onClick={() => deleteAnime(anime.id)}>
            {anime.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TestReducer
