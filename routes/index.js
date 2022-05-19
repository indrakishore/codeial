// import express

const express = require('express');

console.log('router loaded');

const router = express.Router();

// how to access it.
const homeController = require('../controllers/home_controller');
const usersController = require('../controllers/users_controller');

module.exports = router;
//access 
router.get('/', homeController.home);
router.get('/profile', usersController.profile);
router.use('/users', require('./users'));
router.use('/posts', require('./posts'));//require post route
router.use('/comments', require('./comments'));

//for any further routes, access from here
//router.use('/routerName', require('./routerfile'));

module.exports = router;