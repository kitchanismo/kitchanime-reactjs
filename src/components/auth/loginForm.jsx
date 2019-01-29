import React from 'react'
import { Redirect } from 'react-router-dom'
import Form from './../partials/form'
import Joi from 'joi-browser'
import auth from './../../services/authService'

class LoginForm extends Form {
  state = {
    data: {
      username: '',
      password: ''
    },
    errors: {}
  }

  schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  }

  doSubmit = async () => {
    const user = { ...this.state.data }
    await auth.login(user)
    const { state } = this.props.location
    window.location = state ? state.from.pathname : '/'
  }

  render() {
    // if (auth.isValidUser()) return <Redirect to="/" />

    return (
      <div className="col-6 offset-3">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    )
  }
}

export default LoginForm
