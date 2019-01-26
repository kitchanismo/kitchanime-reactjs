import { Route, Redirect, Switch } from 'react-router-dom'
import React, { Component } from 'react'

import AnimeStore from './stores/animeStore'

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
        <AnimeStore>
          <main className="container">
            <Switch>
              <Route path="/animes" component={Home} />
              <Route path="/animes/:id" component={AnimeForm} />
              <Route path="/animes/page/:num" component={AnimeForm} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/animes" />
              <Redirect to="/not-found" />
            </Switch>
          </main>
        </AnimeStore>
      </React.Fragment>
    )
  }
}

export default App
