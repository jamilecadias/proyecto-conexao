const bcrypt = require('bcryptjs');
const db = require("../database/models");
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator');
const fetch = require('node-fetch');

const Controller = {

    index: (req, res) => {
		return res.render('index');
	},

	maintenance: (req, res) => {
		return res.render('maintenance');
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

		db.User.findOne({
			where: {
				email : req.body.email
				},
			raw: true
			})
			.then(user => { 
				if (user){
					let pass = req.body.password;
					let correctPassword = bcrypt.compareSync(pass , user.password);

					if (correctPassword) {
					delete user.password; 
					req.session.userLogged = user;
                    res.cookie('userEmail' , req.body.email, { maxAge: (1000 * 60) * 3 } ); 

				
						return res.redirect('/profile')
					} else {
						return res.render('login', {
							errors: {
								email: {
									msg: 'Los datos son incorrectos.'
								}
							}
						})
					}
				}
				return res.render('login', {
					errors: {
						email: {
							msg: 'El email no se encuentra en la basse de datos.'
						}
					}
				})
			})
	},

    profile: (req, res)=> {

		db.User.findByPk(req.session.userLogged.id, {raw : true})
		.then (({id, full_name, email, phone_number, avatar, role}) => {
			const user = {id, full_name, email, phone_number, avatar, role}
			res.render('profile',{user})
		})
	},

	profileById: (req, res)=> {

		db.User.findByPk(req.params.id, {raw : true})
		.then (({id, full_name, email, phone_number, avatar, role}) => {
			const user = {id, full_name, email, phone_number, avatar, role}
			res.render('profile',{user})
		})
	},

    logout: (req, res) => {
		res.clearCookie('userEmail'); 
		req.session.destroy();
		return res.redirect('/')
	}, 

    register: (req, res)=>{
        res.render('register')
    }, 

    userUpdate: (req, res)=>{
        res.render('userUpdate')
    },
    //Para listar los usuarios
    list: (req, res) => {
		const total = fetch('http://localhost:3000/api/users')
        .then(response => response.json())
        
        const last = fetch('http://localhost:3000/api/users/last')
        .then(response => response.json())
        
        const allData = Promise.all([total, last]);
        allData.then(users => {
            return res.render('list',{users})
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
        },

		createAdmin: function (req,res) {
			const resultValidation = validationResult(req);
			if (resultValidation.errors.length > 0) {
				db.User.findAll() .then(users =>{
					res.render("list",{
						errors: resultValidation.mapped(),
						oldData: req.body,
						users
					} )
				})
				
			} else {
				db.User.create({
				full_name: req.body.full_name,
				phone_number: req.body.phone_number,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 10),
				avatar: req.file ? req.file.filename: "",
				role: req.body.role,
			})
				.then(function () {
					res.redirect('/users')
				})
			}
			
			},

			edit: (req, res) => {
				db.User.findByPk(req.params.id)
				.then(users => {
					res.render("userUpdate",{users:users});
				 })
				 .catch(err => {
					return res.send(err)
				 })
			},

			//Proceso >> Edici??n de Usuario desde User o Admin
			update: (req, res) => {
				const resultValidation = validationResult(req);
		if (resultValidation.errors.length > 0) {
			return res.render('userUpdate', {
				errors: resultValidation.mapped(),
				users: req.body
			});
		}
		db.User.findByPk(req.params.id)
				.then(users => {
					if (users.password == req.body.password ) {
						db.User.update(
							{
								full_name: req.body.full_name,
								phone_number: req.body.phone_number,
								email: req.body.email,
								password: req.body.password,
								avatar: req.file.filename,
								role: req.body.role
							},
							{
							where: {
								id: req.params.id
							},
							})
							.then(()=>{
								if (users.role == "admin") {
									res.redirect('/users')
								} else {
								res.redirect('/users')
							}
							})
					} else {
						db.User.update(
							{
								full_name: req.body.full_name,
								phone_number: req.body.phone_number,
								email: req.body.email,
								password: bcrypt.hashSync(req.body.password, 10),
								avatar: req.file.filename,
								role: req.body.role
							},
							{
							where: {
								id: req.params.id
							},
							})
							.then(()=>{
								if (users.role == "admin") {
									res.redirect('/users')
								} else {
								res.redirect('/users')
							}
							})}
				})
			},

		delete: (req, res) => {
			db.User.destroy({
				where: {id: (req.session.userLogged).id }
			})
			   // force: true es para asegurar que se ejecute la acci??n
			.then(()=>{
				res.clearCookie('userEmail'); 
				req.session.destroy();
				return res.redirect('/')
			})
			.catch(error => res.send(error)) 
		},
		

		destroyByID: (req, res) => {
			db.User.destroy({
				where: {id: (req.params.id) }
			})
			   // force: true es para asegurar que se ejecute la acci??n
			.then(()=>{
				return res.redirect('/users')
			})
			.catch(error => res.send(error)) 
		},

		//Para averiguar si un dato ingresado een el formulario se encuentra en la base de datos

		findByUser:  (user) =>  db.User.findOne({
            where: {
                email: user
            }
        }),

        
}
module.exports = Controller;


