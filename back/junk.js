/** controllers/sauces */

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


//intégrer le code de nathan dans le if de décocher un
// if(sauce.usersLiked.includes(id)){
//     sauce.userLiked = sauce.userLiked.filter((i) => i != id)
//     sauces.updateOne({
//         ...sauce,
//         likes: sauce?.userLiked.length,
//         dislikes: sauce?.userDisliked.length
//       })