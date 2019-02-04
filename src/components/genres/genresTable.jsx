import React, { useState } from 'react'
import useRequest from './../../hooks/useRequest'
import { getGenres } from './../../services/animeService'
import { sortBy } from './../../services/utilsService'
import { Link } from 'react-router-dom'
import Table from './../partials/table'
import { SET_ITEMS } from './../../hooks/types'
import HeaderTitle from '../partials/headerTitle'
import Form from '../partials/form'

const GenresTable = () => {
  const {
    state: { genres },
    dispatch
  } = useRequest(getGenres, 'genres')

  const [sortColumn, setSortColumn] = useState({ path: 'name', order: 'asc' })

  const columns = [
    {
      path: 'name',
      label: 'Name',
      content: genre => <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
    },
    {
      key: 'actions',
      label: 'Actions',
      content: genre => (
        <div className="d-flex">
          <Link to={`/genres/${genre.id}`}>
            <button className="btn btn-warning btn-sm mr-1 fa fa-pencil text-white" />
          </Link>
          <button className="btn btn-danger btn-sm fa fa-trash text-white" />
        </div>
      )
    }
  ]

  const handleSort = sortColumn => {
    dispatch({ type: SET_ITEMS, payload: sortBy(genres, sortColumn) })
    setSortColumn(sortColumn)
  }

  return (
    <div className="col-6 offset-3 ">
      <HeaderTitle total={genres.length} title={'Genres'} />
      <Table
        columns={columns}
        data={genres}
        sortColumn={sortColumn}
        onSort={handleSort}
      />
    </div>
  )
}

export default GenresTable
