/* eslint-disable camelcase */
import HospitalesPublicos from '../models/Hospitales_Publicos.js'
import Usuarios from '../models/Usuarios.js'
import sendMail from '../config/Mail-Active.js'
import { createToken } from '../middlewares/auth.js'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs-extra'

const registro = async (req, res) => {
  const { email, username, password } = req.body

  if (Object.values(req.body).includes('')) return res.status(400).json({ msg: 'Campos vacíos' })
  const verificarEmail = await Usuarios.findOne({ email })
  if (verificarEmail) return res.status(400).json({ msg: 'El email ya existe' })
  const verificarUsername = await Usuarios.findOne({ username })
  if (verificarUsername) return res.status(400).json({ msg: 'El username ya existe' })

  const newUsuario = new Usuarios(req.body)
  newUsuario.password = await newUsuario.encryptPassword(password)
  const token = await newUsuario.createToken()
  console.log(token)
  newUsuario.role = 'ADMIN'
  await newUsuario.save()
  await sendMail(email, token)

  const newHospital = new HospitalesPublicos(req.body)
  const cloudinaryRespose = await cloudinary.uploader.upload(req.files.img.tempFilePath, { folder: 'Hospitales' })
  newHospital.img = cloudinaryRespose.secure_url
  newHospital.public_id = cloudinaryRespose.public_id
  newHospital.admi_id = newUsuario._id
  await newHospital.save()

  await Usuarios.findByIdAndUpdate(newUsuario._id, { hospital_id: newHospital._id })

  await fs.unlink(req.files.img.tempFilePath)

  res.status(201).json({ msg: 'Revisa tu correo para activar tu cuenta' })
}

const login = async (req, res) => {
  const { username, password } = req.body
  if (Object.values(req.body).includes('')) return res.status(400).json({ msg: 'Campos vacíos' })
  const user = await Usuarios.findOne({ username })
  if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' })
  const matchPassword = await user.matchPassword(password)
  if (!matchPassword) return res.status(400).json({ msg: 'Contraseña incorrecta' })
  const { _id, role, nombre, apellido, email, telefono, hospital_id } = user
  const userInfo = { _id, role, nombre, apellido, email, telefono, hospital_id, username: user.username }
  const token = createToken(userInfo)
  res.status(200).json({ _id, role, nombre, apellido, email, telefono, hospital_id, username: user.username, token })
}

const confirmarEmail = async (req, res) => {
  if (!(req.params.token)) return res.status(400).json({ msg: 'Lo siento, no se puede activar la cuenta' })

  const user = await Usuarios.findOne({ token: req.params.token })
  if (!user?.token) return res.status(404).json({ msg: 'La cuenta ya fue activada' })

  await Usuarios.findByIdAndUpdate(user._id, { token: null, confirmarEmail: true })
  res.status(200).json({ msg: 'Cuenta activada ya puedes iniciar secion' })
}

export {
  registro,
  login,
  confirmarEmail
}
