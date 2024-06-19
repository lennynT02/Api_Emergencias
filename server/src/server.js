import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

// Importar rutas
import usuariosRouter from './routes/Usuarios_Routes.js'
import hospitalPRouter from './routes/HospitalP_Routes.js'

// Instancias
const app = express()
dotenv.config()

// Middlewares
app.use(express.json())
app.use(cors())

// Variables de entorno
app.set('port', process.env.PORT || 3000)

// Ruta
app.get('/', (req, res) => {
  res.send.json({ msg: 'Server on' })
})

// Rutas api
app.use('/api', usuariosRouter)
app.use('/api', hospitalPRouter)

// Rutas no encontradas
app.use((req, res) => res.status(404).json({ msg: 'Not found' }))

export default app
