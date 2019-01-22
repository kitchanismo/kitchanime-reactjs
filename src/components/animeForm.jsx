import React, { Component } from 'react'

class AnimeForm extends Component {
  state = {}
  render() {
    return <h1>{this.props.match.params.id}</h1>
  }
}

export default AnimeForm
