import React, { useState } from 'react'
import Joi from 'joi-browser'
import Input from './input'
import { capitalize } from '../../services/utilsService'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import 'react-datepicker/dist/react-datepicker.css'

export const mapToSelect = ({ id, name }) => {
  return { id, label: capitalize(name), value: name }
}

const Form = props => {
  const { data, setData } = props.data
  const { errors, setErrors } = props.errors

  const schema = { ...props.schema }

  const renderDatePicker = (name, label, rest) => {
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

  const renderTextArea = (name, label, row = 3) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <textarea
          value={data[name]}
          onChange={handleChange}
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

  const validate = () => {
    const options = { abortEarly: false }
    const { error } = Joi.validate(data, schema, options)

    if (!error) return null

    const errors = {}
    for (let item of error.details) errors[item.path[0]] = item.message
    return errors
  }

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value }

    const _schema = { [name]: schema[name] }

    const { error } = Joi.validate(obj, _schema)

    return error ? error.details[0].message : null
  }

  const handleSubmit = (e, doSubmit) => {
    e.preventDefault()

    const errors = validate()
    setErrors(errors || {})
    if (errors) return

    doSubmit(e, data)
  }

  const handleChange = ({ currentTarget: input }) => {
    const _errors = { ...errors }
    const errorMessage = validateProperty(input)

    if (errorMessage) _errors[input.name] = errorMessage
    else delete _errors[input.name]

    const newErrors = ClearConfirmPassword(input, _errors, data.password)

    const _data = { ...data }
    _data[input.name] = input.value

    setData(_data)
    setErrors(newErrors)
  }

  const ClearConfirmPassword = (input, errors, password) => {
    const newErrors = { ...errors }
    if (input.name === 'confirmPassword') {
      if (input.value === password) {
        delete newErrors[input.name]
      }
    }
    return newErrors
  }

  const renderInput = (name, label, type = 'text', rest) => {
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={handleChange}
        error={errors[name]}
        {...rest}
      />
    )
  }

  const renderSelect = (name, label, value, onChange, options, rest) => {
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

  const renderButton = (label, classes = '') => {
    return (
      <button
        disabled={validate() || Object.keys(errors).length > 0}
        className={`btn btn-primary ${classes}`}
      >
        {label}
      </button>
    )
  }

  return (
    <form onSubmit={e => handleSubmit(e, props.onSubmit)}>
      {props.children({
        renderButton,
        renderInput,
        renderTextArea,
        renderDatePicker,
        renderSelect
      })}
    </form>
  )
}

export default Form
