import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { sortBy } from '../services/utilsService'
import Table from './partials/table'
import { getAnimes } from '../services/animeService'

class Home extends Component {
  state = { animes: [], sortColumn: { path: 'title', order: 'asc' } }
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: anime => <Link to={`/animes/${anime.id}`}>{anime.title}</Link>
    },
    { path: 'description', label: 'Description' },
    {
      key: 'delete',
      content: anime => (
        <button
          onClick={() => this.handleDelete(anime)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      )
    }
  ]
  async componentDidMount() {
    let animes = await getAnimes()
    animes = sortBy(animes, this.state.sortColumn)
    this.setState({ animes })
  }

  handleDelete = anime => {
    const originalAnimes = this.state.animes
    const animes = originalAnimes.filter(a => a.id !== anime.id)
    this.setState({ animes })

    // delete on server
  }

  handleSort = sortColumn => {
    const animes = sortBy(this.state.animes, sortColumn)
    this.setState({ sortColumn, animes })
  }
  render() {
    const { animes, sortColumn } = this.state

    return (
      <Table
        columns={this.columns}
        data={animes}
        sortColumn={sortColumn}
        onSort={this.handleSort}
      />
    )
  }
}

export default Home
