const { Familia } = require('../models/Familia')

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
