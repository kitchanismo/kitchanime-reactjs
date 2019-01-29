import React, { Component } from 'react'
import Joi from 'joi-browser'
import Input from './input'
import Select from 'react-select'
import { capitalize } from './../../services/utilsService'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

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

  renderButton(label, classes = '') {
    return (
      <button
        disabled={this.validate() || Object.keys(this.state.errors).length > 0}
        className={`btn btn-primary ${classes}`}
      >
        {label}
      </button>
    )
  }
  errorMessage

  renderSelect(name, label, value, onChange, options, rest) {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <Select
          {...rest}
          isSearchable
          isClearable
          value={value}
          onChange={onChange}
          options={options}
        />
      </div>
    )
  }

  renderInput(name, label, type = 'text', rest) {
    const { data, errors } = this.state

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        {...rest}
      />
    )
  }

  renderDatePicker(name, label, rest) {
    const { data, errors } = this.state

    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <div>
          <DatePicker
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText="Select a date"
            className="form-control"
            value={data[name]}
            {...rest}
          />
        </div>
        {errors[name] && (
          <div className="alert p-2 mt-2 alert-danger">{errors[name]}</div>
        )}
      </div>
    )
  }

  renderTextArea(name, label, row = 3) {
    const { data, errors } = this.state
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <textarea
          value={data[name]}
          onChange={this.handleChange}
          className="form-control"
          id={name}
          rows={row}
          name={name}
        />
        {errors[name] && (
          <div className="alert p-2 mt-2 alert-danger">{errors[name]}</div>
        )}
      </div>
    )
  }
}

export default Form
