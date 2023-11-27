const Yup = require('yup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// eslint-disable-next-line consistent-return
exports.authenticate = async (req, res) => {
  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const { email, password } = req.body;

  if (!(await schema.isValid(req.body))) {
    return res
      .status(400)
      .json({ err: 'preencha todas as campos corretamente!' });
  }

  try {
    await User.findOne({ email })
      // eslint-disable-next-line consistent-return
      .then(data => {
        if (data !== undefined) {
          const correct = bcrypt.compareSync(password, data.password);

          if (correct) {
            const token = jwt.sign(
              { id: data._id, is_admin: data.is_admin },
              process.env.JWT_SEC,
              { expiresIn: '25h' },
            );

            // eslint-disable-next-line no-unused-vars, no-shadow
            const { password, ...others } = data._doc;

            return res.status(200).json({ others, token });
          }
          return res.status(400).json({ err: 'Email ou Senha incorreta!' });
        }
      })
      .catch(() => res.status(400).json({ err: 'Email não cadastrado!' }));
  } catch (err) {
    return res.status(500).json(err);
  }
};
