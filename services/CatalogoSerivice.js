const { compareSync } = require('bcrypt')
const { Catalogo, Label, Brand, Familia } = require('../models/')
var _ = require('lodash')

function customizer(objValue, srcValue) {
      if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
      }
    }

module.exports =  {
    
    findByQueryText: async(text) => {

        // buscamos primero por text index
        
        const p1 = new Promise(( resolve, _ ) => {
            resolve(
                Catalogo.aggregate().match(
                    {
                        '$text': {
                            '$search': text
                        }
                    }
                ).sort({
                        "model": { "$meta": "textScore" }
                    }
                    ).match({ "isActive": true })
            )
        })

        // buscamos por regex

        const p2 = new Promise((resolve, _ ) => {
            resolve(
                Catalogo.aggregate().match(
                    {
                        "title": { "$regex": new RegExp(`${text}`, 'i') }
                    }
                ).match({ "isActive": true })
            )
        }) 

        // unimos las dos busquedas en un solo object

        return Promise.all([ p1, p2 ]).then( res => {

            let resultArra = Object.assign(res[0], res[1])
            return resultArra
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
    sample: async() => {

        const p1 = new Promise((resolve, _) => {
                resolve(
                    Catalogo.aggregate()
                        .match({ 'isActive': true })
                        .sort({ 'createdAt': -1 })
                        .limit(6)
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
                {...response, prod: res[0], count: Number(res[1]) + Number(res[2]) }
            )
        })

    },
    getByModel: (id) => Catalogo.find({ model: id }),

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
    findBrandAndGetDataById: (id) => {
        let p1 = new Promise((resolve, reject) => {
            resolve(
                Catalogo.find({ '$and': [ { "brand.brand_id": id }, { "isActive": true } ] }),
            )
        })

        let p2 = new Promise((resolve, reject) => {
            resolve(
                Familia.find({ '$and': [ { "brand.brand_id": id }, { "isActive": true } ] }),
            )
        })

        let response = Promise.all([ p1, p2 ]).then(res => {
            return Object.assign(res[0], res[1])
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
    findLabelsAndGetDataById: async(id) => Catalogo.find({ '$and': [ { "label.label_id": id }, { "isActive": true } ] }),
}
