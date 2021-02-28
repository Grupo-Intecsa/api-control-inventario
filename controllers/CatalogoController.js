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
    sample: async(_, res) => {

        try {

            const sample = await CatalogoServices.sample()
    
            if(!sample) throw new Error('No data in db')

            return res.status(200).json({ message: sample })

        } catch (error) {
            res.status(400).json('Error on api sample')
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
            
            const brands = await CatalogoServices.getAllBrands()
            if(!brands) throw new Error('hubo un error')

            let response = Object.values(brands).map(item => {
                return { _id: item._id, title: item.title, slug: item.slug, count: item.catalogos.length, is_active: item.isActive }
            })

            return res.status(200).json({ message: { response } })

        } catch (error) {
            res.status(400).json({ error })
        }
    },
    findBrandAndGetDataById: async(req, res) => {
            const { id } = req.params

            try {
                
                const query = await CatalogoServices.findBrandAndGetDataById(id)
                if(!query) throw new Error('do no found data')

                return res.status(200).json({ message: query })

            } catch (error) {
                res.status(404).json({ ... error })
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
            
            let response = Object.values(labelsQuery).map(item => {
                return { _id: item._id, title: item.title, count: item.labels.length, is_active: item.isActive }
            })

            return res.status(200).json({ message: { response } })
            
        } catch (error) {
            res.status(404).json({ error })
        }
    },
    findLabelsAndGetDataById: async(req, res) => {
        const { id } = req.params

        try {

            const query = await CatalogoServices.findLabelsAndGetDataById(id)

            if(!query) throw new Error('No data in db')

            return res.status(200).json({ message: query })

            
        } catch (error) {
            res.status(404).json({ ... error })
        }
    }

}