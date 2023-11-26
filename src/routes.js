const express = require('express');

const routes = express.Router();

// importando middlewares
const middleware = require('./middlewares/middleware');

// importando controllers
const homeController = require('./controllers/homeControlle');
const authController = require('./controllers/authController');

// home
routes.get('/', middleware.auth, homeController.index);

// user
routes.post('/register', authController.register);
routes.post('/authenticate', authController.authenticate);

module.exports = routes;
