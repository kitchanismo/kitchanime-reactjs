import React, { useState } from 'react'
import Joi from 'joi-browser'
import { capitalize } from './../../services/utilsService'
import withAuth from '../hoc/withAuth'
import { toast } from 'react-toastify'
import Form from '../partials/form'

const RegisterForm = ({ auth, ...props }) => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const schema = {
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

  const handleCheckUser = async ({ currentTarget: input }) => {
    const { isTaken } =
      input.name === 'username'
        ? await auth.isUsernameTaken(input.value)
        : await auth.isEmailTaken(input.value)

    const _errors = { ...errors }

    if (isTaken) {
      _errors[input.name] = `"${capitalize(input.name)}" is taken`
    } else {
      delete _errors[input.name]
    }

    setErrors(_errors)

    return _errors
  }

  const handleSubmit = async e => {
    const _errors = await handleCheckUser(e)

    if (Object.keys(_errors).length > 0) return

    const _user = { ...user }

    try {
      await auth.register(_user)

      toast.success('Welcome, ' + capitalize(user.username))

      setUser({
        username: '',
        password: '',
        email: '',
        confirmPassword: ''
      })
      setErrors(_errors)
      props.history.replace('/')
    } catch ({ response }) {
      if (response && response.status === 400) {
        toast.error(response.data.status.errors)
      }
    }
  }

  return (
    <div className="col-6 offset-3 mt-5">
      <h1>Register</h1>
      <Form
        data={{ data: user, setData: setUser }}
        errors={{ errors, setErrors }}
        onSubmit={handleSubmit}
        schema={schema}
      >
        {({ renderButton, renderInput }) => {
          return (
            <React.Fragment>
              {renderInput('username', 'Username', 'text', {
                onBlur: handleCheckUser
              })}
              {renderInput('email', 'Email', 'email', {
                onBlur: handleCheckUser
              })}
              {renderInput('password', 'Password', 'password')}
              {renderInput('confirmPassword', 'Confirm Password', 'password')}
              {renderButton('Register', null, 'Registering...')}
            </React.Fragment>
          )
        }}
      </Form>
    </div>
  )
}

export default withAuth(RegisterForm)
