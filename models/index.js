const { Inventario } =require('./Inventario')
const { Catalogo }  =require('./Catalogo')
const { Label }  =require('./Label')
const { Brand }  = require('./Brand')
const { User } = require('./User')
const { Familia } = require('./Familia')
const { InvoiceStorage } = require('./InvoiceStorage')
const { Mackbetty } = require('./MacBetty')
const { EmpleadosRH } = require('./EmpleadosRH')
const { RegistrosRH } = require('./RegistrosRH')
const { DeptosRH } = require('./DeptosRH')
const { Counter } = require('./Counter')
const { Traslado } = require('./Traslado')
const { Flete } = require('./Flete')
const { Flotilla } = require('./Flotilla')


module.exports = {
    Inventario,
    Brand,
    Catalogo,
    Label,
    User,
    Familia,
    InvoiceStorage,
    Mackbetty,
    EmpleadosRH,
    RegistrosRH,
    DeptosRH,
    Counter,
    Traslado,
    Flete,
    Flotilla
}