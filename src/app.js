require('dotenv').config();

// importando frameworks e bibliotecas
const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// importando rota da minha aplicação
const routes = require('./routes');

// conectando ao banco de dados do mongoose
mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to the database.');
    app.emit('ok');
  })
  .catch(err => {
    console.log('error when trying to connect to the database: ', err);
  });

// body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// permitindo rotas
app.use(routes);

module.exports = app;
