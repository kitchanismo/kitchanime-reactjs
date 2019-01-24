import React, { Component } from 'react'
import { AnimeContext } from './../../context'
import { createArray } from '../../services/utilsService'
import { pagination } from '../../config.json'

class Paginate extends Component {
  static contextType = AnimeContext

  state = { start: 1, end: pagination.pageNumbers }

  doNext = pageNum => {
    const { paginate } = this.context.state
    const { start, end } = this.state

    if (paginate.pages === pageNum) return

    this.context.onPageChange(pageNum + 1)

    if (end === paginate.pages) return

    this.setState({ start: start + 1, end: end + 1 })
  }

  doPrev = pageNum => {
    const { start, end } = this.state
    if (1 === pageNum) return
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
        <a href="#" className="page-link" onClick={() => onPageChange(pageNum)}>
          {pageNum}
        </a>
      </li>
    ))
  }

  render() {
    const { paginate } = this.context.state

    return (
      <nav>
        <ul className="pagination">
          {paginate.pages > pagination.pageNumbers && (
            <React.Fragment>
              <li>
                <a
                  href="#"
                  className="page-link"
                  onClick={() => {
                    if (paginate.pageNum === 1) return
                    this.context.onPageChange(1)
                    this.setState({ start: 1, end: pagination.pageNumbers })
                  }}
                >
                  {'first'}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="page-link"
                  onClick={() => this.doPrev(paginate.pageNum)}
                >
                  {'<<'}
                </a>
              </li>
            </React.Fragment>
          )}

          {paginate.pages > 1 && this.renderPages()}

          {paginate.pages > pagination.pageNumbers && (
            <React.Fragment>
              <li>
                <a
                  href="#"
                  className="page-link"
                  onClick={() => this.doNext(paginate.pageNum)}
                >
                  {'>>'}
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="page-link"
                  onClick={() => {
                    if (paginate.pages === paginate.pageNum) return
                    this.context.onPageChange(paginate.pages)
                    this.setState({
                      start: paginate.pages - (pagination.pageNumbers - 1),
                      end: paginate.pages
                    })
                  }}
                >
                  {'last'}
                </a>
              </li>
            </React.Fragment>
          )}

          <span className="mt-1 ml-2">{`${paginate.pageNum} of ${
            paginate.pages
          }`}</span>
        </ul>
      </nav>
    )
  }
}

export default Paginate
