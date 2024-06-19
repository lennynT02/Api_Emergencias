import { Router } from 'express'
import {
  registro,
  login,
  confirmarEmail
} from '../controllers/Usuarios_Controller.js'

const usuariosRouter = Router()

usuariosRouter.post('/registro', registro)
usuariosRouter.post('/login', login)
usuariosRouter.get('/confirma/:token', confirmarEmail)

export default usuariosRouter
