const { celebrate, Joi, Segments } = require('celebrate')


module.exports = {

    create: celebrate({
        [Segments.BODY]: Joi.object().keys({
            ean: Joi.string().required(),
            alterno: Joi.string().required(),
            nombre: Joi.string().required(),
            inventario: Joi.string().optional(),
            ubicacion: Joi.number().optional(),
            almacen: Joi.number().optional(),
            img: Joi.string().optional()
        })
    }),


}