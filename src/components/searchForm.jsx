import React, { useContext, useState } from 'react'
import { AnimeContext } from './../context'
import { SEARCH_ITEMS, SET_PAGENUM } from '../hooks/types'
import { pagination } from '../config.json'

const SearchForm = props => {
  const { dispatch } = useContext(AnimeContext)
  const [title, setTitle] = useState('')

  const handleSubmit = async e => {
    dispatch({ type: SET_PAGENUM, payload: 1 })
    props.setStart(1)
    props.setEnd(pagination.pageNumbers)
    dispatch({ type: SEARCH_ITEMS, payload: title })
  }

  return (
    <React.Fragment>
      <input
        type={'text'}
        name={title}
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="form-control"
        placeholder="Search title"
      />
      <button onClick={handleSubmit} className="btn btn-primary ml-2 mb-2">
        Search
      </button>
    </React.Fragment>
  )
}

export default SearchForm
