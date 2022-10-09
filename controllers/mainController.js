const db = require("../database/models")
const Op = db.Sequelize.Op;

const Controller = {

    index: (req, res) => {
		return res.render('index');
	},

    login: (req, res)=>{
        res.render('login')
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
        db.User.create({
            full_name: req.body.full_name,
            phone_number: req.body.phone_number,
            email: req.body.email,
            password: req.body.password,
            // avatar: req.body.avatar,
            role: req.body.role,
        })
            .then(function () {
                res.redirect('/')
            })
    },


   /*  create: function(req, res) {
        let user = {
            nombre: req.body.nombre,
            telefono: req.body.nombre,
            email: req.body.nombre,
            contrasena: req.body.nombre
        }
        res.redirect('./login');
    },


    profile: (req, res)=>{
        res.render('./profile')
    }, */
    
}
module.exports = Controller;