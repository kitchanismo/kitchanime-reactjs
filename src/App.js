import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify'
import AnimeProvider from './providers/animeProvider'
import Nav from './components/partials/nav'
import Routes from './routes'

import './App.css'
import 'react-toastify/dist/ReactToastify.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <AnimeProvider>
          <Nav />
          <ToastContainer autoClose={3000} />
          <main className="container">
            <Routes />
          </main>
        </AnimeProvider>
      </React.Fragment>
    )
  }
}

export default App
