import React, { useContext, memo } from 'react'

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
