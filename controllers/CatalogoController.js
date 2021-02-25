const { CatalogoServices } = require('../services')

module.exports = {

    create: async(req, res) => {

        try {
            
            const newItem = await CatalogoServices.create(req.body)
            if(!newItem) throw new Error('no item create')

            res.status(200).json({ message: newItem })

        } catch (error) {
            res.status(404).json({ error })
        }
    },
    getAllProducts: async(_, res) => {

        try {
            
            const query = await CatalogoServices.getAllProducts()
            if(!query) throw new Error('No data')
            
            res.status(200).json({ message: query })

        } catch (error) {
            res.status(404).json({ error })
        }
    },

    // BRAND
    createBrand: async(req, res) => {
        
        try {

            const newBrand = await CatalogoServices.createBrand(req.body)
            if(!newBrand) throw new Error('hubo un error')
            res.status(200).json({ message: newBrand })
            
        } catch (error) {
            res.status(404).json({ error })
        }

    },

    // LABELS
    createLabel: async(req, res) => {

        try {

            const newLabel = await CatalogoServices.createLabel(req.body)
            if(!newLabel) throw new Error('hubo un error')
            res.status(200).json({ message: newLabel })
            
        } catch (error) {
            res.status(404).json({ error })
        }
        
    },
    getAllLabels:  async(_, res) => {

        try {

            const labelsQuery = await CatalogoServices.getAllLabels()
            
            res.status(200).json({ message: labelsQuery })
            
        } catch (error) {
            res.status(404).json({ error })
        }
    },
    

}