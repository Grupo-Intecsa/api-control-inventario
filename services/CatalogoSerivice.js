const { Catalogo, Label, Brand  } = require('../models/')

module.exports =  {

    create: (props) => new Catalogo(props).save(),
    getAllProducts: () => Catalogo.find({ isActive: true }),

    // Brands
    createBrand: (props) => new Brand(props).save(),

    // Label
    createLabel: (props) => new Label(props).save(),
    getAllLabels: () => Label.find({ isActive: true }),
}