import React, { Component } from 'react'
import { AnimeContext } from '../context'
import { getAnimes } from '../services/animeService'
import { sortBy, formatDate } from './../services/utilsService'
import { Link } from 'react-router-dom'

class AnimeProvider extends Component {
  state = { animes: [], sortColumn: { path: 'title', order: 'asc' } }

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
    let { animes } = await getAnimes()

    animes = sortBy(animes, this.state.sortColumn)
    this.setState({ animes })
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
          onDelete: this.handleDelete
        }}
      >
        {this.props.children}
      </AnimeContext.Provider>
    )
  }
}

export default AnimeProvider
