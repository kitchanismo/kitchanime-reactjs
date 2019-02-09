import React, { useContext, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimesTable from './animes/animesTable'
import { AnimeContext } from './../context'
import Loader from './partials/loader'
import withAuth from './hoc/withAuth'
import SearchForm from './searchForm'
import { pagination } from '../config.json'
import HeaderTitle from './partials/headerTitle'

const Home = ({ auth }) => {
  const { state, onSearch } = useContext(AnimeContext)

  const { pageNumbers: PAGE_NUMBERS } = pagination

  const [start, setStart] = useState(1)
  const [end, setEnd] = useState(PAGE_NUMBERS)

  const renderHeader = () => {
    return (
      <React.Fragment>
        <HeaderTitle total={state.total} title={'Animes'} />
        <div className="row no-gutters ">
          <div className="col-7 d-flex justify-content-start ">
            {auth.isAdmin() && (
              <Link to="/animes/new">
                <button className="btn fa fa-plus btn-success btn-lg mr-2 mt-1" />
              </Link>
            )}
            <div>
              <Link to="/">
                <button
                  onClick={() => onSearch('')}
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

  const paginateProps = {
    start,
    end,
    setStart,
    setEnd
  }

  return (
    <React.Fragment>
      {renderHeader()}
      <Loader isLoaded={state.total > 0}>
        <AnimesTable {...paginateProps} />
      </Loader>
    </React.Fragment>
  )
}

export default memo(withAuth(Home))
