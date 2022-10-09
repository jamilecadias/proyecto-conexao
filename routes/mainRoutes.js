const express = require('express');

const router = express.Router();
 
const multer = require('multer');

const path = require('path')

const mainController = require('../controllers/mainController')

// Multer products
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname, '../public/images/profile'));
        
    },
    filename:(req, file, cb)=>{
        console.log(file);
        const newFilename = "" ; + Date.now() + path.extname(file.originalname);
        cb(null,  newFilename); 
    }

})
const upload = multer({ storage : storage });


router.get('/', mainController.index);

/* router.get('/register', mainController.create); */

router.get('/register', mainController.register);

router.post('/register', upload.single('avatar'), mainController.create);

router.get('/login', mainController.login);

router.post('/login', mainController.create);

router.get('/dashboard', mainController.dashboard);

router.get('/userUpdate', mainController.userUpdate);

router.get('/users', mainController.list);


/* router.get('/profile', mainController.profile); */

module.exports = router;