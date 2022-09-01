const express = require('express');
const mongoose = require('mongoose');
const multer = require('../middleware/multer_config');


const router = express.Router();

//va chercher le fichier sauces.js dans controllers.
const sauceControl = require('../controllers/sauces');

//recevoir et enregistrer une sauce dans la DB
router.post('/', sauceControl.createSauce);
  
//récupérer une sauce avec son ID
router.get('/:id', sauceControl.getOneSauce);
  
//Modifier une sauce 
router.put('/:id', sauceControl.modifySauce);

//Supprimer une sauce 
router.delete('/:id', sauceControl.deleteSauce);

//récupérer toutes les sauces de la DB
router.get('/', sauceControl.getAllSauces);

module.exports = router;