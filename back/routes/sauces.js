const express = require('express');
const mongoose = require('mongoose');
const multer = require('../middleware/multer_config');

//auth est dans les middleware
const auth = require('../middleware/auth');

const router = express.Router();

//va chercher le fichier sauces.js dans controllers.
const sauceControl = require('../controllers/sauces');

//recevoir et enregistrer une sauce dans la DB
router.post('/', auth, multer, sauceControl.createSauce);

//récupérer toutes les sauces de la DB
router.get('/', auth, sauceControl.getAllSauces);

//récupérer une sauce avec son ID
router.get('/:id', auth, sauceControl.getOneSauce);
  
//Modifier une sauce 
router.put('/:id', auth, multer, sauceControl.modifySauce);

//Supprimer une sauce 
router.delete('/:id', auth, sauceControl.deleteSauce);

//liker ou disliker une sauce
router.post('/:id/like', auth, sauceControl.likeDislike);

module.exports = router;