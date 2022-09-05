/**
* Ce fichier fait partie du projet piikante.
*
* Il contient la logique pour la manipulation des sauces
*
* 
* @copyright 2022 Morgussian
*/

const sauce = require('../models/sauces');
const fs = require('fs');

//recevoir et enregistrer une sauce dans la DB
exports.createSauce = (req, res) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    
                    //new majuscule!!!
    const sauce = new Sauce({
       ...sauceObject,
       userId: req.auth.userId,
       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
   });
   
   
   sauce.save()
   .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
   .catch(error => { res.status(400).json( { error })});
};

//récupérer une sauce avec son ID
exports.getOneSauce = (req, res) => {
    Sauce.findOne({_id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}));
};

//Modifier une sauce 
exports.modifySauce = (req, res) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete sauceObject._userId;

    //majuscule !!!
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {

                //majuscule!!!
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

//Supprimer une sauce 
exports.deleteSauce = (req, res) => {
    //majuscule
    Sauce.findOne({ _id: req.params.id})
       .then(sauce => {
           if (sauce.userId != req.auth.userId) {
               res.status(401).json({message: 'Not authorized'});
           } else {
               const filename = sauce.imageUrl.split('/images/')[1];
               fs.unlink(`images/${filename}`, () => {
                    //majuscule
                    Sauce.deleteOne({_id: req.params.id})
                       .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                       .catch(error => res.status(401).json({ error }));
               });
           }
       })
       .catch( error => {
           res.status(500).json({ error });
       });
};

//récupérer toutes les sauces de la DB
exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json({ sauces }))
        .catch(error => res.status(400).json({error}));
};