/**
* Ce fichier fait partie du projet piikante.
*
* Il contient la logique pour la manipulation des sauces
*
* 
* @copyright 2022 Morgussian
*/

const sauce = require('../models/sauces');

//recevoir et enregistrer une sauce dans la DB
exports.createSauce = (req, res) => {

    //Supprimer le champ _id que genère mongo db
    delete req.body._id;
    const sauce = new Sauce({
      ...req.body
    });
    sauce.save()
      .then(() => res.status(201).json({ message :  'objet créé'}))
      .catch(error => res.status(400).json({error}));
};

//récupérer une sauce avec son ID
exports.getOneSauce = (req, res) => {
    Sauce.findOne({_id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({error}));
};

//Modifier une sauce 
exports.modifySauce = (req, res) => {

    //L'ID est redemandé après copie de la requète car elle peut contenir un id différent...
    Sauce.updateOne({ _id: req.params.id}, {...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée.'}))
    .catch(error => res.status(400).json({error}));
};

//Supprimer une sauce 
exports.deleteSauce = (req, res) => {
    Sauce.deleteOne({_id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce supprimée.'}))
        .catch(error => res.status(404).json({error}));
};

//récupérer toutes les sauces de la DB
exports.getAllSauces = (req, res) => {
    Sauce.find()
        .then(sauces => res.status(200).json({ sauces }))
        .catch(error => res.status(400).json({error}));
};