import React, { Component } from 'react'
import { AnimeContext } from './../context'
import { toElipse, formatDate } from '../services/utilsService'
import Table from './partials/table'

class Movies extends Component {
  static contextType = AnimeContext

  transformAnimes(animes) {
    return animes.map(anime => {
      anime.description = toElipse(anime.description || '', 20)
      anime.imageUrl = toElipse(anime.imageUrl || '', 20)
      anime.releaseDate = formatDate(anime.releaseDate)
      return anime
    })
  }

  render() {
    const { columns, state, onSort } = this.context
    return (
      <Table
        columns={columns}
        data={this.transformAnimes(state.animes)}
        sortColumn={state.sortColumn}
        onSort={onSort}
      />
    )
  }
}

export default Movies
