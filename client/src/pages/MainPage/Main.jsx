import './Main.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

const URL = 'https://api-emergencias.onrender.com/api/hospitalP'

export function Main () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(null)

  useEffect(() => {
    if (loading) {
      axios.get(URL)
        .then(res => {
          setData(res.data)
          setLoading(false)
        })
        .catch(err => {
          console.log('Error al obtener la informacion:', err)
        })
    }
  }, [loading])

  const handleLoading = () => {
    setLoading(true)
  }

  return (
    <main className='MainPage'>
      <h1>Hospitales Quito</h1>
      <button onClick={handleLoading}>Ver Información</button>
      {loading === false && (
        <div className='container'>
          {data.map((hospital, index) => (
            <div key={index} className='card'>
              <h2>{hospital.hospital_nombre}</h2>
              <div className='info'>
                <p><strong>Dirección: </strong>{hospital.hospital_direccion}</p>
                <p><strong>Teléfono: </strong>{hospital.hospital_telefono}</p>
                <p><strong>Camas: </strong>{hospital.camas}</p>
                <p><strong>Respiradores: </strong>{hospital.respiradores} </p>
                <p><strong>Operarios: </strong>{hospital.trabajadores} </p>
                <img src={hospital.img} alt={`Hospital ${hospital.hospital_nombre}`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
