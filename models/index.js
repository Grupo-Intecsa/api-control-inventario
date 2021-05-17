const { Inventario } =require('./Inventario')
const { Catalogo }  =require('./Catalogo')
const { Label }  =require('./Label')
const { Brand }  = require('./Brand')
const { User } = require('./User')
const { Familia } = require('./Familia')
const { InvoiceStorage } = require('./InvoiceStorage')


module.exports = {
    Inventario,
    Brand,
    Catalogo,
    Label,
    User,
    Familia,
    InvoiceStorage
}