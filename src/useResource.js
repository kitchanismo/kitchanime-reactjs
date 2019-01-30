import { useState, useEffect } from 'react'
import http from './services/httpService'

const useResources = url => {
  const [resources, setResources] = useState([])

  useEffect(
    () => {
      ;(async url => {
        const response = await http.get(url)

        setResources(response.data)
      })(url)
    },
    [url]
  )

  return resources
}

export default useResources
