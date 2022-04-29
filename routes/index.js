// import express

const express = require('express');

console.log('router loaded');

const router = express.Router();
const homeController = require('../controllers/home_controller');

module.exports = router;
router.get('./', homeController.home);