const { Familia } = require('../models/Familia')
const mongoose = require('mongoose')

module.exports = {
    create: (payload) => new Familia(payload).save(),
    getAllProductos: () => Familia.find(),
    insertMany: (payload) => {
        const response = Familia.insertMany( payload , function(err, docs){
            if(err) throw new Error(JSON.stringify(err))
            console.log(err)
            return docs
        })
        return response
    },
    findByQueryText: (text) => {
        // TODO: con esto podemos mejorar la busqueda de palabras claves dentro de mongoDB
            // console.log(text.split(" "))

        const queryText = Familia.aggregate().match(
            {
                '$text': {
                    '$search': text
                }
            }
        ).sort({
                "nombre": { "$meta": "textScore" }
            })
        return queryText
    },
    getFamiliaByTitleId: ({ id, limit, offset }) => {

        const query = new Promise((resolve, reject) => {

            resolve(
                Familia.aggregate()
                .match({ $and: [ { 'parent.catalogo_id': mongoose.Types.ObjectId(id)  }, { "isActive": true }]})
                .skip(Number(offset))
                .limit(Number(limit))
            )
        })

        const count = new Promise((resolve, reject) => {
            resolve(
                Familia.aggregate()
                .match({ $and: [ { 'parent.catalogo_id': mongoose.Types.ObjectId(id)  }, { "isActive": true }]})
                .count("total")
            )
        })

        const response = Promise.all([ query, count ]).then(res => {

            const count = res[1].reduce((acc, val) => acc + val)

            return { response: res[0], info: count }
        })

        return response

    },
    
    findByEan: (ean) => Familia.find({ ean }),
    findByAlterno: (alterno) => Familia.find({ alterno }),
    findByIdAndUpdate: (_id, payload) => {
        const res = Familia.findByIdAndUpdate(_id, payload, function(err, doc){
            if(err) throw new Error('No existe el documento')
            doc.save()
        })
        return res 
    }, 
    findById: (_id) => Familia.findById(_id).exec()

}
