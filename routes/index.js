// import express

const express = require('express');

console.log('router loaded');

const router = express.Router();

// how to access it.
const homeController = require('../controllers/home_controller');

module.exports = router;
//access 
router.get('/', homeController.home);
router.use('/users', require('./users'));

//for any further routes, access from here
//router.use('/routerName', require('./routerfile'));

modules.exports = router;