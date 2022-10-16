const { body } = require('express-validator');
const path = require('path');
const extensions = ['.jpg','.jpeg', '.png', '.gif'];
const queries = require('../controllers/mainController')

module.exports = {
login: [ 
    body('email')
    .notEmpty()
    .withMessage('Este campo debe estar completo.')
    .bail()
    .isEmail()
    .withMessage('Ingresar un email válido'),

body('password')
    .notEmpty()
    .withMessage('Debe ingresar una contraseña')
    .bail()
    .isLength(({ min: 6 }))
    .withMessage('La contraseña debe tener al menos 6 caracteres.'),
],

register: [
        body('full_name')
            .notEmpty().withMessage('Tenes que escribir un nombre').bail()
            .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
        body('phone_number')
            .notEmpty().withMessage('Tenes que escribir un teléfono').bail()
            .isInt().withMessage('Tenes que escribir un número'),
        body('email')
            .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
            .isEmail().withMessage('Debes escribir un formato de correo válido').bail()
            .custom(async (value,{req}) => {
                const doesExist = await queries.findByUser(req.body.email);
                if (doesExist !== null){
                    throw new Error('El email ya existe en la base de datos')
                }
            return true;
        }),
        body('password')
            .trim().notEmpty().withMessage('Tienes que escribir una contraseña')
            .bail()
            .isLength(({ min: 6 }))
            .withMessage('La contraseña debe tener al menos 6 caracteres.'),

        body('role')
            .notEmpty().withMessage('Tenes que seleccionar un rol'),

        body('avatar')
            .custom((value, { req }) => {
                let file = req.file;
                let acceptedExtensions = extensions;
                if (file !== undefined) {
                    let fileExtension = path.extname(file.originalname);
                    if (!acceptedExtensions.includes(fileExtension)) {
                        throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                    }
                }
                return true;
            }).bail()
            .custom((value, { req }) => {
                let file = req.file.size;
                const maxSize = 1 * 1024 * 1024;
                if   (file >= maxSize) {
                        throw new Error('El tamaño del archivo no puede ser mayor a 1MB');  
                } 
                return true;
            })    
    ],

    edit: [
        body('full_name')
            .notEmpty().withMessage('Tenes que escribir un nombre').bail()
            .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),
        body('phone_number')
            .notEmpty().withMessage('Tenes que escribir un teléfono').bail()
            .isInt().withMessage('Tenes que escribir un número'),
        body('email')
            .notEmpty().withMessage('Tienes que escribir un correo electrónico').bail()
            .isEmail().withMessage('Debes escribir un formato de correo válido').bail(),
        body('password')
            .trim().notEmpty().withMessage('Tienes que escribir una contraseña')
            .bail()
            .isLength(({ min: 6 }))
            .withMessage('La contraseña debe tener al menos 6 caracteres.'),

        body('role')
            .notEmpty().withMessage('Tenes que seleccionar un rol'),

        body('avatar')
            .custom((value, { req }) => {
                let file = req.file;
                let acceptedExtensions = extensions;
                if (file !== undefined) {
                    let fileExtension = path.extname(file.originalname);
                    if (!acceptedExtensions.includes(fileExtension)) {
                        throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
                    }
                }
                return true;
            }).bail()
            .custom((value, { req }) => {
                let file = req.file.size;
                const maxSize = 1 * 1024 * 1024;
                if   (file >= maxSize) {
                        throw new Error('El tamaño del archivo no puede ser mayor a 1MB');  
                } 
                return true;
            })    
    ]
}



