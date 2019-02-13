import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { pagination } from '../../config.json'
import { AnimeContext } from '../../context'
import Table from '../partials/table'
import { formatDate } from '../../services/utilsService'
import withAuth from '../hoc/withAuth'
import { toast } from 'react-toastify'
import Paginate from './paginate'
import SearchForm from './searchForm'
import Loader from './../partials/loader'

const Animes = ({ auth, ...props }) => {
  const { pageNumbers: PAGE_NUMBERS } = pagination

  const {
    state: { animes, pageNum, total },
    onDelete,
    onRefresh,
    onPageChange,
    onSort,
    onSearch
  } = useContext(AnimeContext)

  const [start, setStart] = useState(1)
  const [end, setEnd] = useState(PAGE_NUMBERS)

  const [sortColumn, setSortColumn] = useState({ path: 'name', order: 'asc' })

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
        <div className="">
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

    if (!(await onDelete(anime))) {
      onPageChange(pageNum - 1)
      if (start > 1) {
        setStart(start - 1)
      }
      setEnd(end - 1)
      return
    }
    onRefresh()
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

  const withColumnActions = () => {
    if (auth.isAdmin()) return columns

    const _columns = [...columns]
    return _columns.filter(c => c.key !== 'actions')
  }

  const paginateProps = {
    start,
    end,
    setStart,
    setEnd
  }

  const renderAddBtn = () => {
    return (
      auth.isAdmin() && (
        <Link to="/animes/new">
          <button className="btn fa fa-plus btn-success btn-lg mr-2 mt-1" />
        </Link>
      )
    )
  }
  const renderRefreshBtn = () => {
    return (
      <div>
        <Link to="/">
          <button
            onClick={() => onSearch('')}
            className="btn fa fa-refresh btn-secondary btn-lg mt-1"
          />
        </Link>
      </div>
    )
  }

  return (
    <React.Fragment>
      <div className="row no-gutters ">
        <div className="col-6 d-flex justify-content-start ">
          {renderAddBtn()}
          {renderRefreshBtn()}
        </div>
      </div>
      <div className="col-12 mb-2 mt-3" style={{ padding: 0 }}>
        <SearchForm {...paginateProps} />
      </div>
      <Loader isLoaded={total > 0}>
        <Table
          columns={withColumnActions()}
          data={transformAnimes()}
          sortColumn={sortColumn}
          onSort={handleSort}
        />
        <Paginate {...paginateProps} />
      </Loader>
    </React.Fragment>
  )
}

export default withAuth(Animes)
