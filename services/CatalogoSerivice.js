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

    // Brands
    createBrand: (props) => new Brand(props).save(),
    getAllBrands: () => Brand.find({ isActive: true }),

    // Label
    createLabel: (props) => new Label(props).save(),
    getAllLabels: () => Label.find({ isActive: true }),
}