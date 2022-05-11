require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT
const { MONGO_URI } = require('./config')

// MIDDLEWARES
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'OPTIONS', // what matters here is that OPTIONS is present
        );
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });

    var allowedOrigins = ['http://localhost:3001', 'https://logistica-chi.vercel.app/'];
    app.use(cors({
        origin: function(origin, callback){
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if(!origin) return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1){
            var msg = 'The CORS policy for this site does not ' +
            'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
            return callback(null, true);
        }
    }));    


app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: true }))

// conexión con mongoose
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('Conectado a la base de datos'))
    .catch((err) => console.log(`Error en la conexion de la base de datos ${err}`))

// encendido 
app.use(require('./routes'))
app.listen(PORT, () => console.log('Express conectado y escuchando en el puerto: ', PORT ))
