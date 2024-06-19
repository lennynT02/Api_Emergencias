import app from './server.js'
import { connect } from './database.js'

// Conectando a la base de datos
connect()

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`)
})
