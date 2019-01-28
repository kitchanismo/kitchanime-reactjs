import React, { Component } from 'react'
import Joi from 'joi-browser'
import Input from './input'
import Select from 'react-select'
import { capitalize } from './../../services/utilsService'

class Form extends Component {
  state = {
    data: {},
    errors: {}
  }

  mapToSelect({ id, name }) {
    return { id, label: capitalize(name), value: name }
  }

  validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(this.state.data, this.schema, options)

    if (!error) return null

    const errors = {}
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors
  }

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value }
    const schema = { [name]: this.schema[name] }

    const { error } = Joi.validate(obj, schema)

    return error ? error.details[0].message : null
  }

  handleSubmit = e => {
    e.preventDefault()

    const errors = this.validate()
    this.setState({ errors: errors || {} })
    if (errors) return

    this.doSubmit(e)
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors }
    const errorMessage = this.validateProperty(input)

    if (errorMessage) errors[input.name] = errorMessage
    else delete errors[input.name]

    const newErrors = this.ClearConfirmPassword(
      input,
      errors,
      this.state.data.password
    )

    const data = { ...this.state.data }
    data[input.name] = input.value

    this.setState({ data, errors: newErrors })
  }

  ClearConfirmPassword(input, errors, password) {
    const newErrors = { ...errors }
    if (input.name === 'confirmPassword') {
      if (input.value === password) {
        delete newErrors[input.name]
      }
    }
    return newErrors
  }

  renderButton(label) {
    return (
      <button
        disabled={this.validate() || Object.keys(this.state.errors).length > 0}
        className="btn btn-primary"
      >
        {label}
      </button>
    )
  }
  errorMessage

  renderSelect(name, label, value, onChange, options, isMulti) {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <Select
          {...isMulti}
          isSearchable
          value={value}
          onChange={onChange}
          options={options}
        />
      </div>
    )
  }

  renderInput(name, label, type = 'text', onBlur) {
    const { data, errors } = this.state

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        {...onBlur}
      />
    )
  }
}

export default Form
