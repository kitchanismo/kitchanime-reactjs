import React, { Component } from 'react'
import Joi from 'joi-browser'
import Form from './partials/form'
import { getGenres, getAnime, postAnime } from '../services/animeService'

class AnimeForm extends Form {
  state = {
    data: {
      title: '',
      description: ''
    },
    genres: [],
    errors: {}
  }

  schema = {
    id: Joi.string(),
    title: Joi.string()
      .required()
      .label('Title'),
    description: Joi.string()
      .required()
      .label('Description')
  }

  loadGenres = async () => {
    let { genres } = await getGenres()
    this.setState({ genres })
  }

  loadAnime = async () => {
    try {
      const id = this.props.match.params.id

      if (id === 'new') return

      let { anime } = await getAnime(id)
      this.setState({ data: anime })
    } catch (err) {
      if (err.response && err.response.status === 404)
        this.props.history.replace('/not-found')
    }
  }

  async componentDidMount() {
    await this.loadAnime()
    // await this.loadGenres()
  }
  doSubmit = async () => {
    await postAnime(this.state.data)
  }
  render() {
    return (
      <div className="col-8 offset-2">
        <h1>Anime Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderInput('description', 'Description')}
          {this.renderButton('Save')}
        </form>
      </div>
    )
  }
}

export default AnimeForm
