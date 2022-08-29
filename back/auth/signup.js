
const mongoose = require('mongoose');

//plugin de mongoose pour comparer et éviter des doublons
const uniqueValidator = require('mongoose-unique-validator');

//un genre de class mongoDB
const userSchema = mongoose.Schema({
    //sur l'email, vérifier qu'il n'existe pas déjà dans la DB
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
});

//appeler le plugin de vérification email
userSchema.plugin(uniqueValidator);
//exporter le schema userSchema en un model utilisable. Il faut une majuscule...?
module.exports = mongoose.model('User', userSchema);
