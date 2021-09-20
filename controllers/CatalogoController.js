const { isArguments } = require('lodash')
const { CatalogoServices } = require('../services')

module.exports = {
    // Query text

    findByQueryText: async(req, res) => {
        
        try {

            const response = await CatalogoServices.findByQueryText(req.query)
            if(!response) throw new Error('no hay datos')

            res.status(200).json({ message: response })
            
        } catch (error) {
            res.status(404).json({ ...error })
        }

    },

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
    updateCatalogoByTaskFile: async(req, res) => {

        const task = req.body

        const promiseResolver = (item) => {
            return Promise.resolve(
                CatalogoServices.updateOneCatalogoByModel(item)
            ).then(res => {
                if(res.nModified > 0){
                    return 'Modificado'
                }
            })
        }

        const jobAsyncTask = async(item) => {
            return promiseResolver(item)
        }

        const getData = async() => {
            return Promise.all(task.map(item => jobAsyncTask( item )))
        }

        try {
            const job = getData()
            if(job) return res.status(200).json({ message: job })
        } catch (error) {
            res.status(400).json({ error })
        }

    },
    sample: async(req, res) => {

        try {

            const sample = await CatalogoServices.sample(req.query)
    
            if(!sample) throw new Error('No data in db')

            return res.status(200).json({ message: sample })

        } catch (error) {
            res.status(400).json('Error on api sample')
        }
    },
    getByModel: async(req, res) => {

        const { id } = req.params

        try {
            
            const producto = await CatalogoServices.getByModel(id)
            if(Object.keys(producto).length === 0) throw new Error('product not found')

            res.status(200).json({ message: producto })

        } catch (error) {
            
            res.status(404).json({ message: 'product not found' })
        }
    },
    getCatalogByID: async(req, res) => {
        
        const { id } = req.params
        
        try {

            const response = await CatalogoServices.getCatalogByID(id)
            if(!response) res.status(400).json({ message: 'product not found' })

            return res.status(200).json({ message: response })

        } catch (error) {
            res.status(400).json({ message: JSON.stringify(error) })
        }
    },

    getFamiliaByID: async(req, res) => {
        
        const { id } = req.params
        try {

            const response = await CatalogoServices.getFamiliaByID(id)
            
            if(!response){
                throw new Error('No respones FAMILIABID')
            }

            return res.status(200).json({ message: response })

        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getProductsByParentId: async(req, res) => {

        const { id } = req.params
        
        try {
            
            const response = await CatalogoServices.getProductsByParentId(id)
            if(!response) res.status(400).json({ message: 'producto not found' })

            return res.status(200).json({ message: response })
            

        } catch (error) {
            res.status(400).json({ error })
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
    getAllBrands: async(req, res) => {

        try {
            
            const brands = await CatalogoServices.getAllBrands()
            if(!brands) throw new Error('hubo un error')

            let response = Object.values(brands).map(item => {

                // Seleccionamos solo los elementos que estan activos
                let count = item.catalogos.filter(item => item.isActive === true ).length
                
                return { _id: item._id, title: item.title, slug: item.slug, count, is_active: item.isActive }
            })

            return res.status(200).json({ message: { response } })

        } catch (error) {
            res.status(400).json({ error })
        }
    },
    findByBrandIdCatalogo: async(req, res) => {

            try {
                
                const query = await CatalogoServices.findByBrandIdCatalogo(req)
                if(!query) throw new Error('do no found data')

                return res.status(200).json({ message: query })

            } catch (error) {
                res.status(404).json({ ... error })
            }

    },
    findByBrandIdFamilia: async(req, res) => {
        
        try{

            const query = await CatalogoServices.findByBrandIdFamilia(req)
            if(!query) throw new Error('no data found')

            return res.status(200).json({ message: query })

        } catch (error){
            res.status(400).json({ ... error  })
        }
    },
    getEtiquetaByBrandId: async(req, res) => {


        try {
            
            const query = await CatalogoServices.getEtiquetaByBrandId(req.params)
            if(!query) res.status(400).json({ message: 'error '})

            return res.status(200).json({ message: query })

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
            
            let response = Object.values(labelsQuery).map(item => {

            // Seleccionamos solo los elementos que estan activos
            const count = item.labels.filter(item => item.isActive === true ).length
                return { _id: item._id, title: item.title, count, is_active: item.isActive, img: item.img }
            })

            return res.status(200).json({ message: { response } })
            
        } catch (error) {
            res.status(404).json({ error })
        }
    },
    findByLabelIdCatalogo: async(req, res) => {
                
        try {

            const query = await CatalogoServices.findByLabelIdCatalogo(req)

            if(!query) throw new Error('No data in db')

            return res.status(200).json({ message: query })

            
        } catch (error) {
            res.status(404).json({ ... error })
        }
    },
    findByLabelIdFamilia: async(req, res) => {

        try {

            const query = await CatalogoServices.findByLabelIdFamilia(req)
            if(!query) throw new Error('No data in db')

            return res.status(200).json({ message: query })
            
        } catch (error) {
            res.status(400).json({ ... error })
        }

    },
    updateOneModel: async(req, res) => {

        try {
            
            const update = await CatalogoServices.updateOneModel(req)
            if(!update) throw new Error('No se puedo actualizar')

            return res.status(200).json({ message: update})

        } catch (error) {
            res.status(400).json({ error })
        }
    },
    updateByTaskFile: async(req, res) =>  {

        const task = req.body
        // TODO falta terminar el de return ok 
        const modified = []
        const noModified = []

        const promiseResolver = (item) => {
            return Promise.resolve(
                CatalogoServices.updateOneByModel(item)
                ).then(res => {
                        noModified.push(1)
                    
                    if(res?.nModified > 0){
                        modified.push(res.n)
                    }
                })
            
        }
        
        const jobAsyncTask = async(item) => {
            return promiseResolver(item)
        }

        const getData = async() => {
            return Promise.all(task.map(item => jobAsyncTask( item )))
        }
            
        try {
            const job = getData()

            const sumaModified = modified.reduce((prev, current) => prev + current)
            const sumaNomodified = modified.reduce((prev, current) => prev + current)
            
            if(job) res.status(200).json({ message: { modified: sumaModified, noModified: sumaNomodified } })
            
        } catch (error) {
            res.status(400).json({ error })
        }

    },
    createFamiliaItem: async(req, res) => {
        
        
        try {
            const response = await CatalogoServices.createFamiliaItem(req.body)    
            if(!response) throw new Error('Error en la creación de producto')

            return res.status(200).json({ message: response })
        } catch (error) {
            res.status(400).json({ error })
        }
    },
    getAllProductsBylabelId: async(req, res) => {        
        const { id } = req.params

        try{
            const response = await CatalogoServices.getAllProductsBylabelId(id)
            if(!response) throw new Error("No exisite el id solicitado")

            return res.status(200).json({ message: response })

        }catch(error){
            res.status(400).json({ error })
        }
    },
    getListFamiliaByBrandId: async({ params }, res) => {
        
        try{

            const responseData = await CatalogoServices.getListFamiliaByBrandId(params.id)
            
            console.log(typeof responseData)
            while (Array.isArray(responseData)) {
                return res.status(200).json({ message: responseData })
            }

        }catch(err){
            console.log(responseData)
            res.status(400).json({ message: "error "})
        }
    }

}