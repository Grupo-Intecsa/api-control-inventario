const mongoose = require('mongoose');
const { Traslado, Flete, Flotilla, Rentas } = require('../models');

const Bussiness = mongoose.model('bussiness', new mongoose.Schema({
  name: {
    type: String,
  },
  slug: {
    type: String,
  }
})
);

module.exports = {
  create: async (type, body) => {
    switch (type) {
      case 'traslado': 
        const traslado = new Traslado(body);
        await traslado.save();
        return traslado;
      case 'flete':
        const flete = new Flete(body);
        await flete.save();
        return flete
      case 'renta': 
        const renta = new Rentas(body);
        await renta.save();
        return renta
    }
  },
  get: async (type) => {
    switch (type) {
      case 'traslado': 
        const traslados = await Traslado.find({});
        return traslados;
      case 'flete':
        const flotillas = await Flete.find({});
        return flotillas
    }
  }, 
  createVehiculo: async (body) => {
    const flotilla = new Flotilla(body);
    await flotilla.save();
    return flotilla
  },
  getEmpresas: async () => {
    const empresas = await Bussiness.find({});    
    return empresas
  },
  createEmpresa: async (body) => {
    const empresa = new Bussiness({
      name: "test",
      slug: "test"
    });
    await empresa.save();
    return empresa
  }, 
  getDocumentsByIdBussiness: async (idBussiness) => {
    const agg = [
      [
        {
          '$match': {
            '_id': mongoose.Types.ObjectId(idBussiness)
          }
        }, {
          '$lookup': {
            'from': 'fletes', 
            'localField': '_id', 
            'foreignField': 'bussiness_cost', 
            'as': 'fletes'
          }
        }, {
          '$lookup': {
            'from': 'traslados', 
            'localField': '_id', 
            'foreignField': 'bussiness_cost', 
            'as': 'traslado'
          }
        }
      ]
    ]

    const documents = await Bussiness.aggregate(agg);    
    return documents

  }
}