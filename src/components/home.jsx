import React, { useContext, memo, useReducer } from 'react'
import Paginate from './animes/paginate'
import Animes from './animes/index'
import { AnimeContext } from './../context'
import { Link } from 'react-router-dom'
import Spinner from './partials/spinner'

const Home = props => {
  const { state } = useContext(AnimeContext)

  const renderTitle = () => {
    return (
      <div className="row no-gutters align-items-center">
        <div className="col  d-flex justify-content-start align-items-center">
          <span>
            <h1 className="mb-3">Animes</h1>
          </span>
          <h5>
            <span className="badge badge-pill badge-primary ml-2">
              {state.total}
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

  return (
    <Spinner isLoaded={state.animes.length > 0}>
      {renderTitle()}

      <Animes {...props} />
      <Paginate />
    </Spinner>
  )
}

export default memo(Home)
