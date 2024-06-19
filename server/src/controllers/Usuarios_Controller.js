/* eslint-disable camelcase */
import HospitalesPublicos from '../models/Hospitales_Publicos.js'
import Usuarios from '../models/Usuarios.js'

const registro = async (req, res) => {
  const { email, username, password } = req.body

  if (Object.values(req.body).includes('')) return res.status(400).json({ msg: 'Campos vacíos' })
  const verificarEmail = await Usuarios.findOne({ email })
  if (verificarEmail) return res.status(400).json({ msg: 'El email ya existe' })
  const verificarUsername = await Usuarios.findOne({ username })
  if (verificarUsername) return res.status(400).json({ msg: 'El username ya existe' })

  const newUsuario = new Usuarios(req.body)
  newUsuario.password = await newUsuario.encryptPassword(password)
  newUsuario.role = 'ADMIN'
  await newUsuario.save()

  const newHospital = new HospitalesPublicos(req.body)
  newHospital.admi_id = newUsuario._id
  await newHospital.save()

  await Usuarios.findByIdAndUpdate(newUsuario._id, { hospital_id: newHospital._id })

  res.status(201).json({ msg: 'Usuario admin registrado' })
}

const login = async (req, res) => {
  const { username, password } = req.body
  if (Object.values(req.body).includes('')) return res.status(400).json({ msg: 'Campos vacíos' })
  const user = await Usuarios.findOne({ username })
  if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' })
  const matchPassword = await user.matchPassword(password)
  if (!matchPassword) return res.status(400).json({ msg: 'Contraseña incorrecta' })
  const { _id, role, nombre, apellido, email, telefono, hospital_id } = user
  res.status(200).json({ _id, role, nombre, apellido, email, telefono, hospital_id, username: user.username })
}

export {
  registro,
  login
}
