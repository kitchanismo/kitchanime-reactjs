import { useState, useEffect } from 'react'
import http from '../services/httpService'

const useAnimes = (num, limit) => {
  const [animes, setAnimes] = useState([])
  const [total, setTotal] = useState(0)
  const [paginate, setPaginate] = useState({
    pageNum: 1,
    pages: 0
  })
  useEffect(
    () => {
      ;(async (num, limit) => {
        const { data, lastPage, total } = await http
          .get(`/api/animes/page/${num}?limit=${limit}`)
          .then(data => data.data.data)

        const _paginate = { ...paginate }
        _paginate.pages = lastPage

        setAnimes(data)
        setTotal(total)
        setPaginate(_paginate)
      })(num, limit)
    },
    [num, limit]
  )

  return { animes, total, paginate, setAnimes, setTotal, setPaginate }
}

export default useAnimes
