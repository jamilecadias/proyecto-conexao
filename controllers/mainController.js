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

		const resultValidation = validationResult(req); 
		if (resultValidation.errors.length > 0){
			return res.render('login' , {
				errors : resultValidation.mapped(),
				oldData: req.body
			})
		} 	

		/* db.Users.findOne({
			where: {
				email : req.body.email
				},
			raw: true
			})
			.then(user => { 
				if (user){
					let pass = req.body.password;
					let correctPassword = bcryptjs.compareSync(pass , user.password);

					if (correctPassword) {
					delete user.password; 
					req.session.userLogged = user;

					if(req.body.recordarme) {
						res.cookie('userEmail' , req.body.email, { maxAge: (1000 * 60) * 3 } ); 
					}
				
						return res.redirect('/profile')
					} else {
						return res.render('./login', {
							errors: {
								email: {
									msg: 'Los datos son incorrectos.'
								}
							}
						})
					}
				}
				return res.render('./login', {
					errors: {
						email: {
							msg: 'Los datos son incorrectos.'
						}
					}
				})
			}) */
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
              res.render("list",{users:users});
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
                res.redirect('/login')
            })
        }
        
}
module.exports = Controller;

   /*  
    profile: (req, res)=>{
        res.render('./profile')
    }, */
