import React, { memo } from 'react'
import { AnimeContext } from '../context'
import { pagination } from '../config.json'
import { sortBy } from '../services/utilsService'
import { getPagedAnimes } from '../services/animeService'

import usePagination from '../hooks/usePagination'

import { SET_ITEMS, SET_PAGENUM, SET_REFRESH } from '../hooks/types'

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
    state: { pageNum, items: animes, pages, total },
    dispatch
  } = usePagination({ request: getPagedAnimes, take: pagination.perPage })

  const handlePageChange = async _pageNum => {
    if (pageNum === _pageNum) return

    handlePageNum(_pageNum)
    handleReload()
  }

  const handleSort = sortColumn => {
    dispatch({ type: SET_ITEMS, payload: sortBy(animes, sortColumn) })
  }

  const handleDelete = async anime => {
    await deleteAnime(anime.id)

    if (animes.length === 1) {
      const _pageNum = pageNum - 1
      handlePageChange(_pageNum)
      handlePageNum(_pageNum)
      return
    }
    handleReload()
  }

  const handlePageNum = pageNum =>
    dispatch({ type: SET_PAGENUM, payload: pageNum })

  const handleReload = () => dispatch({ type: SET_REFRESH, payload: true })

  return (
    <AnimeContext.Provider
      value={{
        state: { animes, paginate: { pages, pageNum }, total },
        dispatch,
        onDelete: handleDelete,
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
