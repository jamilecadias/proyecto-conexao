const express = require('express');

const router = express.Router();

const mainController = require('../controllers/mainController')

router.get('/', mainController.index);

/* router.get('/register', mainController.create); */

router.get('/register', mainController.register);

router.get('/login', mainController.login);

router.get('/dashboard', mainController.dashboard);

router.get('/userUpdate', mainController.userUpdate);


/* router.get('/profile', mainController.profile); */

module.exports = router;