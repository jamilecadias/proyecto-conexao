const bcrypt = require('bcryptjs');
const db = require("../database/models");
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator');

const Controller = {

    index: (req, res) => {
		return res.render('index');
	},

    login: (req, res)=>{
        res.render('login')
    },

    processLogin: (req, res) => {
        return res.send('Ruta por post')
    },

    register: (req, res)=>{
        res.render('register')
    }, 

    dashboard: (req, res)=>{
        res.render('dashboard')
    }, 

    userUpdate: (req, res)=>{
        res.render('userUpdate')
    },
    //Para listar los usuarios
    list: (req, res) => {
        db.User.findAll()
        .then(users => {
              res.render("dashboard2",{users:users});
           })
           .catch(err => {
              return res.send(err)
           })
     },
     //Para poblar la base de datos con los registrados por formulario
     create: function (req,res) {
        const resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        db.User.create({
            full_name: req.body.full_name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename,
            role: req.body.role,
        })
            .then(function () {
                res.redirect('/')
            })
        }
        
}
module.exports = Controller;

   /*  
    profile: (req, res)=>{
        res.render('./profile')
    }, */
