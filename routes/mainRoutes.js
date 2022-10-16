const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const mainController = require('../controllers/mainController')
const validations = require('../middlewares/validations')
const authMiddleware = require ('../middlewares/authMiddleware'); 
const guestMiddleware = require ('../middlewares/guestMiddleware'); 
const adminMiddleware = require ('../middlewares/adminMiddleware'); 


// Users Multer 
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname, '../public/images/profile'));
        
    },
    filename:(req, file, cb)=>{
        console.log(file);
        const newFilename = path.basename(file.originalname, (path.extname(file.originalname))) + "-" + Date.now() + path.extname(file.originalname);
        cb(null,  newFilename); 
    }

})
const upload = multer({ storage : storage });


router.get('/', mainController.index);

/* router.get('/register', mainController.create); */

router.get('/register',guestMiddleware, mainController.register);
router.post('/register', upload.single('avatar'), validations.register, mainController.create);

router.get('/login', guestMiddleware, mainController.login);
router.post('/login', validations.login, mainController.processLogin);

router.get('/dashboard',adminMiddleware, mainController.dashboard);
router.get('/edit/:id', mainController.edit);
router.post('/edit/:id',upload.single('avatar'), validations.edit,  mainController.update)
router.get('/users', adminMiddleware, mainController.list);
router.post('/users', upload.single('avatar'), validations.register, mainController.createAdmin);

router.get('/profile',authMiddleware, mainController.profile);
router.get('/profile/:id', mainController.profileById);
router.get('/logout/', mainController.logout); 
router.delete('/delete/:id' , mainController.delete)
router.delete('/destroy/:id' , mainController.destroyByID)




module.exports = router;