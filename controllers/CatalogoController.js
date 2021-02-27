const { CatalogoServices } = require('../services')

module.exports = {

    create: async(req, res) => {

        try {

            const newItem = await CatalogoServices.create(req.body)
            if(!newItem) throw new Error('no item create')

            return res.status(200).json({ message: newItem })

        } catch (error) {
            res.status(404).json({ error })
        }
    },
    insertMany: async(req, res) => {

        console.log('de tu padre')

        try {
            
            const manyProductos = await CatalogoServices.insertMany(req.body)

            if(manyProductos){
                return res.status(200).json({ message: 'success' })
            }
        } catch (error) {
            res.status(400).json({ message: error })
        }
    },
    getAllProducts: async(_, res) => {

        try {
            
            const query = await CatalogoServices.getAllProducts()
            if(!query) throw new Error('No data')
            
            return res.status(200).json({ message: query })

        } catch (error) {
            res.status(404).json({ error })
        }
    },

    // BRAND
    createBrand: async(req, res) => {
        
        try {

            const newBrand = await CatalogoServices.createBrand(req.body)
            if(!newBrand) throw new Error('hubo un error')
            
            return res.status(200).json({ message: newBrand })
            
        } catch (error) {
            res.status(404).json({ error })
        }

    },
    getAllBrands: async(_, res) => {
        try {
            
            console.log('atencion')
            const brands = await CatalogoServices.getAllBrands()
            if(!brands) throw new Error('hubo un error')

            return res.status(200).json({ message: brands })

        } catch (error) {
            res.status(400).json({ error })
        }
    },

    // LABELS
    createLabel: async(req, res) => {

        try {

            const newLabel = await CatalogoServices.createLabel(req.body)
            
            if(!newLabel) throw new Error('hubo un error')

            return res.status(200).json({ message: newLabel })
            
        } catch (error) {
            res.status(404).json({ error })
        }
        
    },
    getAllLabels:  async(_, res) => {

        try {

            const labelsQuery = await CatalogoServices.getAllLabels()
            
            return res.status(200).json({ message: labelsQuery })
            
        } catch (error) {
            res.status(404).json({ error })
        }
    },
    

}