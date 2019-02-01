import React, { useContext, useState, useEffect } from 'react'
import { AnimeContext } from '../../context'
import { createArray } from '../../services/utilsService'
import { pagination } from '../../config.json'
import { SET_PAGENUM, SET_REFRESH } from '../../hooks/types'

const Paginate = props => {
  const {
    dispatch,
    state: { paginate }
  } = useContext(AnimeContext)

  const [start, setStart] = useState(1)
  const [end, setEnd] = useState(pagination.pageNumbers)

  const doNext = pageNum => {
    handlePageChange(pageNum + 1)
    if (end === paginate.pages) return
    setStart(start + 1)
    setEnd(end + 1)
  }

  //reset start end when delete is 0 in paged
  useEffect(
    () => {
      if (end > paginate.pages && start !== 1) {
        setStart(start - 1)
        setEnd(end - 1)
      }
    },
    [paginate]
  )

  const handlePageChange = _pageNum => {
    if (paginate.pageNum === _pageNum) return
    dispatch({ type: SET_PAGENUM, payload: _pageNum })
  }

  const doPrev = pageNum => {
    handlePageChange(pageNum - 1)

    if (start === 1) return
    setStart(start - 1)
    setEnd(end - 1)
  }

  const renderPages = () => {
    let _end = paginate.pages < pagination.pageNumbers ? paginate.pages : end

    return createArray(start, _end).map(pageNum => (
      <li
        key={pageNum}
        className={
          pageNum === paginate.pageNum ? 'page-item active' : 'page-item'
        }
      >
        <button className="page-link" onClick={() => handlePageChange(pageNum)}>
          {pageNum}
        </button>
      </li>
    ))
  }

  const isNavHidden = () => {
    return paginate.pages > pagination.pageNumbers
  }

  const isPagesHidden = () => {
    return paginate.pages > 1
  }

  const isFirstDisabled = () => {
    return paginate.pageNum === 1 ? 'disabled' : ''
  }

  const isLastDisabled = () => {
    const { pages, pageNum } = paginate
    return pages === pageNum ? 'disabled' : ''
  }

  const prevPage = () => {
    return (
      <React.Fragment>
        <li className={`page-item ${isFirstDisabled()}`}>
          <button
            className="page-link"
            onClick={() => {
              if (paginate.pageNum === 1) return
              handlePageChange(1)
              setStart(1)
              setEnd(pagination.pageNumbers)
            }}
          >
            {'first'}
          </button>
        </li>

        <li className={`page-item ${isFirstDisabled()}`}>
          <button
            className="page-link"
            aria-label="Previous"
            onClick={() => doPrev(paginate.pageNum)}
          >
            &laquo;
          </button>
        </li>
      </React.Fragment>
    )
  }

  const nextPage = () => {
    return (
      <React.Fragment>
        <li className={`page-item ${isLastDisabled()}`}>
          <button
            className="page-link"
            aria-label="Next"
            onClick={() => doNext(paginate.pageNum)}
          >
            &raquo;
          </button>
        </li>

        <li className={`page-item ${isLastDisabled()}`}>
          <button
            className="page-link"
            onClick={() => {
              handlePageChange(paginate.pages)
              setStart(paginate.pages - (pagination.pageNumbers - 1))
              setEnd(paginate.pages)
            }}
          >
            {'last'}
          </button>
        </li>
      </React.Fragment>
    )
  }

  const pageOf = () => {
    return (
      <div className="pages px-0 col d-flex justify-content-end">
        <p className="page-of">{`${paginate.pageNum} of ${paginate.pages}`}</p>
      </div>
    )
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col d-flex justify-content-start px-0">
          <nav>
            <ul className="pagination">
              {isNavHidden() && prevPage()}

              {isPagesHidden() && renderPages()}

              {isNavHidden() && nextPage()}
            </ul>
          </nav>
        </div>
        {pageOf()}
        <style jsx>
          {`
            .pages {
              text-align: right;
            }
            .page-of {
              margin-top: 10px;
            }
          `}
        </style>
      </div>
    </div>
  )
}

export default Paginate
