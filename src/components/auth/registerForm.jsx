import React from 'react'
import Form from './../partials/form'
import Joi from 'joi-browser'
import { capitalize } from './../../services/utilsService'
import auth from './../../services/authService'
import { Redirect } from 'react-router-dom'

class RegisterForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
      email: '',
      confirmPassword: ''
    },
    errors: {}
  }

  schema = {
    username: Joi.string()
      .required()
      .min(6)
      .label('Username'),
    email: Joi.string()
      .required()
      .email()
      .label('Email'),
    password: Joi.string()
      .required()
      .min(6)
      .label('Password'),
    confirmPassword: Joi.string()
      .required()
      .valid(Joi.ref('password'))
      .options({ language: { any: { allowOnly: 'not match' } } })
      .label('Password')
  }

  doSubmit = async e => {
    const errors = await this.handleCheckUser(e)

    if (Object.keys(errors).length > 0) return

    const user = { ...this.state.data }

    await auth.register(user)

    const data = {
      username: '',
      password: '',
      email: '',
      confirmPassword: ''
    }

    this.setState({ data, errors })
    this.props.history.replace('/')
  }

  handleCheckUser = async ({ currentTarget: input }) => {
    const { isTaken } =
      input.name === 'username'
        ? await auth.isUsernameTaken(input.value)
        : await auth.isEmailTaken(input.value)

    const errors = { ...this.state.errors }

    if (isTaken) {
      errors[input.name] = `"${capitalize(input.name)}" is taken`
    } else {
      delete errors[input.name]
    }

    this.setState({ errors })

    return errors
  }

  render() {
    // if (auth.isValidUser()) return <Redirect to="/" />

    return (
      <div className="col-6 offset-3">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username', 'text', {
            onBlur: this.handleCheckUser
          })}
          {this.renderInput('email', 'Email', 'email', {
            onBlur: this.handleCheckUser
          })}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('confirmPassword', 'Confirm Password', 'password')}
          {this.renderButton('Register')}
        </form>
      </div>
    )
  }
}

export default RegisterForm
