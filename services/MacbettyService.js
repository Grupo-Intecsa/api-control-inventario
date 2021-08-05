const { Mackbetty } = require('../models')

module.exports = {
  createCodigoCien: async (body) => {

    const countQuery = new Promise((resolve) => {
      resolve(
          Mackbetty.countDocuments()
          )
    }).then(res => res)

    const docSave = await Promise.all([countQuery])
    .then(res => {
      const CODIGO = res[0] + 13637
      const payload = {
        ...body,
        CODIGO
      }

      return new Mackbetty(payload).save()
        
    }).then(res => res)

    return docSave
    
  },
  findByAutor: () => {

  },
  findByTextDescription: () => {

  }

}