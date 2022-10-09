const { body } = require('express-validator');
const path = require('path');
const extensions = ['.jpg','.jpeg', '.png', '.gif'];

module.exports = {

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
            .if(({ req }) => queries.User.findByUser(req.session.usuario)
                .then(user => user.email !== req.body.email)),
           /*  .custom(async (value,{req}) => {
                //const sessionUser = await queries.User.findByUser(req.session.usuario);  ESTE O EL IF, CHEQUEAR
                //if (sessionUser.email !== req.body.email){
                    const doesExist = await queries.User.findByUser(req.body.email);
                    if (doesExist !== null){
                        throw new Error('El email ya existe en la base de datos')
                    }
                //}
                return true;
            }), */
        body('password')
            .trim().notEmpty().withMessage('Tienes que escribir una contraseña'),

        body('role')
            .notEmpty().withMessage('Tenes que seleccionar un rol'),

        body('image_url')
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
            })
    ]
}

