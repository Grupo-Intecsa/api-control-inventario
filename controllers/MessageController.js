
const { TwilioService } = require('../services')

module.exports = {
    create: async(req, res ) => {

        try {

            const twilioMessage = await TwilioService.send(req.body)
            console.log(twilioMessage, 'res')
            if(twilioMessage){
                res.status(200).json(twilioMessage)
            }
            
        } catch (error) {
            res.status(404).json({ message: error })
        }

    }
}

