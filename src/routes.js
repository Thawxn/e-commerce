const express = require('express');

const routes = express.Router();

// importando middlewares
const middleware = require('./middlewares/middleware');

// importando controllers
const adminController = require('./controllers/adminControlle');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');

// admin
routes.get('/find/:id', middleware.auth_admin, adminController.search); // buscando usuário pelo id
routes.get('/find', middleware.auth_admin, adminController.search_all); // buscando todos os usuários
routes.get('/stats', middleware.auth_admin, adminController.statistic_user); // estatística de usuários por mês

// user
routes.post('/register', userController.register); // registrando usuário
routes.post('/edit', middleware.auth, userController.edit); // editando usuário

// session
routes.post('/authenticate', sessionController.authenticate); // logando

module.exports = routes;
