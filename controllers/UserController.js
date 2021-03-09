const { UserService } = require('../services')
const { comparePassword, createToken } = require('../util')

module.exports = {

    register: async (req, res) => {
        const { password, confirmPassword } = req.body
        
        const errors = {}
        try {

            if(password !== confirmPassword){
                errors.password = 'password no match'
            }
            // TODO añadir controles de contraseña segura 

            if(Object.keys(errors).length > 0){
                res.status(400).json(errors)
            }

            const newUser = await UserService.create(req.body)
            .then(newUser => newUser)
            .catch(err => {
                errors.mongoose = 'email alredy taken'
                throw new Error(err)
            })

            if(newUser._id) res.status(201).json({ message: `user create success whit id: ${newUser._id}` })
            
        } catch (error) {
            res.status(400).json({ message: errors })
        }  
    },

    login: async (req, res) => {
        const { email, password } = req.body
        const errors = {}

        try {

            const user = await UserService.findUserByEmail(email)
            if (!user) {
                errors.userExist = 'Verifica tus credenciales'
                throw new Error('Input Error', errors)
            }

            const isValid = comparePassword(user.password, password)
            if (!isValid) {
                errors.userExist = 'Verifica tus credeciales'
                throw new Error('Input Error', errors)
            }

            const token = createToken(user)
            if (!token) throw new Error('token error')

            res.status(200).json({ message: 'Login successful', login: token })
        } catch (errors) {
            res.status(400).json(errors)
        }

    },
    findUsers: async (_, res) => {
        try {
            const users = await UserService.findUsers()
            res.status(200).json(users)
        } catch (error) {
            res.status(400).json(error)
        }

    },
    findUserById: async (req, res) => {
        const err = {}
        try {

            const user = await UserService.findUserById(req.params.id)

            if (!user) {
                err.UserID = 'ID not found'
                throw new Error('Id invalido', err)
            } else if (user.is_Active === false) {
                err.deleted = 'El usuario no está activo'
                throw new Error('Id inactivo', err)
            } else {
                res.status(200).json(user)
            }

        } catch (error) {
            res.status(400).json({ error })
        }
    },

    findByIdAndUpdate: async (req, res) => {
        //TODO AÑADIR IS.VALID

        const { id } = req.params
        try {
            await UserService.findByIdAndUpdate(id, req.body)
            res.status(200).json({ message: 'Success update' })
        } catch (err) {
            res.status(400).json({ message: err })
        }
    },

    findByIdAndDelete: async (req, res) => {

        const { id } = req.params
        try {
            const user = await UserService.findByIdAndDelete(id, { is_Active: false })
            if (user)
                res.status(201).json({ message: 'erased, successful' })

        } catch (err) {
            res.status(401).json({ message: err })
        }

    },

}