import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { AnimeContext } from '../../context'
import { toElipse, formatDate } from '../../services/utilsService'
import Table from '../partials/table'
import auth from '../../services/authService'

class Movies extends Component {
  static contextType = AnimeContext
  state = {
    sortColumn: { path: 'title', order: 'asc' }
  }
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: anime => <Link to={`/animes/${anime.id}`}>{anime.title}</Link>
    },
    // { path: 'description', label: 'Description' },
    { path: 'season', label: 'Season' },
    {
      path: 'releaseDate',
      label: 'Release'
    },
    {
      path: 'type',
      label: 'Type'
    },
    // {
    //   path: 'imageUrl',
    //   label: 'Image Url'
    // },

    {
      label: 'Genres',
      content: anime => this.renderItemsName(anime.genres)
    },
    {
      label: 'Studios',
      content: anime => this.renderItemsName(anime.studios)
    },
    {
      key: 'actions',
      label: 'Actions',
      content: anime => (
        <React.Fragment>
          <div className="d-flex justify-content-center">
            <Link to={`/animes/${anime.id}`}>
              <button className="btn btn-warning btn-sm mr-1 fa fa-pencil text-white" />
            </Link>
            <button
              onClick={() => this.doDelete(anime)}
              className="btn btn-danger btn-sm fa fa-trash text-white"
            />
          </div>
        </React.Fragment>
      )
    }
  ]

  doDelete = anime => {
    if (!auth.isAdmin()) return this.props.history.replace('/unauthorized')

    this.context.onDelete(anime)
  }

  renderItemsName = items => {
    return items.map((item, i) => (
      <span key={i} className="badge ml-1  badge-secondary">
        {item.name}
      </span>
    ))
  }

  transformAnimes(animes) {
    return animes.map(anime => {
      anime.description = toElipse(anime.description || '', 20)
      anime.imageUrl = toElipse(anime.imageUrl || '', 20)
      anime.releaseDate = formatDate(anime.releaseDate)
      return anime
    })
  }

  handleSort = sortColumn => {
    this.context.onSort(sortColumn)
    this.setState({ sortColumn })
  }

  render() {
    const { state } = this.context

    return (
      <Table
        columns={this.columns}
        data={this.transformAnimes(state.animes)}
        sortColumn={this.state.sortColumn}
        onSort={this.handleSort}
      />
    )
  }
}

export default Movies
