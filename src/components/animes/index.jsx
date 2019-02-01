import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimeContext } from '../../context'
import Table from '../partials/table'

import { formatDate } from '../../services/utilsService'
import auth from '../../services/authService'
import { toast } from 'react-toastify'
import { sortBy } from './../../services/utilsService'
import { SET_ITEMS, SET_PAGENUM, SET_REFRESH } from './../../hooks/types'
import { deleteAnime } from '../../services/animeService'

const Animes = props => {
  const {
    state: { animes, pageNum },
    dispatch
  } = useContext(AnimeContext)

  const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' })

  const columns = [
    {
      path: 'title',
      label: 'Title',
      content: anime => <Link to={`/animes/${anime.id}`}>{anime.title}</Link>
    },
    { path: 'season', label: 'Season' },
    {
      path: 'releaseDate',
      label: 'Release'
    },
    {
      path: 'type',
      label: 'Type'
    },
    {
      label: 'Genres',
      content: anime => renderItemsName(anime.genres)
    },
    {
      label: 'Studios',
      content: anime => renderItemsName(anime.studios)
    },
    {
      key: 'actions',
      label: 'Actions',
      content: anime => (
        <div className="d-flex justify-content-center">
          <Link to={`/animes/${anime.id}`}>
            <button className="btn btn-warning btn-sm mr-1 fa fa-pencil text-white" />
          </Link>
          <button
            onClick={async () => await doDelete(anime)}
            className="btn btn-danger btn-sm fa fa-trash text-white"
          />
        </div>
      )
    }
  ]

  const doDelete = async anime => {
    if (!auth.isAdmin()) {
      toast.error('Unauthorized user')
      return
    }

    let _animes = [...animes]

    _animes = _animes.filter(a => a.id !== anime.id)

    dispatch({ type: SET_ITEMS, payload: _animes })

    await deleteAnime(anime.id)

    if (_animes.length === 0) {
      dispatch({ type: SET_PAGENUM, payload: 1 })
    }
    dispatch({ type: SET_REFRESH, payload: new Date() })
  }

  const renderItemsName = items => {
    return items.map((item, i) => (
      <span key={i} className="badge ml-1  badge-secondary">
        {item.name}
      </span>
    ))
  }

  const transformAnimes = () => {
    return animes.map(anime => {
      // not included to table anymore
      // anime.description = toElipse(anime.description || '', 20)
      // anime.imageUrl = toElipse(anime.imageUrl || '', 20)
      anime.releaseDate = formatDate(anime.releaseDate)
      return anime
    })
  }

  const handleSort = sortColumn => {
    dispatch({ type: SET_ITEMS, payload: sortBy(animes, sortColumn) })
    setSortColumn(sortColumn)
  }

  const withColumnActions = () => {
    if (auth.isAdmin()) return columns

    const _columns = [...columns]
    return _columns.filter(c => c.key !== 'actions')
  }

  return (
    <Table
      columns={withColumnActions()}
      data={transformAnimes()}
      sortColumn={sortColumn}
      onSort={handleSort}
    />
  )
}

export default Animes
