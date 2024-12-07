const { Paqueteria } = require("../models/Paqueteria");

module.exports = {
  paqueteria: async (response) => {
    const doc = await Paqueteria.create(response);
    return doc;
  },
  getPaqueteria: async () => {
    const doc = await Paqueteria.find({ is_active: true }).sort({
      createdAt: -1,
    });
    return doc;
  },
  updatePaqueteria: async (response) => {
    const doc = await Paqueteria.findByIdAndUpdate(response._id, response);
    return doc;
  },
  getById: async (id) => {
    const doc = await Paqueteria.findById(id);
    return doc;
  },
  notifyPaqueteria: async (response) => {
    const filter = { _id: response.id };
    const update = {
      shipping_status: "Enviado",
      shipping_code: response.shipping_code,
    };
    const doc = await Paqueteria.findOne(filter).updateOne(update);
    return doc;
  },
};
