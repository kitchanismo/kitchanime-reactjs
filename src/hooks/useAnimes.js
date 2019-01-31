import { useState, useEffect } from 'react'
import { getPagedAnimes } from '../services/animeService'

const useAnimes = (initLimit = 5) => {
  const [animes, setAnimes] = useState([])
  const [total, setTotal] = useState(0)
  const [refresh, setRefresh] = useState(true)
  const [pages, setPages] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  const [limit, setLimit] = useState(initLimit)

  useEffect(
    async () => {
      if (refresh) {
        const { data, total, lastPage } = await getPagedAnimes(pageNum, limit)

        setAnimes(data)
        setPages(lastPage)
        setTotal(total)
        setRefresh(false)
      }
    },
    [refresh]
  )

  return {
    animes,
    total,
    pageNum,
    pages,
    setPageNum,
    setLimit,
    setAnimes,
    setRefresh
  }
}

export default useAnimes
