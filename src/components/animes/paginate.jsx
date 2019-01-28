import React, { Component } from 'react'
import { AnimeContext } from '../../context'
import { createArray } from '../../services/utilsService'
import { pagination } from '../../config.json'

class Paginate extends Component {
  static contextType = AnimeContext

  state = { start: null, end: null }

  constructor() {
    super()
    this.state.start = 1
    this.state.end = pagination.pageNumbers
  }
  doNext = pageNum => {
    const { paginate } = this.context.state
    const { start, end } = this.state

    this.context.onPageChange(pageNum + 1)

    if (end === paginate.pages) return

    this.setState({ start: start + 1, end: end + 1 })
  }

  doPrev = pageNum => {
    const { start, end } = this.state

    this.context.onPageChange(pageNum - 1)

    if (start === 1) return
    this.setState({ start: start - 1, end: end - 1 })
  }

  renderPages = () => {
    const { onPageChange } = this.context
    const { paginate } = this.context.state
    let { start, end } = this.state

    if (paginate.pages < pagination.pageNumbers) {
      end = paginate.pages
    }

    return createArray(start, end).map(pageNum => (
      <li
        key={pageNum}
        className={
          pageNum === paginate.pageNum ? 'page-item active' : 'page-item'
        }
      >
        <button className="page-link" onClick={() => onPageChange(pageNum)}>
          {pageNum}
        </button>
      </li>
    ))
  }

  isNavHidden = () => {
    return this.context.state.paginate.pages > pagination.pageNumbers
  }

  isPagesHidden = () => {
    return this.context.state.paginate.pages > 1
  }

  isFirstDisabled = () => {
    return this.context.state.paginate.pageNum === 1 ? 'disabled' : ''
  }

  isLastDisabled = () => {
    const { pages, pageNum } = this.context.state.paginate
    return pages === pageNum ? 'disabled' : ''
  }

  render() {
    const { paginate } = this.context.state

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col d-flex justify-content-start px-0">
            <nav>
              <ul className="pagination">
                {this.isNavHidden() && (
                  <React.Fragment>
                    <li className={`page-item ${this.isFirstDisabled()}`}>
                      <button
                        className="page-link"
                        onClick={() => {
                          if (paginate.pageNum === 1) return
                          this.context.onPageChange(1)
                          this.setState({
                            start: 1,
                            end: pagination.pageNumbers
                          })
                        }}
                      >
                        {'first'}
                      </button>
                    </li>

                    <li className={`page-item ${this.isFirstDisabled()}`}>
                      <button
                        className="page-link"
                        aria-label="Previous"
                        onClick={() => this.doPrev(paginate.pageNum)}
                      >
                        &laquo;
                      </button>
                    </li>
                  </React.Fragment>
                )}

                {this.isPagesHidden() && this.renderPages()}

                {this.isNavHidden() && (
                  <React.Fragment>
                    <li className={`page-item ${this.isLastDisabled()}`}>
                      <button
                        className="page-link"
                        aria-label="Next"
                        onClick={() => this.doNext(paginate.pageNum)}
                      >
                        &raquo;
                      </button>
                    </li>

                    <li className={`page-item ${this.isLastDisabled()}`}>
                      <button
                        className="page-link"
                        onClick={() => {
                          this.context.onPageChange(paginate.pages)
                          this.setState({
                            start:
                              paginate.pages - (pagination.pageNumbers - 1),
                            end: paginate.pages
                          })
                        }}
                      >
                        {'last'}
                      </button>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </nav>
          </div>
          <div className="pages px-0 col d-flex justify-content-end">
            <p className="page-of">{`${paginate.pageNum} of ${
              paginate.pages
            }`}</p>
          </div>
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
}

export default Paginate
