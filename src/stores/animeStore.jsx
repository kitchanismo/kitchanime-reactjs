import React, { Component } from 'react'
import { AnimeContext } from '../context'
import { getPagedAnimes, deleteAnime } from '../services/animeService'
import { sortBy } from '../services/utilsService'
import { pagination } from '../config.json'
import { Link } from 'react-router-dom'

class AnimeStore extends Component {
  state = {
    paginate: { pageNum: 1, pages: 0, total: null },
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
      path: 'type',
      label: 'Type'
    },
    {
      path: 'imageUrl',
      label: 'Image Url'
    },
    {
      path: 'releaseDate',
      label: 'Release'
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
        <a
          onClick={() => this.handleDelete(anime)}
          className="btn btn-danger btn-sm fa fa-trash text-white mr-0"
        />
      )
    }
  ]

  renderItemsName = items => {
    return items.map((item, i) => (
      <span key={i} className="badge ml-1  badge-secondary">
        {item.name}
      </span>
    ))
  }

  async componentDidMount() {
    const { sortColumn } = this.state

    let { data: animes, lastPage, total } = await getPagedAnimes(
      this.state.paginate.pageNum,
      pagination.perPage
    )

    const paginate = { ...this.state.paginate }

    paginate.pages = lastPage
    paginate.total = total

    animes = sortBy(animes, sortColumn)

    this.setState({ animes, paginate })
  }

  handlePageChange = async pageNum => {
    let { data: animes } = await getPagedAnimes(pageNum, pagination.perPage)

    const paginate = { ...this.state.paginate }

    paginate.pageNum = pageNum

    this.setState({ animes, paginate })
    //this.props.history.replace(`/animes/page/${pageNum}`)
  }

  handleSort = sortColumn => {
    const animes = sortBy(this.state.animes, sortColumn)
    this.setState({ sortColumn, animes })
  }

  handleDelete = async anime => {
    const originalAnimes = this.state.animes
    const paginate = { ...this.state.paginate }
    try {
      const animes = originalAnimes.filter(a => a.id !== anime.id)

      await deleteAnime(anime.id)
      paginate.total = paginate.total - 1
      this.setState({ animes, paginate })
    } catch (err) {
      this.setState({ animes: originalAnimes, paginate })
    }

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
