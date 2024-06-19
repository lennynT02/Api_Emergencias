import axios from 'axios'
import { useEffect, useState } from 'react'

export function useData (url) {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get(url)
      .then(res => {
        setData(res.data)
      })
      .catch(err => {
        console.log('Error al obtener la informacion:', err)
      })
  }, [])
  return data
}
