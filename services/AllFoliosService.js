const { Flete, Traslado, Rentas } = require('../models')


module.exports = {
    getAllFolios: async (empresa) => {      
        try {
            const fletes = await Flete.find({ bussiness_cost: empresa }).countDocuments()
            const traslados = await Traslado.find({ bussiness_cost: empresa }).countDocuments()
            const rentas = await Rentas.find({ bussiness_cost: empresa }).countDocuments()
            return { fletes, traslados, rentas }

        } catch(error){
            return { message: error }
        }
    }
}