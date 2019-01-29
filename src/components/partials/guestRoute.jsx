import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from '../../services/authService'

const GuestRoute = ({ path, component: Component, render, ...rest }) => {
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

export default GuestRoute
