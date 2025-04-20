const { VehicleExit } = require('../models/ControlVH');

module.exports = {
  createVehicleExit: async (req, res) => {
    try {
      const vehicleExit = new VehicleExit(req.body);
      await vehicleExit.save();
      res.status(201).json(vehicleExit);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getLastRegisters: async (req, res) => {
    try {
      const lastRegisters = await VehicleExit.find().sort({ createdAt: -1 }).limit(10);
      res.status(200).json(lastRegisters);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllRegisters: async (req, res) => {
    try {
      const allRegisters = await VehicleExit.find();
      res.status(200).json(allRegisters);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
