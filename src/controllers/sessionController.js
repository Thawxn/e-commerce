const Yup = require('yup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const mailer = require('../modules/mail');

// logando na aplicação
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

        return res.status(200);
      })
      .catch(() => res.status(400).json({ err: 'Email não cadastrado!' }));

    return res.status(200);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// recuperação de senha
exports.forgout_password = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ err: 'Email não encontrado' });

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(user.id, {
      $set: {
        password_reset_token: token,
        password_reset_expire: now,
      },
    });

    mailer.sendMail(
      {
        to: email,
        from: 'e-commerce@gmail.com',
        template: 'auth/forgout',
        context: { token },
      },
      err => {
        if (err) {
          return res.status(400).json({
            err: 'Não foi possivel enviar email de redefinição de senha',
          });
        }

        return res.status(200);
      },
    );

    return res.status(200).json({
      ok: 'Verifique o seu email, código para redefinição de senha já foi enviado',
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// inserindo nova senha
exports.reset_password = async (req, res) => {
  const { email, token, password } = req.body;

  try {
    const user = await User.findOne({ email }).select(
      '+password_reset_token password_reset_expire',
    );

    if (!user) return res.status(400).json({ err: 'Email não encontrado' });

    if (token !== user.password_reset_token)
      return res.status(400).json({ err: 'Token Invalido' });

    const now = new Date();

    if (now > user.password_reset_expire)
      return res
        .status(400)
        .json({ err: 'Token expirado, gere um novo token' });

    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salt);

    user.password = hash;

    await user.save();

    return res.status(200).json({ ok: 'Senha redefinida' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
