const { Inventarios } = require('../models/Inventario')

module.exports = {
    create: (payload) => new Inventarios(payload).save(),
    getAllProductos: () => Inventarios.find(),
    insertMany: (payload) => {
        const response = Inventarios.insertMany( payload , function(err, docs){
            if(err) throw new Error(JSON.stringify(err))

            return docs
        })
        return response
    },
    findByQueryText: (text) => {
        // TODO: con esto podemos mejorar la busqueda de palabras claves dentro de mongoDB
            // console.log(text.split(" "))

        const queryText = Inventarios.aggregate().match(
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
    findByEan: (ean) => Inventarios.find({ ean }),
    findByAlterno: (alterno) => Inventarios.find({ alterno }),
    findByIdAndUpdate: (_id, payload) => {
        const res = Inventarios.findByIdAndUpdate(_id, payload, function(err, doc){
            if(err) throw new Error('No existe el documento')
            doc.save()
        })
        return res 
    }

}
