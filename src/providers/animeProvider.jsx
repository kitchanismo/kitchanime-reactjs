import React, { useContext, useState, useEffect, memo } from 'react'
import { AnimeContext } from '../context'
import { pagination } from '../config.json'
import { sortBy } from '../services/utilsService'
import useAnimes from '../hooks/useAnimes'

import {
  deleteAnime,
  getAnime,
  getStudios,
  getGenres,
  getSeasons,
  getTypes,
  putAnime,
  postAnime
} from '../services/animeService'

const AnimeProvider = props => {
  const {
    animes,
    total,
    pageNum,
    pages,
    setPageNum,
    setAnimes,
    setRefresh
  } = useAnimes(pagination.perPage)

  const handlePageChange = async _pageNum => {
    if (pageNum === _pageNum) return

    setPageNum(_pageNum)
    setRefresh(true)
  }

  const handleSort = sortColumn => setAnimes(sortBy(animes, sortColumn))

  const handleDelete = async anime => {
    await deleteAnime(anime.id)

    if (animes.length === 1) {
      const _pageNum = pageNum - 1
      handlePageChange(_pageNum)
      setPageNum(_pageNum)
      return
    }
    setRefresh(true)
  }

  const handleReload = () => setRefresh(new Date())

  return (
    <AnimeContext.Provider
      value={{
        state: { animes, paginate: { pages, pageNum }, total },
        onDelete: handleDelete,
        onPageChange: handlePageChange,
        onSort: handleSort,
        onReLoad: handleReload,
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

export default memo(AnimeProvider)
