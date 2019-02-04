import React, { memo, useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Joi from 'joi-browser'
import Spinner from './../partials/spinner'
import useAnime from '../../hooks/useAnime'
import auth from '../../services/authService'
import Form from '../partials/form'

import { AnimeContext } from './../../context'
import { formatDate, mapToSelect } from '../../services/utilsService'
import { SET_REFRESH } from './../../hooks/types'
import { toast } from 'react-toastify'
import { getAnime, putAnime, postAnime } from './../../services/animeService'

const AnimeForm = props => {
  const context = useContext(AnimeContext)
  const id = props.match.params.id

  const {
    state: { genres, studios, seasons, types }
  } = useAnime({ id: props.match.params.id })

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

  useEffect(() => {
    loadAnime()
  }, [])

  const loadAnime = async () => {
    try {
      if (id === 'new') return

      let { anime } = await getAnime(id)

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

    _anime.id ? await putAnime(_anime.id, _anime) : await postAnime(_anime)

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

                {renderInput('imageUrl', 'Image Url')}

                {renderButton(id !== 'new' ? 'Update' : 'Save')}
              </React.Fragment>
            )
          }}
        </Form>
      </div>
    </Spinner>
  )
}

export default memo(AnimeForm)
