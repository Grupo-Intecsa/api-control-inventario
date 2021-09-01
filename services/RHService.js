const { EmpleadosRH, RegistrosRH, DeptosRH } = require('../models/')

module.exports = {
  createEmpealdo: async (body) => {
    return EmpleadosRH(body).save()
  },
  createDepto: async (body) => {
    return DeptosRH(body).save()
  },
  getDeptos: async () => {
    return await DeptosRH.find()
  },
  getEmployees: async () => {
    return await EmpleadosRH.find()
  }
}