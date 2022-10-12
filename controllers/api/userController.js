const db = require("../../database/models");
const Op = db.Sequelize.Op;
const apiUserController = {
    list: (req, res) => {
//         lastUser = db.User.findOne({
//             order: [
//                 ['id','DESC']
//             ]
//     }
// )
//         console.log(last)
        totals = db.User.findAll()
        .then(users => {
            totals=users.length
            return res.status(200).json({
                total: users.length,
                data: users,
                status:200})
    })
},
    last: (req, res) => {
        db.User
        .findOne({
            order: [
                ['id','DESC']
            ]
    }
)
        .then(users => {
            return res.status(200).json({
                data: users,
                status:200})
    })
    }
}
module.exports = apiUserController;