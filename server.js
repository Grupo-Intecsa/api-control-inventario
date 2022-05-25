require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT
const { MONGO_URI } = require('./config')

// MIDDLEWARES
var allowedOrigins = ['http://localhost:3001', 'https://control-fletes.vercel.app', 'https://itamx.com', 'https://laughing-torvalds-9cd368.netlify.app'];

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');    

    next();
  });
  
  
  app.use(require('./routes'))
  
  const corsOptions = {
      origin: (origin, callback) => {
          if (allowedOrigins.indexOf(origin) !== -1) {
              callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
    };
    
app.use(cors(corsOptions));
    

// conexión con mongoose
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('Conectado a la base de datos'))
    .catch((err) => console.log(`Error en la conexion de la base de datos ${err}`))

// encendido 
app.listen(PORT, () => console.log('Express conectado y escuchando en el puerto: ', PORT ))
