import React, { useContext, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Animes from './animes/index'
import { AnimeContext } from './../context'
import Spinner from './partials/spinner'
import auth from '../services/authService'
import SearchForm from './searchForm'
import { SEARCH_ITEMS } from '../hooks/types'
import { pagination } from '../config.json'

const Home = props => {
  const { state, dispatch } = useContext(AnimeContext)

  const { pageNumbers: PAGE_NUMBERS } = pagination

  const [start, setStart] = useState(1)
  const [end, setEnd] = useState(PAGE_NUMBERS)

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

  const renderHeader = () => {
    return (
      <React.Fragment>
        {renderTitle()}
        <div className="row no-gutters ">
          <div className="col-7 d-flex justify-content-start ">
            {auth.isAdmin() && (
              <Link to="/animes/new">
                <button className="btn fa fa-plus btn-success btn-lg mr-2 mt-1" />
              </Link>
            )}
            <div>
              <Link to="/home">
                <button
                  onClick={handleRefresh}
                  className="btn fa fa-refresh btn-secondary btn-lg mt-1"
                />
              </Link>
            </div>
          </div>

          <div className="col-5 mb-2  ">
            <SearchForm {...paginateProps} />
          </div>
        </div>
      </React.Fragment>
    )
  }

  const handleRefresh = () => {
    dispatch({ type: SEARCH_ITEMS, payload: '' })
  }

  const paginateProps = {
    start,
    end,
    setStart,
    setEnd
  }

  return (
    <React.Fragment>
      {renderHeader()}
      <Spinner isLoaded={state.total > 0}>
        <Animes {...paginateProps} />
      </Spinner>
    </React.Fragment>
  )
}

export default memo(Home)
