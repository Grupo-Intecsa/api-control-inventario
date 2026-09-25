const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middlewares/authUser');

// MILDDLEWARES
router.use(express.urlencoded({ extended: true }));
router.use(express.json({ extended: true }));

// const { UserValidators } = require('../validators')
const { UserController } = require('../controllers');

router.post('/api/v1/user/register/', UserController.register);
router.post('/api/v1/user/login/', UserController.login);

router.get('/api/v1/user/', verifyToken, UserController.findUsers);
router.get('/api/v1/user/:id', verifyToken, UserController.findUserById);
router.patch('/api/v1/user/:id', verifyToken, UserController.findByIdAndUpdate);
router.delete('/api/v1/user/:id', verifyToken, UserController.findByIdAndDelete);

// Pedidos
router.get('/api/v1/pedidos', UserController.getPedidosByEmail)

module.exports = router;