import React, { useState } from 'react'
import Form from '../partials/form'
import Joi from 'joi-browser'
import { postGenre } from '../../services/genreService'
import { toast } from 'react-toastify'
import BackButton from './../partials/backButton'

const GenreForm = props => {
  const [genre, setGenre] = useState({ id: 0, name: '' })
  const [errors, setErrors] = useState({})

  const schema = {
    id: Joi.number().integer(),
    name: Joi.string()
      .required()
      .label('Name')
  }

  const handleSubmit = async () => {
    try {
      await postGenre(genre)
      toast.success('Added')
      handleBack()
    } catch ({ response }) {
      if (response && response.data.status.code === 400) {
        const _errors = { ...errors }
        _errors.name = response.data.status.error
        setErrors(_errors)
      }
    }
  }

  const handleBack = () => props.history.goBack()

  return (
    <React.Fragment>
      <div className="col-6 offset-3">
        <h1>Add Genre</h1>
        <span className=" d-flex justify-content-end">
          <BackButton {...props} />
        </span>
        <Form
          data={{ data: genre, setData: setGenre }}
          errors={{ errors, setErrors }}
          schema={schema}
          onSubmit={handleSubmit}
        >
          {({ renderInput, renderButton }) => {
            return (
              <React.Fragment>
                {renderInput('name', 'Name')}
                {renderButton('Save')}
              </React.Fragment>
            )
          }}
        </Form>
      </div>
    </React.Fragment>
  )
}

export default GenreForm
