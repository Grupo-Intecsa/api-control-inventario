
const { FlotillasServices, PDFServices } = require('../services')
const axios = require('axios')

module.exports = {
  create: async (req, res) => {
    const { type } = req.query
    const { body } = req

    if (!type) {
      return res.status(400).json({
        success: false,
        message: 'No se especificó el tipo de registro'
      })
    }

    if (['traslado', 'flete', 'renta'].indexOf(type) === -1) {
      return res.status(400).json({
        success: false,
        message: 'El tipo de registro es inválido'
      })
    }

    if (Object.keys(body).length === 0) {
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
    } catch (error) {
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
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  },
  createVehiculo: async (req, res) => {
    const { body } = req
    if (Object.keys(body).length === 0) {
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
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  },
  getEmpresas: async (req, res) => {
    try {
      const response = await FlotillasServices.getEmpresas()
      if (response) {
        return res.status(200).json({ empresas: response })
      }
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  },
  getDocumentsByIdBussiness: async (req, res) => {
    const { idBussines } = req.params
    const { type } = req.query

    try {
      const response = await FlotillasServices.getDocumentsByIdBussiness({ idBussines, query: type })
      if (response) {
        return res.status(200).json({ documents: response })
      }
    } catch (error) {
      console.log(error)
      return res.status(400).json({ message: error })
    }
  },
  getVehiculo: async (req, res) => {
    try {
      const response = await FlotillasServices.getVehicles()
      if (response) {
        return res.status(200).json({ vehicles: response })
      }
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  },
  createPlan: async (req, res) => {
    const { body } = req

    try {
      const response = await FlotillasServices.createPlan(body)
      if (response) {
        const planesById = await FlotillasServices.getPlanByObjectId(body.flotilla)
        return res.status(200).json({ planes: planesById })
      } else {
        return res.status(400).json({ message: 'No se pudo crear el plan' })
      }
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  },
  getPlanesByFlotilla: async (req, res) => {
    const { idFlotilla } = req.params
    try {
      const response = await FlotillasServices.getPlanByObjectId(idFlotilla)
      if (response) {
        return res.status(200).json({ planes: response })
      }
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  },
  getPlanesBySlug: async (req, res) => {
    const { slug } = req.params
    try {
      const response = await FlotillasServices.getPlanesBySlug(slug)
      if (response) {
        return res.status(200).json({ planes: response })
      }
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  },
  printPlan: async (req, res) => {
    console.log(req.query.type)
    // [ 'traslado', 'flete', 'renta' ]
    const { type } = req.query
    const { idDocument } = req.params

    if (!type || !idDocument) {
      return res.status(400).json({
        message: 'No se especificó el tipo de registro o el id del documento'
      })
    }
    try {
      const getDocumentData = await FlotillasServices.getDocument(idDocument, type)
      const getFlotillaData = await FlotillasServices.getPlanesByPlacas(getDocumentData.vehicle)
      const invoiceData = PDFServices.vehicleData(getDocumentData, getFlotillaData)
      const response = await axios.post(process.env.PDF_SERVICE + '/vehicle-invoice/', invoiceData, {
        responseType: 'arraybuffer'
      })

      res.contentType('application/pdf')
      return res.send(response.data)
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  },
  getPlanesByPlacas: async (req, res) => {
    const { placas } = req.params
    try {
      const response = await FlotillasServices.getPlanesByPlacas(placas)
      if (response) {
        return res.status(200).json({ vehicle: response })
      }
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  },
  update: async (req, res) => {
    const { body } = req
    const { id } = req.params
    const { type } = req.query

    try {
      const response = await FlotillasServices.update(id, body, type)
      if (response) {
        return res.status(200).json({ message: response })
      } else {
        throw new Error('No se pudo actualizar el registro')
      }
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  },
  getById: async (req, res) => {
    const { id } = req.params
    const { type } = req.query

    try {
      const response = await FlotillasServices.getById(id, type)
      if (response) {
        return res.status(200).json({ [type]: response })
      }
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  },
  updateVehiculo: async (req, res) => {
    const { body } = req
    try {
      const response = await FlotillasServices.updateVehiculo(body)
      if (response) {
        return res.status(200).json({ message: response })
      }
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  },
  updatePlanById: async (req, res) => {
    const { _id } = req.params
    const { body } = req

    try {
      const response = await FlotillasServices.updatePlanById(_id, body)
      if (response) {
        return res.status(200).json({ message: response })
      }
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  }

}
