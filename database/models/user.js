/* const sequelize = require("sequelize"); */
module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols ={
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true
        } ,
        full_name: {
            type: dataTypes.STRING 
        }, 

        phone_number: {
            type: dataTypes.INTEGER
        }, 
        
        email: {
            type: dataTypes.STRING
        },
        
        password: {
            type: dataTypes.STRING
        },
        
        avatar: {
            type: dataTypes.STRING
        },
        role: {
            type: dataTypes.STRING
        }   

    };
    let config = {
        tableName: "users",
        timestamps: false
    }
    const User = sequelize.define(alias , cols , config)

    return User;

}