/* eslint-disable camelcase */
import Hospitales_Publicos from '../models/Hospitales_Publicos.js'

const getAllHospitalesPublicos = async (req, res) => {
  const hospitalesPublicos = await Hospitales_Publicos.find({}, 'hospital_nombre hospital_direccion hospital_telefono -_id')
  res.status(200).json(hospitalesPublicos)
}

const getHospitalPublico = async (req, res) => {
  try {
    const { id } = req.params
    const hospitalPublico = await Hospitales_Publicos.findById(id, 'hospital_nombre hospital_direccion hospital_telefono -_id')
    res.status(200).json(hospitalPublico)
  } catch (error) {
    res.status(404).json({ msg: 'Hospital no encontrado' })
  }
}

const updateHospital = async (req, res) => {
  try {
    const { id } = req.params
    await Hospitales_Publicos.findByIdAndUpdate(id, req.body)
    const updateHospital = await Hospitales_Publicos.findById(id)
    res.status(200).json({ msg: 'Hospital actualizado', data: updateHospital })
  } catch (error) {
    res.status(404).json({ msg: 'Hospital no encontrado' })
  }
}

const deleteHospital = async (req, res) => {
  try {
    const { id } = req.params
    await Hospitales_Publicos.findByIdAndDelete(id)
    res.status(200).json({ msg: 'Hospital eliminado' })
  } catch (error) {
    res.status(404).json({ msg: 'Hospital no encontrado' })
  }
}

const addRecurso = async (req, res) => {
  try {
    const { id } = req.params
    const { recurso, cantidad } = req.body
    const hospitalPublico = await Hospitales_Publicos.findById(id)
    hospitalPublico[recurso] += cantidad
    await hospitalPublico.save()
    res.status(200).json({ msg: 'Recurso agregado', data: hospitalPublico })
  } catch (error) {
    res.status(404).json({ msg: 'Hospital no encontrado' })
  }
}

export {
  getAllHospitalesPublicos,
  getHospitalPublico,
  updateHospital,
  deleteHospital,
  addRecurso
}
