import mongoose from 'mongoose'

// Establecer una regla
mongoose.set('strictQuery', false)

// Conexión a la base de datos
const connect = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI)
    console.log('Database connected to:', connection.name)
  } catch (err) {
    console.log(err)
  }
}

export { connect }
