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
  SEARCH_ITEMS,
  SET_START,
  SET_END
} from './../hooks/types'

const AnimeProvider = props => {
  const {
    state: { pageNum, items: animes, pages, total, ...rest },
    dispatch
  } = usePagination({ request: getPagedAnimes, take: pagination.perPage })

  const handleRefresh = () => {
    dispatch({ type: SET_REFRESH, payload: toggle => !toggle })
  }

  const handlePageChange = pageNum => {
    dispatch({ type: SET_PAGENUM, payload: pageNum })
  }

  const handleDelete = async anime => {
    let originalAnimes = [...animes]

    try {
      const _animes = originalAnimes.filter(a => a.id !== anime.id)

      dispatch({ type: SET_ITEMS, payload: _animes })

      await deleteAnime(anime.id)
      return _animes.length > 0
    } catch (error) {
      dispatch({ type: SET_ITEMS, payload: originalAnimes })
      return originalAnimes.length > 0
    }
  }

  const handleSort = sortColumn => {
    dispatch({ type: SET_ITEMS, payload: sortBy(animes, sortColumn) })
  }

  const handleSearch = title => {
    dispatch({ type: SEARCH_ITEMS, payload: title })
  }

  const handleSetStart = start => {
    dispatch({ type: SET_START, payload: start })
  }

  const handleSetEnd = end => {
    dispatch({ type: SET_END, payload: end })
  }

  return (
    <AnimeContext.Provider
      value={{
        state: { animes, pages, pageNum, total, ...rest },
        onDelete: handleDelete,
        onRefresh: handleRefresh,
        onPageChange: handlePageChange,
        onSort: handleSort,
        onSearch: handleSearch,
        onSetStart: handleSetStart,
        onSetEnd: handleSetEnd
      }}
    >
      {props.children}
    </AnimeContext.Provider>
  )
}

export default memo(AnimeProvider)
