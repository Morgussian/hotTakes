/**
* Ce fichier fait partie du projet piikante.
*
* Il appelle les logiques de signup et login contenues dans controllers/user.js.
*
* 
* @copyright 2022 Morgussian
*/

const express = require('express');
const router = express.Router();
const userControl = require('../controllers/user')

//middleware de limitation de login
const loginLimiter = require('../middleware/express_rate_limiter');

router.post('/signup', userControl.signup);
router.post('/login', loginLimiter.limiterConfig, userControl.login);

module.exports = router;