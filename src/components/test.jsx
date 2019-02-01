import React, { Component, useState, useContext, useEffect } from 'react'
import Joi from 'joi-browser'
import auth from '../services/authService'
import { formatDate } from '../services/utilsService'
import { toast } from 'react-toastify'
import Form, { mapToSelect } from './partials/form'
import { AnimeContext } from './../context'
import { SET_REFRESH } from './../hooks/types'
import Spinner from './partials/spinner'
import { Link } from 'react-router-dom'

const Login = props => {
  const context = useContext(AnimeContext)

  const [anime, setAnime] = useState({
    id: 0,
    title: '',
    description: '',
    season: null,
    type: null,
    genres: [],
    studios: [],
    releaseDate: ''
  })
  const [errors, setErrors] = useState({})
  const [genres, setGenres] = useState([])
  const [studios, setStudios] = useState([])
  const [seasons, setSeasons] = useState([])
  const [types, setTypes] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([])
  const [selectedStudios, setSelectedStudios] = useState([])
  const [selectedSeason, setSelectedSeason] = useState(null)
  const [selectedType, setSelectedType] = useState(null)

  const schema = {
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

  const loadGenres = async () => {
    let { genres } = await context.onGetGenres()

    genres = genres.map(g => {
      return mapToSelect(g)
    })
    setGenres(genres)
  }

  const loadStudios = async () => {
    let { studios } = await context.onGetStudios()

    studios = studios.map(s => {
      return mapToSelect(s)
    })
    setStudios(studios)
  }

  const loadSeasons = () => setSeasons(context.onGetSeasons())

  const loadTypes = () => setTypes(context.onGetTypes())

  const mapToModel = ({ id, value }) => ({ id, name: value })

  const loadAnime = async () => {
    try {
      const id = props.match.params.id

      if (id === 'new') return

      let { anime } = await context.onGetAnime(id)

      const {
        selectedGenres,
        selectedStudios,
        selectedSeason,
        selectedType
      } = mapToData(anime)

      anime.releaseDate = formatDate(anime.releaseDate)

      setAnime(anime)
      setSelectedGenres(selectedGenres)
      setSelectedStudios(selectedStudios)
      setSelectedSeason(selectedSeason)
      setSelectedType(selectedType)
    } catch (err) {
      if (err.response && err.response.status === 404)
        props.history.replace('/not-found')
    }
  }

  const mapToData = anime => {
    const selectedGenres = anime.genres.map(g => {
      return mapToSelect(g)
    })
    const selectedStudios = anime.studios.map(s => {
      return mapToSelect(s)
    })
    const selectedSeason = mapToSelect({ id: null, name: anime.season })
    const selectedType = mapToSelect({ id: null, name: anime.type })
    return { selectedGenres, selectedStudios, selectedSeason, selectedType }
  }

  useEffect(() => {
    loadAnime()
    loadGenres()
    loadStudios()
    loadSeasons()
    loadTypes()
  }, [])

  const handleSubmit = async () => {
    if (!auth.isAdmin()) {
      toast.error('Unauthorized user')
      return
    }

    const _anime = { ...anime }

    _anime.genreIds = selectedGenres.map(g => g.id) || []
    _anime.studioIds = selectedStudios.map(s => s.id) || []
    _anime.season = selectedSeason ? selectedSeason.value : ''
    _anime.type = selectedType ? selectedType.value : ''

    if (_anime.releaseDate) {
      _anime.releaseDate = new Date(_anime.releaseDate).toISOString()
    } else {
      delete _anime.releaseDate
    }

    _anime.id
      ? await context.onPutAnime(_anime.id, _anime)
      : await context.onPostAnime(_anime)

    _anime.id ? toast.success('Updated') : toast.success('Added')

    props.history.push('/')

    context.dispatch({ type: SET_REFRESH, payload: new Date() })
  }

  const handleChangeGenres = selectedGenres => setSelectedGenres(selectedGenres)

  const handleChangeSeason = selectedSeason => setSelectedSeason(selectedSeason)

  const handleChangeType = selectedType => setSelectedType(selectedType)

  const handleChangeStudios = selectedStudios =>
    setSelectedStudios(selectedStudios)

  const handleDateChange = date => {
    const _anime = { ...anime }

    _anime.releaseDate = formatDate(date)

    setAnime(_anime)
  }

  const id = props.match.params.id

  return (
    <Spinner isLoaded={studios.length > 0 || id === 'new'}>
      <div className="col-8 offset-2">
        <h1>{id !== 'new' ? 'Edit Form' : 'Add Form'}</h1>

        <span className=" d-flex justify-content-end">
          <Link to="/">
            <button className="btn fa fa-arrow-left btn-secondary btn-lg " />
          </Link>
        </span>
        <Form
          data={{ data: anime, setData: setAnime }}
          errors={{ errors, setErrors }}
          onSubmit={handleSubmit}
          schema={schema}
        >
          {({
            renderButton,
            renderInput,
            renderSelect,
            renderTextArea,
            renderDatePicker
          }) => {
            return (
              <React.Fragment>
                {renderInput('title', 'Title')}

                {renderTextArea('description', 'Description')}

                {renderSelect(
                  'type',
                  'Type',
                  selectedType,
                  handleChangeType,
                  types
                )}

                <div className="row">
                  <div className="col-8">
                    {renderSelect(
                      'season',
                      'Season',
                      selectedSeason,
                      handleChangeSeason,
                      seasons
                    )}
                  </div>
                  <div className="col-4 d-flex justify-content-end">
                    {renderDatePicker('releaseDate', 'Release', {
                      onChange: handleDateChange
                    })}
                  </div>
                </div>

                {renderSelect(
                  'genreIds',
                  'Genres',
                  selectedGenres,
                  handleChangeGenres,
                  genres,
                  { isMulti: true }
                )}

                {renderSelect(
                  'studioIds',
                  'Studios',
                  selectedStudios,
                  handleChangeStudios,
                  studios,
                  { isMulti: true }
                )}

                {renderButton(id !== 'new' ? 'Update' : 'Save')}
              </React.Fragment>
            )
          }}
        </Form>
      </div>
    </Spinner>
  )
}

export default Login
