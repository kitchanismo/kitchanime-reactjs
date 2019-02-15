import React, { useContext, useEffect } from 'react'
import { AnimeContext } from '../../context'
import { createArray } from '../../services/utilsService'
import { pagination } from '../../config.json'

const Paginate = props => {
  const { pageNumbers: PAGE_NUMBERS } = pagination

  const {
    state: { pageNum, pages, start, end },
    onPageChange,
    onSetStart,
    onSetEnd
  } = useContext(AnimeContext)

  //reset start end when delete is 0 in paged
  useEffect(() => {
    if (end > pages && start !== 1) {
      handleDecrementStart()
      handleDecrementEnd()
    }
  }, [pageNum])

  const handleIncrementStart = () => onSetStart(start + 1)

  const handleDecrementStart = () => onSetStart(start - 1)

  const handleIncrementEnd = () => onSetEnd(end + 1)

  const handleDecrementEnd = () => onSetEnd(end - 1)

  const handlePageChange = _pageNum => {
    if (pageNum === _pageNum) return
    onPageChange(_pageNum)
  }
  const doNext = pageNum => {
    handlePageChange(pageNum + 1)
    if (end === pages) return
    handleIncrementStart()
    handleIncrementEnd()
  }
  const doPrev = _pageNum => {
    handlePageChange(_pageNum - 1)

    if (start === 1) return
    handleDecrementStart()
    handleDecrementEnd()
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
              onSetStart(1)
              onSetEnd(PAGE_NUMBERS)
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
              onSetStart(pages - (PAGE_NUMBERS - 1))
              onSetEnd(pages)
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
        <style jsx="">
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
