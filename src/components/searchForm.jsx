import React, { useContext, useState } from 'react'
import { AnimeContext } from './../context'
import { SEARCH_ITEMS, SET_PAGENUM } from '../hooks/types'
import { pagination } from '../config.json'

const SearchForm = props => {
  const { dispatch } = useContext(AnimeContext)
  const [title, setTitle] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    if (!title) return
    props.setStart(1)
    props.setEnd(pagination.pageNumbers)
    dispatch({ type: SET_PAGENUM, payload: 1 })
    dispatch({ type: SEARCH_ITEMS, payload: title })
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
        <button className="btn btn-primary ml-2 mb-2">Search</button>
      </form>
      <style jxs>{`
      form {
        display:flex;
      }
     
     `}</style>
    </React.Fragment>
  )
}

export default SearchForm
