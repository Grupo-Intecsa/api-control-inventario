
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'AC289615e4e55868cbacd7febe5a37aa63'
const authToken = process.env.TWILIO_AUTH_TOKEN || '7aaba5713668e9fe0af920489acbaa2f'

const twilio = require('twilio')
const client = new twilio(accountSid, authToken)


module.exports = {
    send: async( payload ) => {

        const { message, name, phone, email } = payload
        const messageBody = `El cliente: ${name}, requiere más infomarción de la empresa, su número teléfonico es: ${phone}, correo: ${email}, y el mensaje que dejo en la página: ${message}`

        const twilioMessage = await client.messages 
        .create({ 
            body: messageBody, 
            from: 'whatsapp:+14155238886',       
            to: 'whatsapp:+5215524097656'
        }) 
        .then(message => message.sid )
        
        console.log(message)

        if(twilioMessage){
            return twilioMessage
        }
    }
}

