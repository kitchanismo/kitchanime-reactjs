import React, { useContext, useState, useEffect } from 'react'
import { AnimeContext } from '../../context'
import { createArray } from '../../services/utilsService'
import { pagination } from '../../config.json'
import { SET_PAGENUM, SET_REFRESH } from '../../hooks/types'

const Paginate = ({ start, end, setStart, setEnd }) => {
  const { pageNumbers: PAGE_NUMBERS } = pagination

  const {
    dispatch,
    state: { pageNum, pages }
  } = useContext(AnimeContext)

  const doNext = pageNum => {
    handlePageChange(pageNum + 1)
    if (end === pages) return
    setStart(start + 1)
    setEnd(end + 1)
  }

  //reset start end when delete is 0 in paged
  useEffect(
    () => {
      if (end > pages && start !== 1) {
        setStart(start - 1)
        setEnd(end - 1)
      }
    },
    [pageNum]
  )

  const handlePageChange = _pageNum => {
    if (pageNum === _pageNum) return
    dispatch({ type: SET_PAGENUM, payload: _pageNum })
    // dispatch({ type: SET_REFRESH, payload: new Date() })
  }

  const doPrev = _pageNum => {
    handlePageChange(_pageNum - 1)

    if (start === 1) return
    setStart(start - 1)
    setEnd(end - 1)
  }

  const renderPages = () => {
    let _end = pages < PAGE_NUMBERS ? pages : end

    return createArray(start, _end).map(_pageNum => (
      <li
        key={_pageNum}
        className={pageNum === _pageNum ? 'page-item active' : 'page-item'}
      >
        <button
          className="page-link"
          onClick={() => handlePageChange(_pageNum)}
        >
          {_pageNum}
        </button>
      </li>
    ))
  }

  const isNavHidden = () => {
    return pages > PAGE_NUMBERS
  }

  const isPagesHidden = () => {
    return pages > 1
  }

  const isFirstDisabled = () => {
    return pageNum === 1 ? 'disabled' : ''
  }

  const isLastDisabled = () => {
    return pages === pageNum ? 'disabled' : ''
  }

  const prevPage = () => {
    return (
      <React.Fragment>
        <li className={`page-item ${isFirstDisabled()}`}>
          <button
            className="page-link"
            onClick={() => {
              if (pageNum === 1) return
              handlePageChange(1)
              setStart(1)
              setEnd(PAGE_NUMBERS)
            }}
          >
            {'first'}
          </button>
        </li>

        <li className={`page-item ${isFirstDisabled()}`}>
          <button
            className="page-link"
            aria-label="Previous"
            onClick={() => doPrev(pageNum)}
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
            onClick={() => doNext(pageNum)}
          >
            &raquo;
          </button>
        </li>

        <li className={`page-item ${isLastDisabled()}`}>
          <button
            className="page-link"
            onClick={() => {
              handlePageChange(pages)
              setStart(pages - (PAGE_NUMBERS - 1))
              setEnd(pages)
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
        <p className="page-of">{`${pageNum} of ${pages}`}</p>
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
