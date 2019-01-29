import React from 'react'

import Joi from 'joi-browser'
import { formatDate } from '../../services/utilsService'
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
import Spinner from './../partials/spinner'

class AnimeForm extends Form {
  state = {
    data: {
      id: 0,
      title: '',
      description: '',
      season: null,
      type: null,
      genres: [],
      studios: [],
      releaseDate: ''
    },
    errors: {},
    genres: [],
    studios: [],
    seasons: [],
    types: [],
    selectedGenres: [],
    selectedStudios: [],
    selectedSeason: null,
    selectedType: null
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

  customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'blue',
      padding: 20
    }),
    control: () => ({
      // none of react-select's styles are passed to <Control />
      width: 200
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'

      return { ...provided, opacity, transition }
    }
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

  loadSeasons = () => this.setState({ seasons: getSeasons() })

  loadTypes = () => this.setState({ types: getTypes() })

  mapToModel = ({ id, value }) => ({ id, name: value })

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

      anime.releaseDate = formatDate(anime.releaseDate)

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

    if (anime.releaseDate) {
      anime.releaseDate = new Date(anime.releaseDate).toISOString()
    } else {
      delete anime.releaseDate
    }

    const { id } = anime.id
      ? await putAnime(anime.id, anime)
      : await postAnime(anime)

    this.props.history.replace('/')
  }

  handleChangeGenres = selectedGenres => this.setState({ selectedGenres })

  handleChangeSeason = selectedSeason => this.setState({ selectedSeason })

  handleChangeType = selectedType => this.setState({ selectedType })

  handleChangeStudios = selectedStudios => this.setState({ selectedStudios })

  handleDateChange = date => {
    const data = { ...this.state.data }

    data.releaseDate = formatDate(date)

    this.setState({ data })
  }

  render() {
    const id = this.props.match.params.id

    return (
      <Spinner isLoaded={this.state.studios.length > 0 || id === 'new'}>
        <div className="col-8 offset-2">
          <h1>{id !== 'new' ? 'Edit Form' : 'Add Form'}</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput('title', 'Title')}
            {this.renderTextArea('description', 'Description')}

            {this.renderSelect(
              'type',
              'Type',
              this.state.selectedType,
              this.handleChangeType,
              this.state.types
            )}

            <div className="row">
              <div className="col-8">
                {this.renderSelect(
                  'season',
                  'Season',
                  this.state.selectedSeason,
                  this.handleChangeSeason,
                  this.state.seasons
                )}
              </div>
              <div className="col-4 d-flex justify-content-end">
                {this.renderDatePicker('releaseDate', 'Release', {
                  onChange: this.handleDateChange
                })}
              </div>
            </div>

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
      </Spinner>
    )
  }
}

export default AnimeForm
