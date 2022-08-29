/**
* Ce fichier fait partie du projet piikante.
*
* Il appelle les logiques de signup et login contenues dans controllers/user.js.
*
* 
* @copyright 2022 Morgussian
*/

const express = require('express');
const auth = require('auth');
const router = express.Router();

const userControl = require('../controllers/user')

router.post('/signup', userControl.signup);
router.post('/login', userControl.login);

module.exports = router;