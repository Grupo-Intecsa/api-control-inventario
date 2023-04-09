const { InventarioIT, UsuariosEquipos, Mantenimiento  } = require('../models')


module.exports = {
  postAddEquipo: async (req, res) => {
    const { body } = req
    if(Object.keys(body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se especificó el registro'
      })
    }
    
    try {
      
      const newEquipo = new InventarioIT(body)
      const response = await newEquipo.save()      

      if (response) {
        return res.status(200).json({ message: response })
      }
    } catch(error){
      return res.status(400).json({ message: error })
    }
  },
  getEquipos: async (req, res) => {
    try {
      const response = await InventarioIT.find()
      if (response) {
        return res.status(200).json({ equipos: response })
      }
    } catch(error){
      return res.status(400).json({ message: error })
    }
  },
  postAssignEquipo: async (req, res) => {
    const { body } = req
    if(Object.keys(body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se especificó el registro'
      })
    }
    
    try {
      const { equipo } = req.query      
      const newUsuario = new UsuariosEquipos({ ...body })
      const userAssing = await newUsuario.save()

      const response = await InventarioIT.findOneAndUpdate({ _id: equipo }, { $push: { usuariosequipos: userAssing._id } })
      if (response) {
        return res.status(200).json({ message: response })
      }
    } catch(error){
      return res.status(400).json({ message: error })
    }
  },
  findEquipo: async (req, res) => {
    const { equipo } = req.query
    try {
      const response = await InventarioIT
      .find({ _id: equipo })      
      .populate('mantenimiento')
      .populate('usuariosequipos')

      if (response) {
        return res.status(200).json({ equipos: response })
      }
    } catch(error){
      return res.status(400).json({ message: error })
    }
  },
  postAddMant: async (req, res) => {
    const { body } = req
    if(Object.keys(body).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se especificó el registro'
      })
    }
    
    const { equipo } = body

    try {

      const newMantEntrie = new Mantenimiento({ descripcion: body.descripcion })

      const mantEntrie = await newMantEntrie.save()

      const response = await InventarioIT.findOneAndUpdate({ _id: equipo }, { $push: { mantenimiento: mantEntrie._id } })
      if (response) {
        return res.status(200).json({ message: response })
      }
    } catch(error){
      console.log(error)
      return res.status(400).json({ message: error })
    }
  }
}