import React, { Component } from 'react'
import { AnimeContext } from '../context'
import { getPagedAnimes } from '../services/animeService'
import { sortBy, formatDate } from '../services/utilsService'
import { pageLimit } from '../config.json'
import { Link } from 'react-router-dom'

class AnimeStore extends Component {
  state = {
    paginate: { pageNum: 1, pages: 0 },
    animes: [],
    sortColumn: { path: 'title', order: 'asc' }
  }

  columns = [
    {
      path: 'title',
      label: 'Title',
      content: anime => <Link to={`/animes/${anime.id}`}>{anime.title}</Link>
    },
    { path: 'description', label: 'Description' },
    { path: 'season', label: 'Season' },
    {
      path: 'releaseDate',
      label: 'Release',
      content: anime => formatDate(anime.releaseDate)
    },
    {
      path: 'genres.name',
      label: 'Genres',
      content: anime => this.renderItemsName(anime.genres)
    },
    {
      path: 'studios.name',
      label: 'Studios',
      content: anime => this.renderItemsName(anime.studios)
    },
    {
      key: 'delete',
      content: anime => (
        <button
          onClick={() => this.context.onDelete(anime)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ]

  renderItemsName = items => {
    return items.map((item, i) => (
      <span key={i} className="badge ml-1 badge-primary">
        {item.name}
      </span>
    ))
  }

  async componentDidMount() {
    const { sortColumn } = this.state

    let { data: animes, lastPage } = await getPagedAnimes(
      this.state.paginate.pageNum,
      pageLimit
    )

    const paginate = { ...this.state.paginate }

    paginate.pages = lastPage

    animes = sortBy(animes, sortColumn)

    this.setState({ animes, paginate })
  }

  handlePageChange = async pageNum => {
    let { data: animes } = await getPagedAnimes(pageNum, pageLimit)

    const paginate = { ...this.state.paginate }

    paginate.pageNum = pageNum

    this.setState({ animes, paginate })
    //this.props.history.replace(`/animes/page/${pageNum}`)
  }

  handleSort = sortColumn => {
    const animes = sortBy(this.state.animes, sortColumn)
    this.setState({ sortColumn, animes })
  }

  handleDelete = anime => {
    const originalAnimes = this.state.animes
    const animes = originalAnimes.filter(a => a.id !== anime.id)
    this.setState({ animes })

    // delete on server
  }

  render() {
    return (
      <AnimeContext.Provider
        value={{
          state: this.state,
          columns: this.columns,
          onSort: this.handleSort,
          onDelete: this.handleDelete,
          onPageChange: this.handlePageChange
        }}
      >
        {this.props.children}
      </AnimeContext.Provider>
    )
  }
}

export default AnimeStore
