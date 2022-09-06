/**
* Ce fichier fait partie du projet piikante.
*
* multer est un package qui permet la gestion de fichiers
*
* 
* @copyright 2022 Morgussian
*/

const multer = require('multer');

//dictionnaire pour ajouter des extensions aux fichiers image d'après leur chemin d'accès?
const MIME_TYPE = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png'
}

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'images');
    },
    filename : (req, file, callback) => {
        //split sépare une string en array avec autant d'entrées que d'espaces rencontrés
        //join joint un array en string avec '_' entre les entrées. 
        const name = file.originalname.split(' ').join('_');

        //Nathan MIME_TYPE(file.mimetype); à l'origine des parentheses
        const extension = MIME_TYPE[file.mimetype];

        //création du nom du fichier
        // Date.now est un timeStamp pour que le nom généré soit unique
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage}).single('image');