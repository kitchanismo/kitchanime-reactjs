import React, { useState } from 'react'
import Form from '../partials/form'
import Joi from 'joi-browser'
import { postStudio } from '../../services/studioService'
import { toast } from 'react-toastify'

const StudioForm = props => {
  const [studio, setStudio] = useState({ id: 0, name: '' })
  const [errors, setErrors] = useState({})

  const schema = {
    id: Joi.number().integer(),
    name: Joi.string()
      .required()
      .label('Name')
  }

  const handleSubmit = async () => {
    try {
      await postStudio(studio)
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
        <h1>Add Studio</h1>
        <span className=" d-flex justify-content-end">
          <button
            onClick={handleBack}
            className="btn fa fa-arrow-left btn-secondary btn-lg "
          />
        </span>
        <Form
          data={{ data: studio, setData: setStudio }}
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

export default StudioForm
