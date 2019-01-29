import React, { Component } from 'react'
import Paginate from './animes/paginate'
import Animes from './animes/index'
import { AnimeContext } from './../context'
import { Link } from 'react-router-dom'
import Spinner from './partials/spinner'

class Home extends Component {
  static contextType = AnimeContext

  renderTitle = () => {
    const { state } = this.context

    return (
      <div className="row no-gutters align-items-center">
        <div className="col  d-flex justify-content-start align-items-center">
          <span>
            <h1 className="mb-3">Animes</h1>
          </span>
          <h5>
            <span className="badge badge-pill badge-primary ml-2">
              {state.paginate.total}
            </span>
          </h5>
        </div>
        <div className="col d-flex justify-content-end">
          <Link to="/animes/new">
            <button className="btn fa fa-plus btn-success btn-lg " />
          </Link>
        </div>
      </div>
    )
  }
  render() {
    const { animes } = this.context.state

    return (
      <Spinner isLoaded={animes.length > 0}>
        {this.renderTitle()}
        <Animes {...this.props} />
        <Paginate />
      </Spinner>
    )
  }
}

export default Home
