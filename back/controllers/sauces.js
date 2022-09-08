/**
* Ce fichier fait partie du projet piikante.
*
* Il contient la logique pour la manipulation des sauces
*
* 
* @copyright 2022 Morgussian
*/

const Sauce = require('../models/sauces');
const fs = require('fs');
const sauces = require('../models/sauces');

//comptage des like/dislike ça marche pas
function likeDislikeUpdater() {
    let likes = sauces.usersLiked.length;
    let dislikes = sauces.usersDisliked.length;

    return likes;
    

}

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
    sauces.find()

        //send plutôt que json et pas d'accolades pour faire comme un autre élève. Ca a l'air de marcher!!!
        .then(sauces => res.status(200).send( sauces ))
        .catch(error => res.status(400).send(error));
};

//liker ou disliker une sauce. Je ne pense pas que $inc soit utile dans ce cas:
//Je veux compter les array usersLiked et usersDisliked

exports.likeDislike = (req, res, next) => {
    let id = req.body.userId;
    let likeStatus = req.body.like;
    const sauceId = req.params.id;

    //l'utilisateur like
    if(likeStatus === 1){
        sauces.updateOne({ _id: sauceId}, { $inc: {likes: 1}, $push: {usersLiked: id}})
            .then(() => res.status(201).json({message: 'Like'}))
            .catch(error => res.status(400).json (error))
    }

    //l'utilisateur dislike la sauce
    if(likeStatus === -1){
        sauces.updateOne({ _id: sauceId}, { $inc: {dislikes: 1}, $push: {usersDisliked: id}})
            .then(() => res.status(201).json({message: 'dislike'}))
            .catch(error => res.status(400).json (error))
    }

    //l'utilisateur ne like plus (mais c'est pas un dislike)
    if (likeStatus === 0) {
        sauces.findOne({ _id: sauceId })
            .then((sauce) => {
                if(sauce.usersLiked.includes(id)){
                    sauces.updateOne({ _id: sauceId }, { $inc: { likes: -1 }, $pull: { usersLiked: id } })
                        
                        .then(() => {res.status(201).json({ message: ['Like has been canceled'] })})
                        .catch((error) => res.status(400).json(error))
                }
                if(sauce.usersDisliked.includes(id)){
                    sauces.updateOne({ _id: sauceId }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: id } })
                        
                        .then(() => {res.status(201).json({ message: ['Dislike has been canceled'] })})
                        .catch((error) => res.status(400).json(error))
                }
            })
            .catch((error) => res.status(400).json(error))
    }
    
}

//Nathan:
// res.status(200).json({
//     ...sauce,
//     likes: sauce?.userLiked.length,
//     dislikes: sauce?.userDisliked.length
//   })

// exports.likeDislike = (req, res, next) => {
//     const id = req.body.userId;
//     const likeStatus = req.body.like;

//     //updateOne + $push = methode push de mongoose = ça marche pas
//     if(likeStatus == 1){
//         Sauce.usersLiked.updateOne({
//             $push: { id }
//         })
//     };
//     if(likeStatus == 1){
//         Sauce.usersDisliked.updateOne({
//             $push: { id }
//         })
//     };

//     next()
// };

//l'utilisateur ne like plus (mais c'est pas un dislike)
// if (likeStatus === 0) {
//     sauces.updateOne({ _id: req.params.id }, { /*$inc: { likes: -1 },*/ $pull: { usersLiked: id } })
//         .then(() => {
//             return sauces.updateOne(
//                 { _id: req.params.id },
//                 { /*$inc: { dislikes: -1 },*/ $pull: { usersDisliked: id } }
//             );
//         })
//         .then(() => {
//             res.status(201).json({ message: ['Like has been canceled', 'Dislike has been canceled'] });
            
            
//         })
//         .catch((error) => res.status(400).json(error));
// }