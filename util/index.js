const bcrypt =require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    comparePassword: ( userPassword, reqPassword ) => {
        return bcrypt.compareSync(reqPassword, userPassword)
    },
    createToken: (user) => {

        const payload = {
            id: user._id,
            email: user.email,
            name: user.name,
            exp: Math.floor(Date.now() /1000 + (60*60))
        }
            try {
                const token = jwt.sign(payload, process.env.JWT_SECRET)
                return {
                    ...payload,
                    token
                }
            } catch (error) {
                throw new Error('Token Error', error )
            }
          }
}