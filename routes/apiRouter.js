const express = require('express');
const router = express.Router();
const apiUserController = require('../controllers/api/userController');

//MOSTRAR TODOS LOS USUARIOS - API
router.get('/users', apiUserController.list);

//MOSTRAR ULTIMO USUARIO
router.get('/users/last', apiUserController.last);
module.exports = router;