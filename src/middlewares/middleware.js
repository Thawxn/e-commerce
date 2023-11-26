require('dotenv').config();

const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.auth = async (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status('401').json({ err: 'Token não autorizado.' });
  }

  const [, token] = tokenHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SEC);

    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status('401').json({ err: 'Token inválido.' });
  }
};
