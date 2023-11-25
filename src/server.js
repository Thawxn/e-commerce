require('dotenv').config();
const app = require('./app');

app.on('ok', () => {
  app.listen(process.env.PORT || 5000, () => {
    console.log('Acessar: http://localhost:5000');
    console.log('server running successfully.');
  });
});
