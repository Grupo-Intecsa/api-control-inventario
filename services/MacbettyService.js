const { Mackbetty } = require('../models')
const { Flotilla } = require('../models')

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
  findByTextDescription: (text) => {
    
    const arrayUnico = ( payload ) => {
      const cheValues = []
      const valoresUnicos = []
      
      payload.forEach(item => {
          if(!cheValues.includes(item.CODIGO)){
              cheValues.push(item.CODIGO)
              valoresUnicos.push(item)
          }
      })
      
      return valoresUnicos 
  }

  let regText = text.split(" ").map(item => new RegExp(`${item}.*`, 'i'))        
        // la consulta a title
  const dataTitle = new Promise((resolve) => {
      resolve(
          Mackbetty.aggregate()
          .match({ "AUTOR": { "$all": regText }})
          )
      })
      
  const dataDesc = new Promise((resolve) => {
      resolve(
          Mackbetty.aggregate()
          .match({ "DESCRIPCION": { "$all": regText }})
          )
      })

      const query = Promise.all([dataTitle, dataDesc])   
      .then(res => {

          const bruto = res[0].concat(res[1])
          const flat = bruto.reduce((arr, current ) =>  arr.concat(current), [])

          return arrayUnico(flat)
      })
      .then(res => res)

      return query
  },
  ultimos: async({ skip }) => {

      const numberSlice = await new Promise((resolve) => {
        resolve(
          Mackbetty.countDocuments()
        )
      }).then(res => res )

      
      const payload = Promise.all([numberSlice])
        .then(count => {
            const slice = +count[0].toString()
            
            return Mackbetty.aggregate()
              .skip(slice - skip)
              .match({
                'DESCRIPCION': {
                  '$ne': null
                }
              })
              .sort({ createdAt: -1})
              .project({ UNIDAD: 1, DESCRIPCION: 1, AUTOR: 1, _id: 0, CODIGO: 1, UMED: 1, ALTERNO: 1 })
        })
        .then(res => res)

        return payload
  }, uploadFile: async (id, data) => {
     const response = await Flotilla.findOneAndUpdate({ _id: id }, { picture: data })
     console.log(response)
     if (!response) throw new Error('Error en el servidor')
     return response
  }

}