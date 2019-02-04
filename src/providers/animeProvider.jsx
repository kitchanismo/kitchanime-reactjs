import React, { memo } from 'react'
import { AnimeContext } from '../context'
import { pagination } from '../config.json'
import { sortBy } from '../services/utilsService'
import { getPagedAnimes } from '../services/animeService'
import usePagination from '../hooks/usePagination'

const AnimeProvider = props => {
  const {
    state: { pageNum, items: animes, pages, total },
    dispatch
  } = usePagination({ request: getPagedAnimes, take: pagination.perPage })

  return (
    <AnimeContext.Provider
      value={{
        state: { animes, pages, pageNum, total },
        dispatch
      }}
    >
      {props.children}
    </AnimeContext.Provider>
  )
}

export default memo(AnimeProvider)
