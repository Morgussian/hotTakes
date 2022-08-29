const express = require('express');
const mongoose = require('mongoose');
const multer = require('../middleware/multer_config');


const router = express.Router();
const Sauce = require('../models/sauce');
//recevoir et enregistrer une sauce dans la DB
router.post('/', (req, res, next) => {

    //Supprimer le champ _id que genère mongo db
    delete req.body._id;
    const sauce = new Sauce({
      ...req.body
    });
    sauce.save()
      .then(() => res.status(201).json({ message :  'objet créé'}))
      .catch(error => res.status(400).json({error}));
});
  
//récupérer une sauce avec son ID
router.get('/:id', (req, res, next) => {
Sauce.findOne({_id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({error}));
});
  
//Modifier une sauce 
router.put('/:id', (req, res,next) => {

//L'ID est redemandé après copie de la requète car elle peut contenir un id différent...
Sauce.updateOne({ _id: req.params.id}, {...req.body, _id: req.params.id })
.then(() => res.status(200).json({ message: 'Sauce modifiée.'}))
.catch(error => res.status(400).json({error}));
});

//Supprimer une sauce 
router.delete('/:id', (req, res, next) => {
Sauce.deleteOne({_id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce supprimée.'}))
    .catch(error => res.status(404).json({error}));
});

//récupérer toutes les sauces de la DB
router.get('/', (req, res, next) => {
Sauce.find()
    .then(sauces => res.status(200).json({ sauces }))
    .catch(error => res.status(400).json({error}));
});

module.exports = router;