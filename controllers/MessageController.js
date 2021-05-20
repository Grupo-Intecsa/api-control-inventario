const { TwilioService, PDFServices  } = require('../services')
const puppeteer = require("puppeteer")
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

    },
    saveInvoice: async(req, res) => {

        try {
            
            const invoice = await PDFServices.saveInvoice(req.body)
            if(invoice) return res.status(200).json({ message: invoice })

        } catch (error) {
            res.status(500).json({ message: error })
        }


    },
    createInvoice: async(req, res) => {

        const browser = await puppeteer.launch({ headless: true })
        const page = await browser.newPage()

        try {
            
            const pdfString = PDFServices.createInvoice(req.body, req.query)
            await page.setContent(pdfString)

            const pdf = await page.pdf({
                format: "letter",
                printBackground: true,
                scale: 0.9,
                margin: {
                    left: "0px",
                    top: "0px",
                    right: "0px",
                    bottom: "0px"
                }
            })

            await browser.close()
            res.contentType("application/pdf")

            return res.send(pdf)

        } catch (error) {
            
        }
    },
    getInvoiceId: async(req, res) => {

        const { folio } = req.params

        try {   

            const pdfData = await PDFServices.getInvoiceId(folio)
            
            if(pdfData) return res.status(200).json({ message: pdfData })

            
        } catch (error) {
            res.status(400).json({ message: error })
        }
    }
}
