/**
* Ce fichier fait partie du projet piikante.
*
* Il crée un modèle de sauce selon un schéma Mongoose
*
* 
* @copyright 2022 Morgussian
*/

const mongoose = require('mongoose');

// ajouter ,required : 'true' sur les entrées si on veut...
const sauceSchema = mongoose.Schema({

    //utilisateur qui a créé la sauce
    userId : { 

        //Nathan
        type : mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name : { type : String },
    manufacturer : { type : String },
    description : { type : String },
    mainPepper : { type : String },
    imageUrl : { type : String },
    heat : { type : Number },
    likes : { type : Number },
    dislikes : { type : Number },
    usersLiked : [{

        //Nathan
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    usersDisliked : [{

        //Nathan
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
});

module.exports = mongoose.model('sauces', sauceSchema);