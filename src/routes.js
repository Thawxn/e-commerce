const express = require('express');

const routes = express.Router();

// importando controllers
const homeController = require('./controllers/homeControlle');
const authController = require('./controllers/authController');

// home
routes.get('/', homeController.index);

// user
routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);
routes.get('/authenticate/logout', authController.logout);

module.exports = routes;
