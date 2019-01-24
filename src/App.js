import { Route, Redirect, Switch } from 'react-router-dom'
import React, { Component } from 'react'

import AnimeProvider from './providers/animeProvider'

import Nav from './components/partials/nav'
import Home from './components/home'
import NotFound from './components/partials/notFound'
import AnimeForm from './components/animeForm'

import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Nav />
        <AnimeProvider>
          <main className="container">
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/animes/:id" component={AnimeForm} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/home" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </AnimeProvider>
      </React.Fragment>
    )
  }
}

export default App
