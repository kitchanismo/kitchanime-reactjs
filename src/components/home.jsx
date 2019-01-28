import React, { Component } from 'react'
import Paginate from './animes/paginate'
import Animes from './animes/index'
import { AnimeContext } from './../context'
import { Link } from 'react-router-dom'

class Home extends Component {
  static contextType = AnimeContext

  renderTitle = () => {
    const { state } = this.context
    return (
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col  d-flex justify-content-start align-items-center">
            <span>
              <h1 className="mb-3">Animes</h1>
            </span>
            <span className="badge badge-pill badge-primary ml-2">
              {state.paginate.total}
            </span>
          </div>
          <div className="col d-flex justify-content-end">
            <Link to="/animes/new">
              <button className="btn fa fa-plus btn-primary btn-lg " />
            </Link>
          </div>
        </div>
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
