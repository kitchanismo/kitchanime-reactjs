import React, { Component } from 'react'
import Paginate from './paginate'
import Animes from './animes'
import { AnimeContext } from './../context'

class Home extends Component {
  static contextType = AnimeContext

  renderTitle = () => {
    const { state } = this.context
    return (
      <div className="row align-items-center">
        <h1 className="mb-3">Animes</h1>
        <span className="badge badge-pill badge-primary ml-2">
          {state.paginate.total}
        </span>
      </div>
    )
  }
  render() {
    return (
      <React.Fragment>
        {this.renderTitle()}
        <Animes />
        <Paginate />
      </React.Fragment>
    )
  }
}

export default Home
