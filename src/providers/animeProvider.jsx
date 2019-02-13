import React, { memo } from 'react'
import usePagination from '../hooks/usePagination'
import { AnimeContext } from '../context'
import { pagination } from '../config.json'
import { sortBy } from '../services/utilsService'
import { getPagedAnimes, deleteAnime } from '../services/animeService'
import {
  SET_REFRESH,
  SET_ITEMS,
  SET_PAGENUM,
  SEARCH_ITEMS
} from './../hooks/types'

const AnimeProvider = props => {
  const {
    state: { pageNum, items: animes, pages, total },
    dispatch
  } = usePagination({ request: getPagedAnimes, take: pagination.perPage })

  const handleRefresh = () => {
    dispatch({ type: SET_REFRESH, payload: toggle => !toggle })
  }

  const handlePageChange = pageNum => {
    dispatch({ type: SET_PAGENUM, payload: pageNum })
  }

  const handleDelete = async anime => {
    let _animes = [...animes]

    _animes = _animes.filter(a => a.id !== anime.id)

    dispatch({ type: SET_ITEMS, payload: _animes })

    await deleteAnime(anime.id)

    return _animes.length > 0
  }

  const handleSort = sortColumn => {
    dispatch({ type: SET_ITEMS, payload: sortBy(animes, sortColumn) })
  }

  const handleSearch = title => {
    dispatch({ type: SEARCH_ITEMS, payload: title })
  }

  return (
    <AnimeContext.Provider
      value={{
        state: { animes, pages, pageNum, total },
        onDelete: handleDelete,
        onRefresh: handleRefresh,
        onPageChange: handlePageChange,
        onSort: handleSort,
        onSearch: handleSearch
      }}
    >
      {props.children}
    </AnimeContext.Provider>
  )
}

export default memo(AnimeProvider)
