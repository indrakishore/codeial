const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');

router.get('/profile', usersController.profile);
//routed signIn and signUp pages
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);
router.post('/create-session', usersController.createSession);

module.exports = router;

router.use('/users', require('./users'));

//for any further routes, access from here
//router.use('/routerName', require('./routerfile'));

// module.exports = router;


