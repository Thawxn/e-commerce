// dotenv
require('dotenv').config();

const Yup = require('yup');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// registrando usuario
exports.register = async (req, res) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    last_name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string().required(),
    phone: Yup.number().required(),
  });
  const { name, last_name, email, password, phone } = req.body;

  if (!(await schema.isValid(req.body))) {
    return res
      .status(400)
      .json({ err: 'preencha todas as campos corretamente!' });
  }

  try {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      name,
      last_name,
      email,
      password: hash,
      phone,
    });
    return res.status(201).json({ success: newUser });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// editando
exports.edit = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user_id,
      {
        $set: req.body,
      },
      { new: true },
    );

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
};
