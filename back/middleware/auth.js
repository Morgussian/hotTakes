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


const UserSchema = require('../models/user');

//middleware d'authentification user
//il doit être passé aux routes: fichier censé être dans routes. Pour l'instant pas encore codé.
module.exports = async (req, res, next) => {
    try{
        //la première entrée du token est le mot bearer, on prend l'index 1 avec split pour obtenir le token seul.
        const token = req.headers.authorization.split(' ')[1]; // authorization: Bearer sdf4sd45fsd4f
        const decodedToken = jwt.verify(token, 'TBim86yAz5jvWduq4oDv');
        
        if (!decodedToken) {
            return res.status(403).json({error: "invalid token"})
        }
        
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

        //la il faudrait mettre un message 403: unauthorized request
        res.status(403).json({error});
    }
};

// module.exports = (req, res, next) => {
//     try{

//         //la première entrée du token est le mot bearer, on prend l'index 1 avec split pour obtenir le token seul.
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, 'sjksjk0978978jJKLJK_ç-');
//         const userId = decodedToken.userId;
//         req.auth = {
//             userId : userId
        
//         }

//         //Nathan
//         next();
//     } catch(error) {

//         //la il faudrait mettre un message 403: unauthorized request
//         res.status(403).json({error});
//         console.log('403: unauthorized request');
//     }
// };
