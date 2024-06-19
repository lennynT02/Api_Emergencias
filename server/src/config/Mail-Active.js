import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.HOST_MAILTRAP,
  port: process.env.PORT_MAILTRAP,
  auth: {
    user: process.env.USER_MAILTRAP,
    pass: process.env.PASS_MAILTRAP
  }
})

const sendMail = (userMail, token) => {
  const mailOpcions = {
    from: process.env.USER_MAILTRAP,
    to: userMail,
    subject: 'Verifica de cuenta',
    html: `
      <h1>Sistema de emergencias medicas 🏥</h1>
      <h3>Verifica tu cuenta</h4>
      <p>Hola, haz clic <a href='${process.env.URL_BACKEND}/confirma/${encodeURIComponent(token)}'>aquí</a> para confirmar tu cuenta.</p>
      <p>Si no fuiste tú, ignora este correo.</p>
    `
  }

  transporter.sendMail(mailOpcions, (err, info) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Correo enviado: ' + info.response)
    }
  })
}

export default sendMail
