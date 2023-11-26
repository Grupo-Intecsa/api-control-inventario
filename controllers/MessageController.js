const { TwilioService, PDFServices, MacbettyService, AllFoliosService  } = require('../services')
const puppeteer = require("puppeteer")
const { JSDOM } = require("jsdom")
const fetch = require('node-fetch')

module.exports = {
    whatspapp: async(req, res ) => {

        const { message, name, phone } = req.body
        const messageBody = `El cliente: ${name}, requiere más infomarción de la empresa, su número teléfonico es: ${phone}, y el mensaje que dejo en la página: ${message}`

        try {

            const twilioMessage = await TwilioService.whatspapp(messageBody)
            
            if(twilioMessage){
                return res.status(200).json(twilioMessage)
            }
            
        } catch (error) {
            return res.status(404).json({ message: error })
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
            return res.status(400).json({ error })  
        }
    },
    createItemOnBoard: async(req, res) => {
        
        const payload = req.body

        try {

            const query = await TwilioService.createItemOnBoard(payload)           
            return res.status(200).json({ message: query })
            
        } catch (error) {
            return res.status(400).json({ error })
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

        assert.equal

        const p1 = await Promise.resolve(response).then(res => res.data.boards)
        
        return res.status(200).json({ message: p1 })

    },
    saveInvoice: async(req, res) => {
        try {
            
            const invoice = await PDFServices.saveInvoice(req.body.data)
            if(invoice) return res.status(200).json({ message: invoice })

            return res.status(200).json({ message: invoice })

        } catch (error) {
            console.log(error)
           return res.status(500).json({ message: error })
        }


    },
    createInvoice: async(req, res) => {

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
            headless: true
            
        });
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
            return res.status(500).json({ message: error })
        }
    },
    getInvoiceId: async(req, res) => {
        const { folio } = req.params
        try {   
            const pdfData = await PDFServices.getInvoiceId(folio)
            if(pdfData) return res.status(200).json({ message: pdfData })

            return res.status(200).json({ message: pdfData })        
        } catch (error) {
            return res.status(400).json({ message: error })
        }
    },
    createCodigoCien: async(req, res) => {
        const { body } = req

        try {
            const query = await MacbettyService.createCodigoCien(body)
            if(!query) throw new Error("error en el servidor")
            
            return res.status(200).json({ message: query })
            
        } catch (error) {

            return res.status(400).json({ error: JSON.stringify(error)})
        }

    },
    findByAutor: () => {

    },
    findByTextDescription: async (req, res) => {

    const { text } = req.query

    try {
        const response = await MacbettyService.findByTextDescription(text)

        if(response)
        return res.status(200).json({ message: response })

    } catch (error) {
        return res.status(400).json({ message: error })
    }

    },
    ultimos: async(req, res) => {

        try {
            const payload = await MacbettyService.ultimos(req.query)
            if(!payload) throw new Error("Error en el servidor")

            return res.status(200).json({ message: payload })

        } catch (error) {
            return res.status(404).json({ error })
        }   


    },
    getDolarCurrency: async (req, res) => {

        const URL = 'https://www.eldolar.info/en/mexico/dia/hoy'
        
        try {   
            
            const browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
                headless: true
            })
            const page = await browser.newPage()
            
            await page.goto(URL, {
                waitUntil: 'networkidle0'
            })
            
            const data = await page
            .evaluateHandle(() => {
                const currey = document
                .querySelectorAll("span.xTimes")

                return currey
            })

            const result = await page.evaluate(els => els[1].innerHTML, data)
            return res.status(200).json({ dolarhoy: result })

        } catch(error) {
            console.log(error)
            return res.status(400).json({ error: error })
        }
    },
    postCounterAgent: async ({ body }, res) => {
        
        try {
            const saveCounter = await TwilioService.postCounterAgent(body)
            if (!saveCounter) throw new Error({ 
                error: 'No se pudieron guardar los datos'
            })

            return res.status(200).json({ message: 'Datos guardados con exito'})
        } catch (error) {
            return res.status(400).json({ error })
        }
    }, uploadFile: async (req, res) => {
        console.log(req.file, req.body)
        const { path } = req.file
        const { flotilla } = req.body
        console.log({ flotilla })

        try {
            const upload = await MacbettyService.uploadFile(flotilla, path)
            if(!upload) throw new Error({ error: 'No se pudo subir el archivo' })

            return res.status(200).json({ message: 'Archivo subido con exito' })
        } catch (error) {
            console.log(error)
            return res.status(400).json('Error al subir el archivo')
        }
    },
    getFolios: async (req, res) => {
        const { empresa } = req.params
        console.log("🚀 ~ file: MessageController.js:249 ~ getFolios: ~ empresa:", empresa)

        try {
            const getAllFolio = await AllFoliosService.getAllFolios(empresa)            
            if(!getAllFolio) throw new Error({ error: 'No se pudieron obtener los folios' })
            
            return res.status(200).json({ message: getAllFolio })
        } catch (error) {
            return res.status(400).json({ error })
        }

    }
}
