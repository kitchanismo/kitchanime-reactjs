import React, { useContext, useState, useEffect } from 'react'
import { AnimeContext } from '../context'
import { pagination } from '../config.json'
import { sortBy } from '../services/utilsService'

import {
  getPagedAnimes,
  deleteAnime,
  getAnime,
  getStudios,
  getGenres,
  getSeasons,
  getTypes,
  putAnime,
  postAnime
} from '../services/animeService'

const AnimeStore = props => {
  const [animes, setAnimes] = useState([])
  const [total, setTotal] = useState(0)
  const [paginate, setPaginate] = useState({
    pageNum: 1,
    pages: 0,
    total: null
  })

  // n+1 issue
  useEffect(
    () => {
      handleLoad()
    },
    [total]
  )

  //initial load
  useEffect(() => {
    handleLoad()
  }, [])

  const handleLoad = async () => {
    let { data: _animes, lastPage, total: _total } = await getPagedAnimes(
      paginate.pageNum,
      pagination.perPage
    )

    const _paginate = { ...paginate }

    _paginate.pages = lastPage

    setTotal(_total)
    setAnimes(_animes)
    setPaginate(_paginate)
  }

  const handlePageChange = async pageNum => {
    const _paginate = { ...paginate }

    if (_paginate.pageNum === pageNum) return

    _paginate.pageNum = pageNum

    let { data: animes, total: _total, lastPage } = await getPagedAnimes(
      pageNum,
      pagination.perPage
    )
    _paginate.pageNum = pageNum
    _paginate.pages = lastPage

    setAnimes(animes)
    setTotal(_total)
    setPaginate(_paginate)
  }

  const handleSort = sortColumn => setAnimes(sortBy(animes, sortColumn))

  const handleDelete = async anime => {
    const originalAnimes = [...animes]
    const _paginate = { ...paginate }
    try {
      const filteredAnimes = originalAnimes.filter(a => a.id !== anime.id)

      await deleteAnime(anime.id)

      const newTotal = total - 1

      if (filteredAnimes.length === 0) {
        handlePageChange(_paginate.pageNum - 1)
        return
      }

      setTotal(newTotal)
      setPaginate(_paginate)
      setAnimes(filteredAnimes)
    } catch (err) {
      setPaginate(_paginate)
      setAnimes(originalAnimes)
      setTotal(total)
    }
  }

  return (
    <AnimeContext.Provider
      value={{
        state: { animes, paginate, total },
        onDelete: handleDelete,
        onPageChange: handlePageChange,
        onSort: handleSort,
        onReLoad: handleLoad,
        onGetAnime: getAnime,
        onGetStudios: getStudios,
        onGetGenres: getGenres,
        onGetSeasons: getSeasons,
        onGetTypes: getTypes,
        onPutAnime: putAnime,
        onPostAnime: postAnime
      }}
    >
      {props.children}
    </AnimeContext.Provider>
  )
}

export default AnimeStore
