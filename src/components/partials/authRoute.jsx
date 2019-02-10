import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import withAuth from '../hoc/withAuth'

const AuthRoute = ({
  isAdmin = false,
  auth,
  path,
  component: Component,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!auth.isValidUser())
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )

        if (isAdmin && !auth.isAdmin()) {
          return <Redirect to="/not-found" />
        }
        return Component ? <Component {...props} /> : render(props)
      }}
    />
  )
}

export default withAuth(AuthRoute)
