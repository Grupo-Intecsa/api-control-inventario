
const { FlotillasServices } = require('../services');

module.exports = {
  create: async(req, res) => {
    const { type } = req.query
    const { body } = req
  
    if(!type) {
      return res.status(400).json({
        success: false,
        message: 'No se especificó el tipo de registro'
      })
    }

    if ([ 'traslado', 'flete', 'renta' ].indexOf(type) === -1) {
      return res.status(400).json({
        success: false,
        message: 'El tipo de registro es inválido'
      })
    }

    if(Object.keys(body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se especificó el registro'
      })
    }
    
    try {
      const response = await FlotillasServices.create(type, req.body)
      if (response) {
        return res.status(200).json({ message: response })
      }
    } catch(error){
      return res.status(400).json({ message: error })
    }
  },
  get: (req, res) => {
    // TODO fallo al no tener query indicado de tipo de registro
    const { type } = req.query
    try {
      const response = FlotillasServices.get(type)
      if (response) {
        return res.status(200).json({ message: response })
      }
    } catch(error){
      return res.status(400).json({ message: error })
    }
  }, 
  createVehiculo: async(req, res) => {
    const { body } = req
    if(Object.keys(body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se especificó el registro'
      })
    }
    
    try {
      const response = await FlotillasServices.createVehiculo(req.body)
      if (response) {
        return res.status(200).json({ message: response })
      }
    } catch(error){
      return res.status(400).json({ message: error })
    }
  }, 
  getEmpresas: async(req, res) => {
    try {
      const response = await FlotillasServices.getEmpresas()
      if (response) {
        return res.status(200).json({ empresas: response })
      }
    } catch(error){
      return res.status(400).json({ message: error })
    }
  }, 
  getDocumentsByIdBussiness: async(req, res) => {
    const { idBussines } = req.params
    try {
      const response = await FlotillasServices.getDocumentsByIdBussiness(idBussines)
      if (response) {
        return res.status(200).json({ documents: response })
      }
    } catch(error){
      console.log(error)
      return res.status(400).json({ message: error })
    }
  },
  getVehiculo: async(req, res) => {    
    try {
      const response = await FlotillasServices.getVehicles()
      if (response) {
        return res.status(200).json({ vehicles: response })
      }
    } catch(error){
      return res.status(400).json({ message: error })
    }
  }

}
