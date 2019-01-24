import React, { Component } from 'react'
import { AnimeContext } from './../../context'
import { createArray } from '../../services/utilsService'
import { navigateLimit } from '../../config.json'

class Paginate extends Component {
  static contextType = AnimeContext

  state = { start: 1, end: navigateLimit }

  doNext = pageNum => {
    const { paginate } = this.context.state
    const { start, end } = this.state
    if (paginate.pages === pageNum) return

    this.context.onPageChange(pageNum + 1)

    if (end === paginate.pages) return

    this.setState({ start: start + 1, end: end + 1 })
  }

  doNavigate = (label, doChange) => {
    return (
      <li>
        <a href="#" className="page-link" onClick={() => doChange}>
          {label}
        </a>
      </li>
    )
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
    if (paginate.pages < navigateLimit) {
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
          {paginate.pages > navigateLimit && (
            <React.Fragment>
              <li>
                <a
                  href="#"
                  className="page-link"
                  onClick={() => {
                    if (paginate.pageNum === 1) return
                    this.context.onPageChange(1)
                    this.setState({ start: 1, end: navigateLimit })
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

          {paginate.pages > navigateLimit && (
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
                      start: paginate.pages - (navigateLimit - 1),
                      end: paginate.pages
                    })
                  }}
                >
                  {'last'}
                </a>
              </li>
            </React.Fragment>
          )}
        </ul>
        <span>{`${paginate.pageNum} of ${paginate.pages}`}</span>
      </nav>
    )
  }
}

export default Paginate
