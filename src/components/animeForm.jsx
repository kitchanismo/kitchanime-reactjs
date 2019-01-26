import React, { Component } from 'react'
import Joi from 'joi-browser'
import Form from './partials/form'
import {
  getGenres,
  getAnime,
  getStudios,
  postAnime
} from '../services/animeService'

class AnimeForm extends Form {
  state = {
    data: {
      title: '',
      description: '',
      genres: [],
      studios: []
    },
    errors: {},
    genres: [],
    studios: [],
    selectedGenres: null,
    selectedStudios: null
  }
  schema = {
    id: Joi.number().integer(),
    title: Joi.string()
      .required()
      .label('Title'),
    description: Joi.string()
      .required()
      .label('Description'),
    season: Joi.any().optional(),
    type: Joi.any().optional(),
    releaseDate: Joi.any().optional(),
    imageUrl: Joi.any().optional(),
    genreIds: Joi.any().optional(),
    studioIds: Joi.any().optional(),
    genre: Joi.any().optional(),
    studio: Joi.any().optional()
  }

  loadGenres = async () => {
    let { genres } = await getGenres()

    genres = genres.map(g => {
      return this.mapToSelect(g)
    })
    this.setState({ genres })
  }

  loadStudios = async () => {
    let { studios } = await getStudios()

    studios = studios.map(s => {
      return this.mapToSelect(s)
    })
    this.setState({ studios })
  }

  mapToModel({ id, value }) {
    return { id, name: value }
  }

  loadAnime = async () => {
    try {
      const id = this.props.match.params.id

      if (id === 'new') return

      let { anime: data } = await getAnime(id)

      const selectedGenres = data.genres.map(g => {
        return this.mapToSelect(g)
      })

      const selectedStudios = data.studios.map(s => {
        return this.mapToSelect(s)
      })

      this.setState({ data, selectedGenres, selectedStudios })
    } catch (err) {
      if (err.response && err.response.status === 404)
        this.props.history.replace('/not-found')
    }
  }

  async componentDidMount() {
    await this.loadAnime()
    await this.loadGenres()
    await this.loadStudios()
  }

  doSubmit = async () => {
    const { data, selectedGenres, selectedStudios } = this.state
    const anime = { ...data }
    anime.genreIds = selectedGenres.map(g => g.id)
    anime.studioIds = selectedStudios.map(s => s.id)
    await postAnime(anime)
    this.props.history.replace('/')
  }

  handleChangeGenres = selectedGenres => {
    this.setState({ selectedGenres })
  }

  handleChangeStudios = selectedStudios => {
    this.setState({ selectedStudios })
  }

  render() {
    return (
      <div className="col-8 offset-2">
        <h1>Anime Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderInput('description', 'Description')}
          {this.renderSelect(
            'genreIds',
            'Genres',
            this.state.selectedGenres,
            this.handleChangeGenres,
            this.state.genres
          )}
          {this.renderSelect(
            'studioIds',
            'Studios',
            this.state.selectedStudios,
            this.handleChangeStudios,
            this.state.studios
          )}

          {this.renderButton('Save')}
        </form>
      </div>
    )
  }
}

export default AnimeForm
