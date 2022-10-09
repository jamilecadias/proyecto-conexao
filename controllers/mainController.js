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

    create: (req, res)=>{
        
        res.send(req.body)
    }, 

    dashboard: (req, res)=>{
        res.render('dashboard')
    }, 

    userUpdate: (req, res)=>{
        res.render('userUpdate')
    },
    
    list: (req, res) => {
        db.User.findAll()
        .then(users => {
              res.render("dashboard2",{users:users});
           })
           .catch(err => {
              return res.send(err)
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