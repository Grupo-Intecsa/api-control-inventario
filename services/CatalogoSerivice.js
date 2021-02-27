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
                    Catalogo.aggregate().match(
                        {
                            'isActive': true
                        },
                    ).sort(
                        {
                            'createdAt': 1
                        }
                    ).limit(6)
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
    getAllBrands: () => Brand.find({ isActive: true }),

    // Label
    createLabel: (props) => new Label(props).save(),
    getAllLabels: () => Label.find({ isActive: true }),
}