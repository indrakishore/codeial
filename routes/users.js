const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');
const passport = require('passport');

// router.get('/profile', usersController.profile);
// Users profile make accessible only when user is signed in
router.get('/profile', passport.checkAuthentication, usersController.profile);


//routed signIn and signUp pages
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
), usersController.createSession);

router.get('/sign-out', usersController.destroySession);

module.exports = router;

// router.use('/users', require('./users'));

//for any further routes, access from here
//router.use('/routerName', require('./routerfile'));

// module.exports = router;


