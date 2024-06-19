import { Schema, model } from 'mongoose'

const hospitalesPublicosSchema = new Schema({
  hospital_nombre: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  hospital_direccion: {
    type: String,
    required: true,
    trim: true
  },
  hospital_telefono: {
    type: Number,
    required: true,
    trim: true
  },
  camas: {
    type: Number,
    required: true,
    trim: true,
    default: 0
  },
  respiradores: {
    type: Number,
    required: true,
    trim: true,
    default: 0
  },
  trabajadores: {
    type: Number,
    required: true,
    trim: true,
    default: 0
  },
  imagne: {
    type: String,
    trim: true
  },
  admi_id: {
    type: Schema.Types.ObjectId,
    ref: 'Usuarios'
  }
})

export default model('Hospitales_Publicos', hospitalesPublicosSchema)
