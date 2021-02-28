const { Catalogo, Label, Brand  } = require('../models/')

module.exports =  {

    create: (props) => new Catalogo(props).save(),

    insertMany: (payload) => {
        const response = Catalogo.insertMany( payload , function(err, docs){
            if(err) throw new Error(JSON.stringify(err))
            
            return docs
        })
        return response
    },
    getAllProducts: () => Catalogo.find({ isActive: true }),
    sample: () => {

        const p1 = new Promise((resolve, reject) => {
                resolve(
                    Catalogo.aggregate()
                        .match({ 'isActive': true })
                        .sort({ 'createdAt': 1 })
                        .limit(6)
                )
        })

        const p2 = new Promise((resolve, reject) => {
            resolve(Catalogo.countDocuments({ "isActive": true }, function( err, count) {
                return count
            }))
        })
        
        
        return Promise.all([ p1, p2 ]).then(res => {
            let response = {}
            return(
                {...response, prod: res[0], count: res[1] }
            )
        })

    },

    // Brands
    createBrand: (props) => new Brand(props).save(),
    getAllBrands: async() => {

        const p1 = await Brand.aggregate()
                    .lookup({
                        'from': 'catalogos', 
                        'localField': '_id', 
                        'foreignField': 'brand.brand_id', 
                        'as': 'catalogos' 
                    })
            
        return p1

    },
    findBrandAndGetDataById: (id) => Catalogo.find({ "brand.brand_id": id }),

    // Label
    createLabel: (props) => new Label(props).save(),
    getAllLabels: async() => {

        
        const p1 = await Label.aggregate()
        .lookup({
            'from': 'catalogos', 
            'localField': '_id', 
            'foreignField': 'label.label_id', 
            'as': 'labels' 
        })

        return p1

    },
    findLabelsAndGetDataById: async(id) => Catalogo.find({ "label.label_id": id }),
}
