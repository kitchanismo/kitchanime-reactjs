import React from 'react'
import { Redirect } from 'react-router-dom'
import Joi from 'joi-browser'
import Form from '../partials/form'
import {
  getGenres,
  getAnime,
  getStudios,
  getSeasons,
  getTypes,
  postAnime,
  putAnime
} from '../../services/animeService'
import auth from '../../services/authService'

class AnimeForm extends Form {
  state = {
    data: {
      id: 0,
      title: '',
      description: '',
      season: '',
      type: '',
      genres: [],
      studios: []
    },
    errors: {},
    genres: [],
    studios: [],
    seasons: [],
    types: [],
    selectedGenres: [],
    selectedStudios: [],
    selectedSeason: {},
    selectedType: {}
  }

  schema = {
    id: Joi.number().integer(),
    title: Joi.string()
      .min(3)
      .required()
      .label('Title'),
    description: Joi.optional(),
    season: Joi.optional(),
    type: Joi.optional(),
    releaseDate: Joi.optional(),
    imageUrl: Joi.optional(),
    genres: Joi.array().optional(),
    studios: Joi.array().optional()
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

  loadSeasons = () => {
    let seasons = getSeasons()
    this.setState({ seasons })
  }

  loadTypes = () => {
    let types = getTypes()
    this.setState({ types })
  }

  mapToModel({ id, value }) {
    return { id, name: value }
  }

  loadAnime = async () => {
    try {
      const id = this.props.match.params.id

      if (id === 'new') return

      let { anime } = await getAnime(id)

      const {
        selectedGenres,
        selectedStudios,
        selectedSeason,
        selectedType
      } = this.mapToData(anime)

      this.setState({
        data: anime,
        selectedGenres,
        selectedStudios,
        selectedSeason,
        selectedType
      })
    } catch (err) {
      if (err.response && err.response.status === 404)
        this.props.history.replace('/not-found')
    }
  }

  mapToData(anime) {
    const selectedGenres = anime.genres.map(g => {
      return this.mapToSelect(g)
    })
    const selectedStudios = anime.studios.map(s => {
      return this.mapToSelect(s)
    })
    const selectedSeason = this.mapToSelect({ id: null, name: anime.season })
    const selectedType = this.mapToSelect({ id: null, name: anime.type })
    return { selectedGenres, selectedStudios, selectedSeason, selectedType }
  }

  async componentDidMount() {
    await this.loadAnime()
    await this.loadGenres()
    await this.loadStudios()
    this.loadSeasons()
    this.loadTypes()
  }

  doSubmit = async () => {
    if (!auth.isAdmin()) return this.props.history.replace('/unauthorized')

    const {
      data,
      selectedGenres,
      selectedStudios,
      selectedSeason,
      selectedType
    } = this.state

    const anime = { ...data }

    anime.genreIds = selectedGenres.map(g => g.id) || []
    anime.studioIds = selectedStudios.map(s => s.id) || []
    anime.season = selectedSeason.value || ''
    anime.type = selectedType.value || ''
    anime.releaseDate = anime.releaseDate || new Date('1/12/2019')

    const { id } = anime.id
      ? await putAnime(anime.id, anime)
      : await postAnime(anime)

    this.props.history.replace('/animes/' + id)
  }

  handleChangeGenres = selectedGenres => {
    this.setState({ selectedGenres })
  }

  handleChangeSeason = selectedSeason => {
    this.setState({ selectedSeason })
  }

  handleChangeType = selectedType => {
    this.setState({ selectedType })
  }

  handleChangeStudios = selectedStudios => {
    this.setState({ selectedStudios })
  }

  render() {
    const id = this.props.match.params.id

    return (
      <div className="col-8 offset-2">
        <h1>{id !== 'new' ? 'Edit Form' : 'Add Form'}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderInput('description', 'Description')}

          {this.renderSelect(
            'type',
            'Type',
            this.state.selectedType,
            this.handleChangeType,
            this.state.types
          )}

          {this.renderSelect(
            'season',
            'Season',
            this.state.selectedSeason,
            this.handleChangeSeason,
            this.state.seasons
          )}

          {this.renderSelect(
            'genreIds',
            'Genres',
            this.state.selectedGenres,
            this.handleChangeGenres,
            this.state.genres,
            { isMulti: true }
          )}

          {this.renderSelect(
            'studioIds',
            'Studios',
            this.state.selectedStudios,
            this.handleChangeStudios,
            this.state.studios,
            { isMulti: true }
          )}

          {this.renderButton(id !== 'new' ? 'Update' : 'Save')}
        </form>
      </div>
    )
  }
}

export default AnimeForm
