const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users_controller');
const passport = require('passport');

// router.get('/profile', usersController.profile);
// Users profile make accessible only when user is signed in
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update); //since data is being updated into database


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

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);

module.exports = router;

// router.use('/users', require('./users'));

//for any further routes, access from here
//router.use('/routerName', require('./routerfile'));

// module.exports = router;


