import React, { Component } from 'react'
import { AnimeContext } from './../../context'
import { createArray } from '../../services/utilsService'
class Paginate extends Component {
  static contextType = AnimeContext

  doNext = pageNum => {
    if (this.context.state.paginate.pages === pageNum) return
    this.context.onPageChange(pageNum + 1)
  }

  doPrev = pageNum => {
    if (1 === pageNum) return
    this.context.onPageChange(pageNum - 1)
  }

  renderPages = () => {
    const { onPageChange } = this.context
    const { paginate } = this.context.state

    return createArray(paginate.pages).map(pageNum => (
      <li
        key={pageNum}
        className={
          pageNum === paginate.pageNum ? 'page-item active' : 'page-item'
        }
      >
        <a className="page-link" onClick={() => onPageChange(pageNum)}>
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
          <li>
            <a
              disabled={paginate.pageNum === 1}
              className="page-link"
              onClick={() => this.doPrev(paginate.pageNum)}
            >
              {'<<'}
            </a>
          </li>

          {this.renderPages()}

          <li>
            <a
              disabled={paginate.pageNum === paginate.pages}
              className="page-link"
              onClick={() => this.doNext(paginate.pageNum)}
            >
              {'>>'}
            </a>
          </li>
        </ul>
        <span>{`${paginate.pageNum} of ${paginate.pages}`}</span>
      </nav>
    )
  }
}

export default Paginate
