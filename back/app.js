/**
* Ce fichier fait partie du projet piikante.
*
* Permet de connecter à mongoose (database), gère l'accès des headers des requètes et d'autres trucs pas compris.
*
* 
* @copyright 2022 Morgussian
*/

const express = require('express');
const mongoose = require('mongoose');

const saucesRoute = require('./routes/sauces');
const userRoutes = require('./routes/user');

const path = require('path');

//pour pas avoir d'erreur de cors mais on peut plus se connecter :SUPER!
//const cors = require('cors');

mongoose.connect('mongodb+srv://simpson:zri76KHKJ@cluster0.vvm1rmn.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true }) 
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//app.use(cors);
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


//résout les pb de CORS headers dans express
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});




//faire des routes c'est pour pouvoir donner n'importe quel chemin à un fichier?
app.use('/api/auth', userRoutes);

//Utiliser la logique codée dans le fichier sauces.js dossier routes.
app.use('/api/sauces', saucesRoute);

//rendre publiques les données ce dossiere est accessible à tout le monde
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;