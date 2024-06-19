import { Router } from 'express'
import { verifyToken } from '../middlewares/auth.js'
import {
  getAllHospitalesPublicos,
  getHospitalPublico,
  updateHospital,
  deleteHospital,
  addRecurso
} from '../controllers/HospitalP_Controller.js'

const hospitalPRouter = Router()

hospitalPRouter.get('/hospitalP', getAllHospitalesPublicos)
hospitalPRouter.get('/hospitalP/:id', getHospitalPublico)
hospitalPRouter.put('/hospitalP/:id', verifyToken, updateHospital)
hospitalPRouter.delete('/hospitalP/:id', verifyToken, deleteHospital)
hospitalPRouter.post('/hospitalP/:id', verifyToken, addRecurso)

export default hospitalPRouter
