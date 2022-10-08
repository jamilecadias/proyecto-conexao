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