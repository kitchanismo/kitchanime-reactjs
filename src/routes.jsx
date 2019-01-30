import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Home from './components/home'
import NotFound from './components/partials/notFound'
import AnimeForm from './components/animes/animeForm'
import LoginForm from './components/auth/loginForm'
import RegisterForm from './components/auth/registerForm'
import AuthRoute from './components/partials/authRoute'
import GuestRoute from './components/partials/guestRoute'
import UnAuthorized from './components/partials/unauthorized'
import TestReducer from './components/test'

const Routes = () => {
  return (
    <Switch>
      <AuthRoute path="/home" component={Home} />
      <GuestRoute path="/login" component={LoginForm} />
      <GuestRoute path="/register" component={RegisterForm} />
      <AuthRoute path="/animes/:id" component={AnimeForm} />
      <Route path="/not-found" component={NotFound} />
      <Route path="/test" component={TestReducer} />
      <Route path="/unauthorized" component={UnAuthorized} />
      <Redirect from="/" exact to="/home" />
      <Redirect to="/not-found" />
    </Switch>
  )
}

export default Routes
