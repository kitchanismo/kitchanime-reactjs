import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import withAuth from '../hoc/withAuth'
const GuestRoute = ({ auth, path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isValidUser())
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />
          )
        return Component ? <Component {...props} /> : render(props)
      }}
    />
  )
}

export default withAuth(GuestRoute)
