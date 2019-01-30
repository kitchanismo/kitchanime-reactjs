import React, { Component } from 'react'
import { AnimeContext } from '../context'
import { pagination } from '../config.json'

import { sortBy } from '../services/utilsService'

import {
  getPagedAnimes,
  deleteAnime,
  getAnime,
  getStudios,
  getGenres,
  getSeasons,
  getTypes,
  putAnime,
  postAnime
} from '../services/animeService'

class AnimeStore extends Component {
  state = {
    paginate: { pageNum: 1, pages: 0, total: null },
    animes: []
  }

  async componentDidMount() {
    await this.handleLoad()
  }

  handleLoad = async () => {
    const { paginate } = this.state

    let { data: animes, lastPage, total } = await getPagedAnimes(
      paginate.pageNum,
      pagination.perPage
    )

    const firstPage = { ...paginate }

    firstPage.pages = lastPage
    firstPage.total = total

    this.setState({ animes, paginate: firstPage })
  }

  handlePageChange = async pageNum => {
    const paginate = { ...this.state.paginate }

    if (paginate.pageNum === pageNum) return

    paginate.pageNum = pageNum

    let { data: animes } = await getPagedAnimes(pageNum, pagination.perPage)

    this.setState({ animes, paginate })
  }

  handleSort = sortColumn => {
    const animes = sortBy(this.state.animes, sortColumn)
    this.setState({ animes })
  }

  handleDelete = async anime => {
    const originalAnimes = this.state.animes
    const paginate = { ...this.state.paginate }
    try {
      const animes = originalAnimes.filter(a => a.id !== anime.id)

      await deleteAnime(anime.id)
      paginate.total = paginate.total - 1
      this.setState({ animes, paginate })
    } catch (err) {
      this.setState({ animes: originalAnimes, paginate })
    }
  }

  render() {
    return (
      <AnimeContext.Provider
        value={{
          state: this.state,
          onDelete: this.handleDelete,
          onPageChange: this.handlePageChange,
          onSort: this.handleSort,
          onReLoad: this.handleLoad,
          onGetAnime: getAnime,
          onGetStudios: getStudios,
          onGetGenres: getGenres,
          onGetSeasons: getSeasons,
          onGetTypes: getTypes,
          onPutAnime: putAnime,
          onPostAnime: postAnime
        }}
      >
        {this.props.children}
      </AnimeContext.Provider>
    )
  }
}

export default AnimeStore
