import React, { Component } from 'react'
import Table from './partials/table'
import Paginate from './partials/paginate'
import { AnimeContext } from './../context'
import { toElipse } from '../services/utilsService'

class Home extends Component {
  static contextType = AnimeContext

  render() {
    const { columns, state, onSort } = this.context

    return (
      <React.Fragment>
        <h1 className="mb-3">Animes</h1>
        <Table
          columns={columns}
          data={this.transformAnimes(this.context.state.animes)}
          sortColumn={state.sortColumn}
          onSort={onSort}
        />
        <Paginate />
      </React.Fragment>
    )
  }

  transformAnimes(animes) {
    return animes.map(anime => {
      return {
        ...anime,
        description: toElipse(anime.description, 30)
      }
    })
  }
}

export default Home
