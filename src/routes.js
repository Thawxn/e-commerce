const express = require('express');

const routes = express.Router();

// importando middlewares
const middleware = require('./middlewares/middleware');

// importando config
const upload = require('./config/uploads');

// importando controllers
const adminController = require('./controllers/adminControlle');
const userController = require('./controllers/userController');
const sessionController = require('./controllers/sessionController');
const productController = require('./controllers/productController');
const cartController = require('./controllers/cartController');
const orderController = require('./controllers/orderController');

// admin
routes.get('/admin/find/:id', middleware.auth_admin, adminController.search); // buscando usuário pelo id
routes.get('/admin/find', middleware.auth_admin, adminController.search_all); // buscando todos os usuários
routes.get(
  '/admin/stats',
  middleware.auth_admin,
  adminController.statistic_user,
); // estatística de usuários por mês

// user
routes.post('/user/register', userController.register); // registrando usuário
routes.post('/user/edit', middleware.auth, userController.edit); // editando usuário

// session
routes.post('/session', sessionController.authenticate); // logando
routes.post('/forgout_password', sessionController.forgout_password); // enviando token para redefinir senha
routes.post('/reset_password', sessionController.reset_password); // redefinindo nova senha

// product
routes.post(
  '/products/register',
  upload.single('img'),
  middleware.auth_admin,
  productController.register,
); // registrando produto
routes.post(
  '/products/edit/:id',
  middleware.auth_admin,
  productController.edit,
); // editando produto
routes.get('/products/find/:id', productController.search); // buscando produto pelo id
routes.get('/products/find', productController.search_all); // buscando produto por categoria

// cart
routes.post('/cart/register', middleware.auth, cartController.register);
routes.post('/cart/edit/:id', middleware.auth, cartController.edit);
routes.delete('/cart/delete/:id', middleware.auth, cartController.delete);
routes.get('/cart/find/:userId', middleware.auth, cartController.search_user);
routes.get('/cart/find', middleware.auth_admin, cartController.search_admin);

// order
routes.post('/order/register', orderController.register); // registrando pedido
routes.post('/order/edit/:id', middleware.auth_admin, orderController.edit);
routes.delete(
  '/order/delete/:id',
  middleware.auth_admin,
  orderController.delete,
);
routes.get('/order/find/:userId', middleware.auth, orderController.search_user);
routes.get('/order/find', middleware.auth_admin, orderController.search_admin);
routes.get('/order/income', middleware.auth_admin, orderController.income); // obtendo rendimento mensal

module.exports = routes;
