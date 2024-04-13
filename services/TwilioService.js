require('dotenv').config()
const fetch = require('node-fetch');
const { Counter } = require("../models")

// de twilio whatsapp

const accountSid = process.env.TWILIO_ACCOUNT_SID 
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilio = require('twilio')
const client = new twilio(accountSid, authToken)

// de gridEmail

const sgMail = require('@sendgrid/mail')
const gridToken = process.env.SENDGRID_API_KEY

module.exports = {
    whatspapp: async( payload ) => {

        const twilioMessage = await client.messages 
        .create({ 
            body: payload, 
            from: 'whatsapp:+121212121212',       
            to: 'whatsapp:+5215524097656'
        }) 
        .then(message => message.sid )

        if(twilioMessage){
            return twilioMessage
        }
    },
    email: async( payload ) => {
        // TODO: cambiar el correo de contacto y se puede programar un correo que una vez que el cliente manda mensaje, se le envie una respuesta de esta accion


    sgMail.setApiKey(gridToken)
        const msg = {
          to: 'cchavez@grupointecsa.com', // Change to your recipient
          from: 'cchavez@grupointecsa.com', // Change to your verified sender
        subject: 'mensaje de grupointecsa.com',
        text: payload
        // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    const send = await sgMail
        .send(msg)
        .then(() => true)
        .catch(() => {
            throw new Error('Email error send')
        })

        return send 
        
    },
    createItemOnBoard: async(payload) => {

        const { email, name, phone, subject, coment, urlValid  } = payload
        
        // TODO pasarle datos de nombre, label, email, telefono, comentario

        let query4 = 'mutation ($myItemName: String!, $columnVals: JSON!) { create_item (board_id:202977424, item_name:$myItemName, column_values: $columnVals ) { id } }';
        let vars = {
            "myItemName" : name,
            "columnVals": JSON.stringify({
                "status": { "label": subject },  
                "text3": email,
                "text": phone,
                "comentario": `mensaje: ${coment} archivo adjunto: ${urlValid}`                
            })        
                    
        };  

        // const uploadQuery = 'mutation { add_file_to_column (item_id: 1191458915, column_id: "file", $file: File!) { id } }'

        const response = new Promise((resolve, reject) => {
            resolve(
            fetch("https://api.monday.com/v2", {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : process.env.MONDAYAPIAUTH
            },
            body: JSON.stringify({
                'query' : query4,
                'variables': JSON.stringify(vars)
            })
            })
            .then(res => res.json())
            .then(res => res)
            )
        })            
            const p1 = Promise.all([response]).then(res => res[0])
            
            return p1

    },
    postCounterAgent: async ({ contador, agent }) => new Counter({ contador, agent }).save(),

}

