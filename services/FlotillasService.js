const mongoose = require('mongoose');
const { Traslado, Flete, Flotilla, Rentas, Planes } = require('../models');
const { viewDocumentsCanceled, viewDocumentsNormal } = require('../util/aggregatios');

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
  getDocumentsByIdBussiness: async ({ idBussines, query }) => {
    
    const aggCanceled = viewDocumentsCanceled(mongoose.Types.ObjectId(idBussines))
    const aggNormal = viewDocumentsNormal(mongoose.Types.ObjectId(idBussines))

    if (query === 'cancel') {
      const documents = await Bussiness.aggregate(aggCanceled);        
      return documents
    }

    return await Bussiness.aggregate(aggNormal);

  },
  getVehicles: () => {
      const vehicles = Flotilla.find({}).sort({ createdAt: -1 });
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
      const planes = await Planes.find({ flotilla: vehicle[0]._id, isActive: true });
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
  getPlanesByPlacas: (placas) => {
    const agg = [
      {
        '$match': {
          'placas': placas
        }
      }, {
        '$lookup': {
          'from': 'planes', 
          'localField': '_id', 
          'foreignField': 'flotilla', 
          'as': 'planes'
        }
      }, {
        '$unwind': {
          'path': '$planes'
        }
      }
    ]
    const planes = Flotilla.aggregate(agg)
    return planes
  }, 
  update: async (_id, body, type) => {    
    switch (type) {
      case 'flete':
        const flotilla = await Flete.findByIdAndUpdate(_id, { ...body });
        return flotilla;
      case 'traslado':
        const traslado = await Traslado.findByIdAndUpdate(_id, { ...body });
        return traslado;
      case 'renta':
        const renta = await Rentas.findByIdAndUpdate(_id, { ...body });
        return renta;

    }
  },
  getById: async (id, type) => {
    switch (type) {
      case 'flete':
        const flotilla = await Flete.findById({ _id: id });
        return flotilla;
      case 'traslado':
        const traslado = await Traslado.findById({ _id: id });
        return traslado;
      case 'renta':
        const renta = await Rentas.findById({ _id: id });
        return renta;

    }
  }, 
  updateVehiculo: async (body) => {        
    const flotilla = await Flotilla.findByIdAndUpdate(body._id, { ...body });        
    return flotilla
  }, 
  updatePlanById: async (_id, body) => {
    const plan = await Planes.findByIdAndUpdate(_id, { ...body });
    return plan
  }
}