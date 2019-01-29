import React, { Component } from 'react'

import AnimeStore from './stores/animeStore'
import Nav from './components/partials/nav'
import Routes from './routes'

import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Nav />
        <AnimeStore>
          <main className="container">
            <Routes />
          </main>
        </AnimeStore>
      </React.Fragment>
    )
  }
}

export default App
