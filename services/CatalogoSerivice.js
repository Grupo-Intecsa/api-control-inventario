const mongoose = require('mongoose')
const { Catalogo, Label, Brand, Familia } = require('../models/')
var _ = require('lodash');


function customizer(objValue, srcValue) {
      if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    }

module.exports =  {
    
    findByQueryText: async({ text }) => {
                
        // obtener lista de familias
        function familiasFilter(obj){
            const values = []
            obj.forEach(({ familia }) => {
                if(!values.includes(familia)){
                    values.push(familia)
                }
            })
            return values
        }
        
        const valoresUnicos = (payload) => {
            
            let capacidad = payload.map(({capacidad}) =>  capacidad )
            
            const key = []
            let sufijo = []
            let valores = []
            
            //  Sufijos
            Object.values(capacidad).map((val) => {
                Object.entries(val).forEach(([key, val]) => {
                    if(!sufijo.includes(key)){
                        sufijo.push(key)
                    }
                })
            })
            
            //   obtener los valores 
            Object.values(capacidad).map((val) => {
                Object.entries(val).forEach(([key, val]) => {
                    sufijo.map(sufijo => {
                        if(key === sufijo){
                            if(!valores.includes(val)){
                                valores.push(val)
                            }
                        }
                    })
                })
            })
            
            
            return { sufijo, valores }  
            
        }
        
        const arrayUnico = ( payload ) => {
            const cheValues = []
            const valoresUnicos = []
            
            payload.forEach(item => {
                if(!cheValues.includes(item.model)){
                    cheValues.push(item.model)
                    valoresUnicos.push(item)
                }
            })
            
            return valoresUnicos 
        }

        let regText = text.split(" ").map(item => new RegExp(`${item}.*`, 'i'))        
        // la consulta a title
        const dataTitle = new Promise((resolve) => {
            resolve(
                Catalogo.aggregate()
                .match({ "isActive": true })
                .match({ "title": { "$all": regText }})
                .sort({ "title": -1 })
                )
            })
            
            const dataDesc = new Promise((resolve) => {
                resolve(
                    Catalogo.aggregate()
                    .match({ "isActive": true })
                    .match({ "desc": { "$all": regText }})
                    .sort({ "desc": -1 })
                    )
                })

        return Promise.all([ dataTitle, dataDesc ])
        .then(res => {

            const bruto = res[0].concat(res[1])
            const flat = bruto.reduce((arr, current ) =>  arr.concat(current), [])
            const payload = arrayUnico(flat)

            // estos valores salen del concat que hare 
            let pages = payload.length
            let familias = familiasFilter(payload)
            let valoresFiltros = valoresUnicos(payload)

            return { payload, pages, familias, valoresFiltros }
        })
            
    },
    // PRODUCTOS

    create: (props) => new Catalogo(props).save(),

    insertMany: (payload) => {
        const response = Catalogo.insertMany( payload , function(err, docs){
            if(err) throw new Error(JSON.stringify(err))
            
            return docs
        })
        return response
    },
    getAllProducts: () => Catalogo.find({ isActive: true }),
    sample: async({ limit, offset }) => {

        const p1 = new Promise((resolve, _) => {
                resolve(
                    Catalogo.aggregate()
                        .match({ 'isActive': true })
                        .sort({ 'createdAt': -1 })
                        .skip(Number(offset))
                        .limit(Number(limit))
                )
        })

        const p2 = new Promise((resolve, _) => {
            resolve(Catalogo.countDocuments({ "isActive": true }, function( err, count) {
                return count
            }))
        })

        const p3 = new Promise((resolve, _) => {
            resolve(Familia.countDocuments({ "isActive": true }, function(err, count){
                return count
            }))
        })
        

        return Promise.all([ p1, p2, p3 ]).then(res => {
            let response = {}
            return(
                {...response, prod: res[0], count: Number(res[1]) + Number(res[2]), infiniteCount: res[1] }
            )
        })

    },
    getByModel: (id) => Catalogo.find({ model: id }),
    getCatalogByID: (id) => {
        const catRes =  Catalogo.findById(id)
        return catRes
    },
    upateCatalogoByTaskFile: ({ model, ... restOfdata}) => {


    },
    getFamiliaByID: (id) => {
        const catRes =  Familia.findById(id)
        return catRes
    },
    getProductsByParentId: (id) => Familia.aggregate().match({ "parent.catalogo_id": new mongoose.Types.ObjectId(id) }).sort({ "capacidad": 1 }),
    // Brands
    createBrand: (props) => new Brand(props).save(),

    getAllBrands: async() => {

        const catalogos = await Brand.aggregate()
                    .lookup({
                        'from': 'catalogos', 
                        'localField': '_id', 
                        'foreignField': 'brand.brand_id', 
                        'as': 'catalogos' 
                    })

        const familias = await Brand.aggregate()                    
                    .lookup({
                        'from': 'familias',
                        'localField': '_id',
                        'foreignField': 'brand.brand_id',
                        'as': 'catalogos'
                    })

        
        const response =  Promise.all([ catalogos, familias  ]).then(res =>{
            
            let lodash = _.mergeWith(res[0], res[1], customizer);
            return lodash
        })

        return response


    },
    findByBrandIdCatalogo: async(req) => {

        const { id } = req.params
        const { limit, offset } = req.query

        // obtenemos el total de documentos de la coleccion de catalogos, por brand 

        let p0 = new Promise((resolve, reject) => {
                resolve(
                    Catalogo.aggregate()
                        .match({
                            $and: [ ({ "brand.brand_id": new mongoose.Types.ObjectId(id) }), { "isActive": true }]
                        })
                        .count('total')

                )
        })

        // buscamos los documentos activos por marca en la coleccion de catalogos

        let p1 = new Promise((resolve, reject) => {
    
            resolve(
                Catalogo.aggregate()
                    .match({ '$and': [ { "brand.brand_id": new mongoose.Types.ObjectId(id) }, { "isActive": true } ] })
                    .skip(Number(offset))
                    .limit(Number(limit))
            )
        })

        let response = Promise.all([ p0, p1 ])
        .then(res => {

            let count
            if( res[0].length > 0 ){
                count = res[0].reduce((acc, val) => acc.concat(val))
            }else if(res[0].length === 0){
                count = { total: 0 }                
            }
            
            return { response: res[1], info: count }
        })
        .catch(err => console.log(err))

        return response

    },
    // FIND BRAND BY ID FAMILIA
    findByBrandIdFamilia: async(req) => {
        
        const { id } = req.params
        const { limit, offset } = req.query

        // obtenemos el total de documentos de la coleccion de catalogos, por brand 

        let p0 = new Promise((resolve, reject) => {
                resolve(
                    Familia.aggregate()
                        .match({
                            $and: [ ({ "brand.brand_id": new mongoose.Types.ObjectId(id) }), { "isActive": true }]
                        })
                        .count('total')

                )
        })

        // buscamos los documentos activos por marca en la coleccion de catalogos

        let p1 = new Promise((resolve, reject) => {
    
            resolve(
                Familia.aggregate()
                    .match({ '$and': [ { "brand.brand_id": new mongoose.Types.ObjectId(id) }, { "isActive": true } ] })
                    .sort({ 'createdAt': -1 })
                    .skip(Number(offset)) 
                    .limit(Number(limit))
            )
        })

        let response = Promise.all([ p0, p1 ])
        .then(res => {
        
            return { response: res[1], info: res[0]  }
        })
        .catch(err => console.log(err))

        return response
    },
    getEtiquetaByBrandId: ({ id }) => {

        let p1 =  new Promise((resolve, reject) => {
            resolve(
                Familia.aggregate()
                    .match({ '$and' : [ { "brand.brand_id": new mongoose.Types.ObjectId(id)}, { "isActive": true } ] })
                    .project({ 'familia': 1, 'urlfoto': 1, '_id': 0 })
                    
            )
        })

        let response = Promise.all([ p1 ]).then(res => {
            return res[0]
        })

        return response
    },


    // Label
    createLabel: (props) => new Label(props).save(),
    getAllLabels: async() => {

        const catalogos = await Label.aggregate()
        .lookup({
            'from': 'catalogos', 
            'localField': '_id', 
            'foreignField': 'label.label_id', 
            'as': 'labels' 
        }).sort({ "title": 1 }).match({ isActive: true})

        const familias = await Label.aggregate()
        .lookup({
            'from': 'familias', 
            'localField': '_id', 
            'foreignField': 'label.label_id', 
            'as': 'labels' 
        }).sort({ "title": 1 }).match({ isActive: true})

        const response =  Promise.all([ catalogos, familias  ]).then(res =>{
            
            let lodash = _.mergeWith(res[0], res[1], customizer);
            return lodash
        })

        return response

    },
    // findLabelsAndGetDataById: async(id) => Catalogo.find({ '$and': [ { "label.label_id": id }, { "isActive": true } ] }),
    findByLabelIdCatalogo: async(req) => {

        const { id } = req.params
        const { limit, offset } = req.query

        // numero de documentos
        let p0 = new Promise((resolve, reject) => {
            resolve(
                Catalogo.aggregate()
                    .match({ '$and': [{ "label.label_id": new mongoose.Types.ObjectId(id)}, { "isActive": true } ]})
                    .count('total')
            )
        }) 
        
        // documentos por id de familia
        let p1 = new Promise((resolve, reject) => {
            resolve(
                Familia.aggregate()
                    .match({ '$and': [ { "label.label_id": new mongoose.Types.ObjectId(id) }, { "isActive": true } ] })
                    .skip(Number(offset))
                    .limit(Number(limit))

            )
        })

        let response = Promise.all([ p0, p1 ]).then(res => {            
            return { response: res[1], info: res[0] }
        })

        return response
    },
    findByLabelIdFamilia: (req) => {

        
        const { id } = req.params
        const { limit, offset } = req.query

        // numero de documentos
        let p0 = new Promise((resolve, reject) => {
            resolve(
                Familia.aggregate()
                    .match({ '$and': [{ "label.label_id": new mongoose.Types.ObjectId(id)}, { "isActive": true } ]})
                    .count('total')
            )
        }) 
        
        // documentos por id de familia
        let p1 = new Promise((resolve, reject) => {
            resolve(
                Familia.aggregate()
                    .match({ '$and': [ { "label.label_id": new mongoose.Types.ObjectId(id) }, { "isActive": true } ] })
                    .skip(Number(offset))
                    .limit(Number(limit))

            )
        })

        let response = Promise.all([ p0, p1 ]).then(res => {            
            return { response: res[1], info: res[0] }
        })

        return response

    },
    // TODO CAMBIR NOMBRE DE LAS FUNCIONES
    // esta debe ser update by _id
    updateOneModel: async({ body, params }) => {
        
        const res = await Catalogo.updateOne({ 'model': params.id }, body )
        return res

    },
    // este debe de ser updata One Famili by model
    updateOneByModel: async({ model, ...restOfdata}) => {
        const res = await Familia.updateOne({ 'model': model }, restOfdata )
        if(res && res.nModified) return res
    },
    updateOneCatalogoByModel: async({ model, ...restOfdata}) => {
        
        const res = await Catalogo.updateOne({ 'model': model }, restOfdata )
        if(res && res.nModified) return res
    },
    createFamiliaItem: async(payload) => new Familia(payload).save(),

    getAllProductsBylabelId:  async(id) => {

        const consulta = new Promise(( resolve ) => {
            resolve(
                Catalogo.aggregate()
                .match({ "label.label_id": new mongoose.Types.ObjectId(id) })
            )
        })
        .then(res => res)

        return consulta

    },
    getListFamiliaByBrandId: async(id) => {
        // extraer la informacion y solo regresa los nombres de la familias sin repetirse
        // ENDPOINT PARA FILTAR DE BRANDS => LABELS => PRODUCTOS

        const query = new Promise((resolve) => {
            resolve(
                Catalogo.aggregate()
                .match({ "brand.brand_id": new mongoose.Types.ObjectId(id) })
                
            )
        })
        
        return Promise.all([ query ]).then((res) => {

            // extraemos las inciciales 
            const inidice = res[0]
            .map(({ familia }) => familia.charAt(0))
            .reduce((array, item) => array.includes(item) ? array : [...array, item ], [])
            .sort()

            // extraemos la familia, label y foto colo en valores unicos
            console.log({ inidice })

            const valoresUnicos = []
            const imgData = []

            const brandsValues = () =>  res[0].forEach(({ familia, urlfoto, label }) => {
                let etiqueta = label[0].label_id

                if(!valoresUnicos.includes(familia)){
                    valoresUnicos.push(familia)
                    imgData.push({ familia, img: urlfoto[0], label: etiqueta })
                }
            })

            brandsValues()          

            // acomodamos en orden alfabetico
            function helperAcomodador(letter, dataPayload){
                let prodStartsWhth = []
              
                dataPayload.forEach(({familia, img, label }) => {
                  if(familia.startsWith(letter)){
                    prodStartsWhth.push({ familia, img, label })
                  }      
                })
              
              return prodStartsWhth
              }

            //   acomodamos todos!!!!!
             const payload = inidice.map(letter => {
                  return { payload: helperAcomodador(letter, imgData), indice: letter }
              })

              return payload

            
        })
        
    }

}
