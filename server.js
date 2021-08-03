require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
// para firebase y uso de cookies
const cookieParser = require('cookie-parser')
// const csrf = require('csurf')
const admin = require('firebase-admin')
const serviceAccount = require('./test/serviceAccountKey.json')

const app = express()
const PORT = process.env.PORT
const { MONGO_URI } = require('./config')


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

// const csrMiddleware = csrf({ cookie: true })

app.engine("html", require('ejs').renderFile)
app.use(express.static('static'))

// MIDDLEWARES
app.use(cors({ origin: true }))
app.use(cookieParser())
// app.use(csrMiddleware)
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

// app.all("*", (req, res, next) => {
//     res.cookie("XSRF-TOKEN", req.csrfToken())
// })

// conexión con mongoose
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('Conectado a la base de datos'))
    .catch((err) => console.log(`Error en la conexion de la base de datos ${err}`))

// encendido 
app.use(require('./routes'))
app.listen(PORT, () => console.log('Express conectado y escuchando en el puerto: ', PORT ))
