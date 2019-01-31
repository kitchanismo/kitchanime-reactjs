import React from 'react'
import Form from './../partials/form'
import Joi from 'joi-browser'
import auth from './../../services/authService'
import { capitalize } from '../../services/utilsService'
import { toast } from 'react-toastify'

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
    try {
      await auth.login(user)
      toast.success(`Welcome, ${capitalize(user.username)}`)
      this.props.history.replace('/home')
    } catch (err) {
      toast.error('Invalid username or password')
    }
  }

  render() {
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
