/**
* Ce fichier fait partie du projet piikante.
*
* Il crée un modèle d'utilisateur selon un shéma Mongoose en vérifiant qu'il est unique
*
* 
* @copyright 2022 Morgussian
*/

const mongoose = require('mongoose');

//précaution supplémentaire pour un utilisateur unique
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User' , userSchema);