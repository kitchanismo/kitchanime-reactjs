import React, { useState } from 'react'
import Joi from 'joi-browser'
import auth from './../../services/authService'
import { capitalize } from '../../services/utilsService'
import { toast } from 'react-toastify'
import FormHooks from '../partials/formHooks'

const LoginForm = props => {
  const [user, setUser] = useState({ username: '', password: '' })
  const [errors, setErrors] = useState({})

  const schema = {
    username: Joi.string()
      .required()
      .label('Username'),
    password: Joi.string()
      .required()
      .label('Password')
  }

  const handleSubmit = async (e, data) => {
    try {
      await auth.login(data)
      toast.success(`Welcome, ${capitalize(user.username)}`)
      props.history.replace('/home')
    } catch (err) {
      toast.error('Invalid username or password')
    }
  }

  return (
    <div className="col-6 offset-3">
      <h1>Login</h1>
      <FormHooks
        data={{ data: user, setData: setUser }}
        errors={{ errors, setErrors }}
        onSubmit={handleSubmit}
        schema={schema}
      >
        {(renderButton, renderInput) => {
          return (
            <React.Fragment>
              {renderInput('username', 'Username')}
              {renderInput('password', 'Password', 'password')}
              {renderButton('Login')}
            </React.Fragment>
          )
        }}
      </FormHooks>
    </div>
  )
}

export default LoginForm
