import React, { memo } from 'react'
import { AnimeContext } from '../context'
import { pagination } from '../config.json'
import { sortBy } from '../services/utilsService'
import { getPagedAnimes } from '../services/animeService'

import usePagination from '../hooks/usePagination'

import { SET_ITEMS, SET_PAGENUM, SET_REFRESH } from '../hooks/types'

import { deleteAnime } from '../services/animeService'

const AnimeProvider = props => {
  const {
    state: { pageNum, items: animes, pages, total },
    dispatch
  } = usePagination({ request: getPagedAnimes, take: pagination.perPage })

  return (
    <AnimeContext.Provider
      value={{
        state: { animes, paginate: { pages, pageNum }, total },
        dispatch
      }}
    >
      {props.children}
    </AnimeContext.Provider>
  )
}

export default memo(AnimeProvider)
