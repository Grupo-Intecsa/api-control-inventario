const mongoose = require('mongoose');
const { Traslado, Flete, Flotilla, Rentas, Planes } = require('../models');

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
      case 'renta':
        const rentas = await Rentas.find({});
        return rentas
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
        }, {
          '$lookup': {
            'from': 'rentas',
            'localField': '_id',
            'foreignField': 'bussiness_cost',
            'as': 'rentas'
          }
        }
      ]
    ]

    const documents = await Bussiness.aggregate(agg);    
    return documents

  },
  getVehicles: () => {
      const vehicles = Flotilla.find({});
      return vehicles
  }, 
  createPlan: async (body) => {
    const plan = new Planes(body);
    await plan.save();
    return plan
  },
  getPlanByObjectId: async (id) => {
    const plan = await Planes.find({ flotilla: id });
    return plan
  }, 
  getPlanesBySlug: async (slug) => {    
    try {
      const vehicle = await Flotilla.find({ placas: slug });
      const planes = await Planes.find({ flotilla: vehicle[0]._id });
      return planes
    } catch (error) {
      throw new Error("No se encontró el vehículo")
    }    
  },
  getDocument: async (id, type) => {
    switch (type) {
      case 'flete':
        const flotilla = await Flete.findById(id);
        return flotilla;
      case 'traslado':
        const traslado = await Traslado.findById(id);
        return traslado;
      case 'renta':
        const renta = await Rentas.findById(id);
        return renta;

    }
  },
}