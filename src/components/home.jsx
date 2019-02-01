import React, { useContext, memo, useReducer, useState } from 'react'
import Paginate from './animes/paginate'
import Animes from './animes/index'
import { AnimeContext } from './../context'
import { Link } from 'react-router-dom'
import Spinner from './partials/spinner'
import auth from '../services/authService'

const Home = props => {
  const { state, dispatch } = useContext(AnimeContext)
  const [title, setTitle] = useState('')
  const [hasResult, setHasResult] = useState(true)

  const handleSubmit = async e => {
    dispatch({ type: 'SEARCH_TITLE', payload: title })
    console.log(state.pages)
    if (state.animes.length === 0) {
      setHasResult(false)
    }
  }

  const noResult = () => {
    return (
      <div className="row no-gutters">
        <h1>No Result</h1>
      </div>
    )
  }

  const searchBox = () => {
    return (
      <div className="row no-gutters ">
        {auth.isAdmin() && (
          <div className="col-8 d-flex justify-content-start">
            <Link to="/animes/new">
              <button className="btn fa fa-plus btn-success btn-lg " />
            </Link>
          </div>
        )}
        <div className="col-4  d-flex justify-content-end mb-2">
          <input
            type={'text'}
            name={title}
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="form-control"
            placeholder="Search title"
          />
          <button onClick={handleSubmit} className={`btn btn-primary ml-2`}>
            Search
          </button>
        </div>
      </div>
    )
  }

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
      </div>
    )
  }

  return (
    <React.Fragment>
      {hasResult && (
        <Spinner isLoaded={state.animes.length > 0 && hasResult}>
          {renderTitle()}
          {searchBox()}
          <Animes {...props} />
          <Paginate />
        </Spinner>
      )}
      {!hasResult && noResult()}
    </React.Fragment>
  )
}

export default memo(Home)
