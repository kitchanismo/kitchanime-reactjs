import React, { Component } from 'react'
import Paginate from './partials/paginate'
import Animes from './animes'
import { AnimeContext } from './../context'

class Home extends Component {
  static contextType = AnimeContext

  render() {
    const { state } = this.context

    return (
      <React.Fragment>
        <div className="row align-items-center">
          <h1 className="mb-3">Animes</h1>
          <span className="badge badge-pill badge-primary ml-2">
            {state.paginate.total}
          </span>
        </div>
        <Animes />
        <Paginate />
      </React.Fragment>
    )
  }
}

export default Home
