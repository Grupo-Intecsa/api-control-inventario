const { TwilioService } = require('../services')

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
    }
}

