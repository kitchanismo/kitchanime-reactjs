import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimeContext } from '../../context'
import Table from '../partials/table'

import { formatDate } from '../../services/utilsService'
import auth from '../../services/authService'

const Animes = props => {
  const {
    state: { animes },
    onSort,
    onDelete
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
            onClick={() => doDelete(anime)}
            className="btn btn-danger btn-sm fa fa-trash text-white"
          />
        </div>
      )
    }
  ]

  const doDelete = anime => {
    if (!auth.isAdmin()) return props.history.replace('/unauthorized')

    onDelete(anime)
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
    onSort(sortColumn)
    setSortColumn(sortColumn)
  }

  return (
    <Table
      columns={columns}
      data={transformAnimes()}
      sortColumn={sortColumn}
      onSort={handleSort}
    />
  )
}

export default Animes
