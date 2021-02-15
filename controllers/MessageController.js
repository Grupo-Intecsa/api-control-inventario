const { TwilioService } = require('../services')

module.exports = {
    create: async(req, res ) => {

        const { message, name, phone, email } = req.body
        const messageBody = `El cliente: ${name}, requiere más infomarción de la empresa, su número teléfonico es: ${phone}, correo: ${email}, y el mensaje que dejo en la página: ${message}`

        try {

            const twilioMessage = await TwilioService.send(messageBody)
            console.log(twilioMessage, 'res')
            if(twilioMessage){
                res.status(200).json(twilioMessage)
            }
            
        } catch (error) {
            res.status(404).json({ message: error })
        }

    }
}

