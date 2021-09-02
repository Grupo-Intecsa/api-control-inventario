const { RHService } = require('../services')

module.exports = {
  createEmpealdo: async (req, res) => {
      const { body } = req

      try {
        const mutate = await RHService.createEmpealdo(body)
        if (!mutate) throw new Error('fatal error')

        return res.status(200).json({ message: mutate })
      } catch (error) {
        return res.status(400).json({ error })
      }
  },
  findUser: async (req, res) => {

  },
  createDepto: async (req, res) => {

    const { body } = req

    try {
      const mutate = await RHService.createDepto(body)
      if(!mutate) throw new Error('fatal error')

      return res.status(200).json({ message: mutate })
    } catch (error) {
      return res.status(400).json({ error })
    }

  },
  getDeptos: async (req, res) => {
    try {
      const query = await RHService.getDeptos()
      if (query.length === 0) throw new Error('No hay elementos que mostrar')
      return res.status(200).json({ message: query })

    } catch (error) {
      return res.status(400).json({ message: error })
    }
  },
  getEmployees: async (req, res) => {
    try {
      const query = await RHService.getEmployees()
      if (query.length === 0) throw new Error('No hay elementos que mostrar')
      return res.status(200).json({ message: query })

    } catch (error) {
      return res.status(400).json({ message: error })
    }
  },
  postSalidaCheck: async(req, res) => {

    const { body } = req

    try {
      const mutation = await RHService.postSalidaCheck(body)
      if (mutation.length === 0) throw new Error('No hay elementos que mostrar')

      return res.status(200).json({ message: mutation })
    } catch (error) {
      return res.status(400).json({ message: error })
    }
  },
  getActiveRegistros: async(req, res) => {

    try {
      const query = await RHService.getActiveRegistros()
      if (query.length === 0) throw new Error('No hay elementos que mostrar')

      return res.status(200).json({ message: query })

    } catch (error) {
      return res.status(400).json({ message: error })
    }
    
  }
}