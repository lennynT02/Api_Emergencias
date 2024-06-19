import { Router } from 'express'
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
hospitalPRouter.put('/hospitalP/:id', updateHospital)
hospitalPRouter.delete('/hospitalP/:id', deleteHospital)
hospitalPRouter.post('/hospitalP/:id', addRecurso)

export default hospitalPRouter
