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
const Sauce = require('./models/sauces');

const User = require('./models/user');

const saucesRoute = require('./routes/sauces')
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://simpson:zri76KHKJ@cluster0.vvm1rmn.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true }) 
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

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




//routes c'est pour pouvoir donner n'importe quel chemin à un fichier?
app.use('/api/auth', userRoutes);

//Utiliser la logique codée dans le fichier sauces.js dossier routes.
app.use('/api/sauces', saucesRoute);


//Ajouter un nouvel utilisateur dans la DB
// app.post('/api/auth/signup', (req, res, next) => {
//   const user = new User ({
//     ...req.body
//   });
  
//   user.save()
//     .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//     .catch(error => res.status(400).json({ error }));

// });




module.exports = app;