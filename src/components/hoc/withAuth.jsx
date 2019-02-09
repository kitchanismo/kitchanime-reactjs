import React from 'react'
import auth from '../../services/authService'

const withAuth = Component => {
  return props => {
    return <Component auth={auth} {...props} />
  }
}

export default withAuth
