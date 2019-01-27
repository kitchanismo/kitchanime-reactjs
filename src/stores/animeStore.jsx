import React, { Component } from 'react'
import { AnimeContext } from '../context'
import { getPagedAnimes, deleteAnime } from '../services/animeService'
import { pagination } from '../config.json'

class AnimeStore extends Component {
  state = {
    paginate: { pageNum: 1, pages: 0, total: null },
    animes: []
    // data: {
    //   paginate: { pageNum: 1, pages: 0, total: null },
    //   animes: [],
    // }
  }

  async componentDidMount() {
    await this.initialPage()
  }

  initialPage = async () => {
    const { paginate } = this.state

    let { data: animes, lastPage, total } = await getPagedAnimes(
      paginate.pageNum,
      pagination.perPage
    )

    const initPage = { ...paginate }

    initPage.pages = lastPage
    initPage.total = total

    this.setState({ animes, paginate: initPage })
  }

  handlePageChange = async pageNum => {
    const paginate = { ...this.state.paginate }

    if (paginate.pageNum === pageNum) return

    paginate.pageNum = pageNum

    let { data: animes } = await getPagedAnimes(pageNum, pagination.perPage)

    this.setState({ animes, paginate })
  }

  handleSet = animes => {
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

    // delete on server
  }

  render() {
    return (
      <AnimeContext.Provider
        value={{
          state: this.state,
          onDelete: this.handleDelete,
          onPageChange: this.handlePageChange,
          onSet: this.handleSet
        }}
      >
        {this.props.children}
      </AnimeContext.Provider>
    )
  }
}

export default AnimeStore
