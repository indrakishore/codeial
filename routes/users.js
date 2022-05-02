const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
module.exports = router;

router.use('/users', require('./users'));

//for any further routes, access from here
//router.use('/routerName', require('./routerfile'));

module.exports = router;


