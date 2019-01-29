import React from 'react'
import { Redirect } from 'react-router-dom'

const RedirectTo = (isAuth, to) => {
  return isAuth ? null : <Redirect to={to} />
}

export default RedirectTo
