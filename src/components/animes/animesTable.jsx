import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimeContext } from '../../context'
import Table from '../partials/table'
import { formatDate } from '../../services/utilsService'
import withAuth from '../hoc/withAuth'
import { toast } from 'react-toastify'
import Paginate from './paginate'
import SearchForm from './searchForm'
import Loader from './../partials/loader'
import CustomModal from './../partials/modal'

const Animes = ({ auth }) => {
  const {
    state: { animes, pageNum, start, end },
    onDelete,
    onRefresh,
    onPageChange,
    onSort,
    onSearch,
    onSetStart,
    onSetEnd
  } = useContext(AnimeContext)

  const [modal, setModal] = useState(false)

  const [selectedAnime, setSelectedAnime] = useState({})

  const [sortColumn, setSortColumn] = useState({ path: 'name', order: 'asc' })

  const toggle = async ({ target }) => {
    setModal(modal => !modal)

    if (target && target.name === 'primary') {
      await doDelete(selectedAnime)
      setSelectedAnime({})
    }
  }

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
            <button className="btn btn-warning btn-sm mr-1 text-white">
              <span className="fa fa-pencil mr-1" />
              EDIT
            </button>
          </Link>
          <button
            onClick={async e => {
              setSelectedAnime(anime)
              await toggle(e)
            }}
            className="btn btn-danger btn-sm text-white"
            name="delete"
          >
            <span className="fa fa-trash mr-1" />
            DELETE
          </button>
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
        onSetStart(start - 1)
      }
      onSetEnd(end - 1)
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

  const renderAddBtn = () => {
    return (
      auth.isAdmin() && (
        <Link to="/animes/new">
          <button className="btn btn-success mr-2 mt-1">
            <span className="fa fa-plus mr-1" />
            NEW ANIME
          </button>
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
            className="btn btn-secondary mt-1"
          >
            <span className="fa fa-refresh mr-1" />
            REFRESH
          </button>
        </Link>
      </div>
    )
  }

  const renderModal = () => {
    return (
      <CustomModal
        title="Kitchanime"
        modal={modal}
        toggle={toggle}
        label={`Delete ${selectedAnime.title}?`}
        primary={{ type: 'danger', label: 'DELETE' }}
        className="modal-dialog-centered"
      />
    )
  }

  return (
    <React.Fragment>
      {renderModal()}
      <div className="row no-gutters ">
        <div className="col-6 d-flex justify-content-start ">
          {renderAddBtn()}
          {renderRefreshBtn()}
        </div>
      </div>
      <div className="col-12 mb-2 mt-3" style={{ padding: 0 }}>
        <SearchForm />
      </div>
      <Loader isLoaded={animes.length > 0}>
        <Table
          columns={withColumnActions()}
          data={transformAnimes()}
          sortColumn={sortColumn}
          onSort={handleSort}
        />
        <Paginate />
      </Loader>
    </React.Fragment>
  )
}

export default withAuth(Animes)
