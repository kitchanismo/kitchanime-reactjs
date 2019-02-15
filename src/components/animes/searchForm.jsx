import React, { useContext, useState } from 'react'
import { AnimeContext } from '../../context'
import { pagination } from '../../config.json'

const SearchForm = props => {
  const { onPageChange, onSearch, onSetEnd, onSetStart } = useContext(
    AnimeContext
  )
  const [title, setTitle] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    if (!title) return
    onSetStart(1)
    onSetEnd(pagination.pageNumbers)
    onPageChange(1)
    onSearch(title)
  }

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input
          type={'text'}
          name={title}
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="form-control"
          placeholder="Search title"
        />
        <button className="btn-search btn btn-primary ml-2">
          <span className="fa fa-search mr-1" />
          SEARCH
        </button>
      </form>
      <style jsx="">{`
        form {
          display: flex;
        }
        .btn-search {
          width: 13%;
        }
      `}</style>
    </React.Fragment>
  )
}

export default SearchForm
