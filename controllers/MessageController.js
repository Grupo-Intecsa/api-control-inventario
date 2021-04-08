const { TwilioService } = require('../services')
const fetch = require('node-fetch')

module.exports = {
    whatspapp: async(req, res ) => {

        const { message, name, phone } = req.body
        const messageBody = `El cliente: ${name}, requiere más infomarción de la empresa, su número teléfonico es: ${phone}, y el mensaje que dejo en la página: ${message}`

        try {

            const twilioMessage = await TwilioService.whatspapp(messageBody)
            
            if(twilioMessage){
                res.status(200).json(twilioMessage)
            }
            
        } catch (error) {
            res.status(404).json({ message: error })
        }

    },
    email: async(req, res) => {
        // TODO MANDAR CORRREO PERSONALIZADO UNA VEZ QUE EL CLIENTE MANDE EL MENSAJE

        const { message, name, phone } = req.body
        const messageBody = `El cliente: ${name}, requiere más infomarción de la empresa, su número teléfonico es: ${phone}, y el mensaje que dejo en la página: ${message}`
        
        try {
        
            const twilioMail = await TwilioService.email(messageBody)
            
            if(twilioMail) res.status(200).json({ message: 'Email sent' })

        } catch (error) {
            res.status(400).json({ error })  
        }
    },
    createItemOnBoard: async(req, res) => {
        
        const payload = req.body

        try {

            const query = await TwilioService.createItemOnBoard(payload)

            console.log(query)
            
            return res.status(200).json({ message: query })
            
        } catch (error) {
            res.status(400).json({ error })
        }
        
    },
    getBoard: async(req, res) => {
        
        const query = 'query { boards(ids: 202977424 ) { items(limit: 10) { column_values { id value } } } }'

        const response = fetch("https://api.monday.com/v2", {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.MONDAYAPIAUTH
            },
            body: JSON.stringify({
                'query': query
            })
            
        })
        .then(res => res.json())
        .then(res => res)

        const p1 = await Promise.resolve(response).then(res => res.data.boards)
        
        return res.status(200).json({ message: p1 })

    }
}

