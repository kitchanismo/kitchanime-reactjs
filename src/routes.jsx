import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import Home from './components/home'
import NotFound from './components/partials/notFound'
import AnimeForm from './components/animes/animeForm'
import LoginForm from './components/auth/loginForm'
import RegisterForm from './components/auth/registerForm'
import AuthRoute from './components/partials/authRoute'
import GuestRoute from './components/partials/guestRoute'
import GenresTable from './components/genres/genresTable'
import GenreForm from './components/genres/genreForm'
import StudioForm from './components/studious/studioForm'

const Routes = () => {
  return (
    <Switch>
      <AuthRoute path="/home" component={Home} />
      <GuestRoute path="/login" component={LoginForm} />
      <GuestRoute path="/register" component={RegisterForm} />
      <AuthRoute isAdmin path="/animes/:id" component={AnimeForm} />
      <AuthRoute isAdmin path="/studios/new" component={StudioForm} />
      <AuthRoute isAdmin path="/genres/new" component={GenreForm} />
      <AuthRoute path="/genres" component={GenresTable} />
      <Route path="/not-found" component={NotFound} />>
      <Redirect from="/" exact to="/home" />
      <Redirect to="/not-found" />
    </Switch>
  )
}

export default Routes
