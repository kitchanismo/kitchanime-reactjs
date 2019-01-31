import React, { Component } from 'react'

import AnimeProvider from './providers/animeProvider'
import Nav from './components/partials/nav'
import Routes from './routes'

import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Nav />
        <AnimeProvider>
          <main className="container">
            <Routes />
          </main>
        </AnimeProvider>
      </React.Fragment>
    )
  }
}

export default App
