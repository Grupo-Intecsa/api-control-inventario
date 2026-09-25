const { FamiliasServices } = require('../services')
const { JSDOM } = require("jsdom")
const fetch = require('node-fetch')

module.exports = {
    create: async(req, res) =>  {
        
        try {
            const productData = await FamiliasServices.create(req.body)
            
            if(productData){
                return res.status(200).json({ message: productData })
            }
        } catch (error) {
            res.status(400).json({ message: error })
        }
    },
    insertMany: async(req, res) =>  {
        
        try {
            
            const manyProductos = await FamiliasServices.insertMany(req.body)

            if(manyProductos){
                return res.status(200).json({ message: 'success' })
            }
        } catch (error) {
            res.status(400).json({ message: error })
        }
    },
    getAllProdutos: async(_, res) => {

        try {
            const allProductos = await FamiliasServices.getAllProductos()
            
            if(allProductos){
                return res.status(200).json({ productos: allProductos })
            }

        } catch (error) {
            res.status(400).json({ message: error })
        }
    },
    findByQueryText: async(req, res) => {

        // TODO: se puede crear una mejor busqueda, con varios valores, para esto hay que tener un arreglo y meterlo en la query
            const { text } = req.query
        
        try {
            const response = await FamiliasServices.findByQueryText(text)

            if(response)
            res.status(200).json({ message: response })

        } catch (error) {
            res.status(400).json({ message: error })
        }
    },
    findByEan: async(req, res) => {
        const { ean } = req.params
        
        try {
            const response = await FamiliasServices.findByEan(ean)
            if(response) return res.status(200).json({ message: response })
            
        } catch (error) {
            res.status(400).json({ message: error })
        }
        
    },
    findByAlterno: async(req, res) => {
        const { alterno } = req.params

        try {
            const response = await FamiliasServices.findByAlterno(alterno)
            if(response) return res.status(200).json({ message: response })

        } catch (error) {
            res.status(400).json({ message: error })
        }
        
    },
    findByIdAndUpdate: async(req, res) => {
        const payload = req.body
        const { _id } = req.params

        try {
            const response = await FamiliasServices.findByIdAndUpdate(_id, payload)
            if(response) res.status(200).json({ message: response })
        } catch (error) {
            res.status(400).json({ message: 'udapte fail'})
        }

    },
    findById: async(req, res) => {
        const { _id } = req.params

        try {
            const response = await FamiliasServices.findById(_id)
            if(response){
                res.status(200).json({ message: response })
            }
        } catch (error) {
            res.status(400).json({ message: error })
        }
    }, 
    getFamiliaByTitleId: async(req, res) => {
        

        try {
            const response = await FamiliasServices.getFamiliaByTitleId(req.query)
            if(response){
                res.status(200).json({ message: response })
            }
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getMLPrice: async(req, res) => {
        const { ml } = req.query
        const URL = `https://articulo.mercadolibre.com.mx/MLM-${ml}`

        try {
        
        // si ml no estsa difindo lanzamos el error 
        if(typeof ml === 'undefined'){
            throw new Error('ML undefined')
        }
        
        const document = await fetch(URL)
            .then(res => res.text())
            .then(html => html)
        
        const parser =  new JSDOM(document, {
            contentType: "text/html"
        })

        const precio = parser.window.document.getElementsByClassName("price-tag-amount")
        // const descABB = parser.window.document.getElementsByTagName('dt')

        let precioML 
        if(precio.length === 3 ){
            precioML = precio[1]
        }else if(precio.length === 2){
            precioML = precio[0]
        }
        
        res.status(200).json({ precio: (precioML?.textContent).split('$')[1] })

        } catch (error) {
            res.status(400).json(error)
        }
    
    }

}