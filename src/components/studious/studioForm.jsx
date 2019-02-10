import React, { useState } from 'react'
import Form from '../partials/form'
import Joi from 'joi-browser'
import { Link } from 'react-router-dom'
import { postStudio } from '../../services/studioService'
import { toast } from 'react-toastify'
import { capitalize } from '../../services/utilsService'

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
    const { id } = await postStudio(studio)
    // const _studio = {
    //   id,
    //   value: studio.name,
    //   label: capitalize(studio.name)
    // }

    // props.location.onAddSelected(_studio)
    toast.success('Added')
    handleBack()
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
