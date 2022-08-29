/**
* Ce fichier fait partie du projet piikante.
*
* il vérifie un user ID contenu dans un token
*
* 
* @copyright 2022 Morgussian
*/

const jwt = require('jsonwebtoken');

//middleware d'authentification user
//il doit être passé aux routes: fichier censé être dans routes. Pour l'instant pas encore codé.
module.exports = (req, res, next) => {
    try{

        //la première entrée du token est le mot bearer, on prend l'index 1 avec split pour obtenir le token seul.
        const token = req.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'random_token_secret');
        const userId = decodedToken.userId;
        req.auth = {
            userId : userId
        }
    } catch(error) {
        res.status(401).json({error});
    }
}
