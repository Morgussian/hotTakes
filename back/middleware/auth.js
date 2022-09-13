/**
* Ce fichier fait partie du projet piikante.
*
* il vérifie un user ID contenu dans un token
*
* 
* @copyright 2022 Morgussian
*/

const jwt = require('jsonwebtoken');

const UserSchema = require('../models/user');



/**
 * authentification d'un user. on va utiliser await pour certaines fonctions asynchrones donc: préciser "async"
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next 
 */
module.exports = async (req, res, next) => {
    try{

        //variable d'environnement contenant la clé de TOKEN
        const envToken = process.env.TOKEN;

        //la première entrée du token est le mot bearer, on prend l'index 1 avec split pour obtenir le token seul.
        const token = req.headers.authorization.split(' ')[1]; // authorization: Bearer sdf4sd45fsd4f
        const decodedToken = jwt.verify(token, envToken);
        
        if (!decodedToken) {
            return res.status(403).json({error: "invalid token"})
        }
        
        //expiration du token : 24 heures
        if (decodedToken.expiresIn < Date.now()) {  // Date.now() -> 124454512ms  expiresIn -> 124444512ms
            return res.status(403).json({error: "Token expired"})
        }
        
        const userId = decodedToken.userId;
        const user = await UserSchema.findOne({ "_id": userId })
        if (!user) {
            return res.status(403).json({error: "user not found"})
        }
        
        req.auth = {
            userId : userId
        }
        next()
    } catch(error) {

        //message 403: unauthorized request
        res.status(403).json({error});
    }
};


