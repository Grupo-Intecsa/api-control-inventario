const mongoose = require('mongoose');
const datauri = require('datauri/parser');
const { InventarioIT, UsuariosEquipos, Mantenimiento  } = require('../models')
const { uploader } = require('../database/cloudinary')
const { ref, uploadBytes, getDownloadURL, getMetadata } = require('firebase/storage')
const { v4: uuidv4 } = require('uuid');
const { storage } = require('../database/firebase')
const { responsivaGenerate } = require('../util/responsiva')
const puppeteer = require("puppeteer")

const path = require('path')

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

      // updateMany usuariosequipos para cambiar is_active a false
      await UsuariosEquipos.updateMany({ equipoid: equipo }, { is_active: false })

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
      const [response] = await InventarioIT
      .find({ _id: equipo })      
      .populate('mantenimiento')
      .populate('usuariosequipos')

      if (response) {
        return res.status(200).json({ equipo: response })
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
  },
  postUpload: async (req, res) => {
    console.log(req.file)
    const validTypes = ['image/png', 'image/jpg', 'image/jpeg']
    if (!validTypes.includes(req.file.mimetype)) {
      return res.status(400).json({ message: 'Invalid file type' })
    }

    const dUri = new datauri()
    // buffer to base64
    const file =  dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer)
    
    try {
      return uploader.upload(file.content)
      .then(async (result) => {
        console.log('Uploaded a blob or file!');        
        return res.json({ message: 'File saved successfully', url: result.url, metadata: result })        
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).json({ message: 'Error uploading file' })        
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: 'Error uploading file' })
    }
  
  },
  postFirebaseUpload: async (req, res) => {
    const { mimetype, buffer } = req.file
    const storageRef = ref(storage, '/storage' + `${uuidv4()}.${mimetype?.split('/')[1]}`)
    return uploadBytes(storageRef, buffer)
      .then(async (snapshot) => {        
        console.log('Uploaded a blob or file!');
        const metadata = await getMetadata(storageRef)
        const url = await getDownloadURL(storageRef)          
        return res.json({ message: 'File saved successfully', url, metadata })
      })
  },
  createFormat: async(req, res) => {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
        headless: true
        
    });
    const page = await browser.newPage()

    try {
        
        const pdfString = responsivaGenerate(req.body)
        await page.setContent(pdfString)

        const pdf = await page.pdf({
            
            format: "letter",
            printBackground: true,
            scale: 0.9,
            margin: {
                left: "0px",
                top: "0px",
                right: "0px",
                bottom: "0px"
            }
        })

        await browser.close()
        res.contentType("application/pdf")
        return res.send(pdf)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
  },
  postAddResponsiva: async (req, res) => {
    const { id } = req.query
    const { url } = req.body
    try {
      const response = await InventarioIT.findOneAndUpdate({ _id: id }, { $set: { responsiva: url } })
      if (response) {
        return res.status(200).json({ message: response })
      }
    } catch (error) {
      console.log(error.message)
      return res.status(500).json({ message: error.message })
    }
  },
  getLastAssignments: async (req, res) => {

    try {
      const response = await UsuariosEquipos
        .find({ is_active: true, equipoid: { $ne: null } })
        .sort({ createdAt: -1 })


      const equiposActivos = response.map(async (item) => {        
        const id = new mongoose.Types.ObjectId(item.equipoid)        
        const equipo = await InventarioIT
        .findOne({ _id: id })
        .populate('usuariosequipos')        

        return {
          equipo,
          ...item._doc
        }

      })

      const equipos = await Promise.all(equiposActivos)
      return res.status(200).json({ equipos })

    } catch(error){
      return res.status(400).json({ message: error })
    }
  }
}
