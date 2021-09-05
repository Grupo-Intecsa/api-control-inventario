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
  },
  postSalidaCheck: async (body) => {
    return RegistrosRH(body).save()
  },
  getActiveRegistros: async () => {
    return await RegistrosRH.find({ isActive: true })
  },
  patchRemoveRegistro: async (body, id) => {
    return await RegistrosRH.findByIdAndUpdate(id, body)
  }
}