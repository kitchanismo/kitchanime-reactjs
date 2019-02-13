import React, { useContext, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { AnimeContext } from './../context'
import AnimesTable from './animes/animesTable'

import HeaderTitle from './partials/headerTitle'

const Home = () => {
  const { state } = useContext(AnimeContext)

  return (
    <React.Fragment>
      <HeaderTitle total={state.total} title={'Animes'} />
      <AnimesTable />
    </React.Fragment>
  )
}

export default memo(Home)
