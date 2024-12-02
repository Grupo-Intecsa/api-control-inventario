const { Paqueteria } = require('../models/Paqueteria');

module.exports = {
  paqueteria: async (response) => {
    const doc = await Paqueteria.create(response);
    return doc;
  },
}
