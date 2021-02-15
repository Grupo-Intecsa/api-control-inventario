require('dotenv').config()
const accountSid = process.env.TWILIO_ACCOUNT_SID 
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilio = require('twilio')
const client = new twilio(accountSid, authToken)


module.exports = {
    send: async( payload ) => {

        const twilioMessage = await client.messages 
        .create({ 
            body: payload, 
            from: 'whatsapp:+14155238886',       
            to: 'whatsapp:+5215524097656'
        }) 
        .then(message => message.sid )

        if(twilioMessage){
            return twilioMessage
        }
    }
}

