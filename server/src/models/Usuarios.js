import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

const usuariosSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellido: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  telefono: {
    type: Number,
    required: true,
    default: null
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true
  },
  estado: {
    type: Boolean,
    default: true
  },
  token: {
    type: String,
    default: null
  },
  confirmarEmail: {
    type: Boolean,
    default: false
  },
  hospital_id: {
    type: Schema.Types.ObjectId,
    ref: 'Hospitales_Publicos'
  }
}, { timestamps: true })

// Encriptar contraseña
usuariosSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10)
  const passwordEncrypt = await bcrypt.hash(password, salt)
  return passwordEncrypt
}

// Comparar contraseñas
usuariosSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// Token OTP
usuariosSchema.methods.createToken = async function () {
  const newToken = this.token = Math.random().toString(36).slice(2)
  return newToken
}

export default model('Usuarios', usuariosSchema)
