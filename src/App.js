import { Route, Redirect, Switch } from 'react-router-dom'
import React, { Component } from 'react'

import AnimeStore from './stores/animeStore'

import Nav from './components/partials/nav'
import Home from './components/home'
import NotFound from './components/partials/notFound'
import AnimeForm from './components/animes/animeForm'
import LoginForm from './components/auth/loginForm'
import RegisterForm from './components/auth/registerForm'

import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Nav />
        <AnimeStore>
          <main className="container">
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/login" component={LoginForm} />
              <Route exact path="/register" component={RegisterForm} />
              <Route path="/animes/:id" component={AnimeForm} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/home" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </AnimeStore>
      </React.Fragment>
    )
  }
}

export default App
