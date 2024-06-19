import { Router } from 'express'
import {
  registro,
  login
} from '../controllers/Usuarios_Controller.js'

const usuariosRouter = Router()

usuariosRouter.post('/registro', registro)
usuariosRouter.post('/login', login)

export default usuariosRouter
