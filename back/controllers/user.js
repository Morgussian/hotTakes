/**
* Ce fichier fait partie du projet piikante.
*
* Il contient la logique pour la connexion et l'inscription d'un utilisateur
*
* 
* @copyright 2022 Morgussian
*/

//plugin de cryptage pour le password
const bcrypt = require('bcrypt');

//appel du package de génération de token npm
const jwt = require('jsonwebtoken');

//pourquoi une majuscule???
const User = require('../models/user');

//inscription d'un user. on va utiliser await pour certaines fonctions asynchrones donc: préciser "async"
exports.signup = async (req, res) => {

    const userCheck = await User.findOne({ email: req.body.email })
    if (userCheck) {
        return res.status(401).json({message : 'cet utilisateur a déjà été créé.'});
    }

    //Nathan hash est une fonction asynchrone il faut que le script attende encryptedPassword
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        email: req.body.email,
        password: encryptedPassword,
    })
    
    user.save()
        .then(res.status(201).json({message: 'Utilisateur créé.'}))
        .catch(error => res.status(400).json({error}));

    // //méthode de hash du mot de passe, salé 10 fois
    // bcrypt.hash(req.body.password, 10)
    //     .then(hash => {

    //         //construction d'un objet user, modèle mongoose
    //         const user = new User({
    //             email: req.body.email,
    //             password: hash,
    //         });
    //         user.save()
    //             .then(res.status(201).json({message: 'Utilisateur créé.'}))
    //             .catch(error => res.status(400).json({error}));
    //     })
    //     .catch(error => res.status(500).json({error}));
};

//connexion d'un user 

exports.login = async (req, res) => {

    //nathan: findOne est fonction asynchrone. C'est une promise mais on fait pas then catch.
    //const user n'est pas juste l'email? je sais pas ce que c'est 
    //c'est quoi User ici? 
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(401).json({message : 'Vous n\'êtes pas inscrit: Identification impossible'});
    }
    
    //pareil isValid est-il une fonction?
    const isValid = await bcrypt.compare(req.body.password, user.password) //Nathan  true || false
    if (!isValid) {
        return res.status(401).json({message : 'Ce mot de passe est incorrect'});
    }
    
    res.status(200).json({
        userId: user._id,
        token:  jwt.sign(
            //donnée à encoder avec le token: payload
            //user _id est généré par mongo. normal qu'il fasse pas partie du schéma User
            {userId : user._id},
            'TBim86yAz5jvWduq4oDv',
            {expiresIn : '24h'}
        )
    })
}
    // .then(user => {
    //     if(!user){
    //         res.status(401).json({message : 'Vous n\'êtes pas inscrit: Identification impossible'});
    //     } else {
    //         //bcrypt compare le password du body de la requète au password user. password user est un hash créé dans la fonction exports.signup.
    //         bcrypt.compare(req.body.password, user.password)
    //         .then(valid => {
    //             if(!valid){
    //                 res.status(401).json({message : 'Ce password est incorrect'});
    //             } else {
    //                 res.status(200).json({
    //                     userId : user._id,
    //                     token : jwt.sign(
    //                         //donnée à encoder avec le token: payload
    //                         {userId : user._id},
    //                         'random_token_secret',
    //                         {expiresIn : '24h'}
    //                     )
    //                 })
    //             }
    //         })
    //         .catch(error => {
    //             res.status(500).json({ error });
    //         })
    //     }
    // })
    // .catch(error => {
    //     res.status(500).json({ error });
    // })
