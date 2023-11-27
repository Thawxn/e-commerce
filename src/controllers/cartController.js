const Cart = require('../models/Cart');

// inserindo produto no carrinho
exports.register = async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();

    return res.status(200).json(savedCart);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// editando produto no carrinho
exports.edit = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true },
    );

    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// deletando produto no carrinho
exports.delete = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).json({ ok: 'produto deletado do carrinho.' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// listando produtos
exports.search_user = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });

    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// listando produtos
exports.search_admin = async (req, res) => {
  try {
    const cart = await Cart.find();

    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
};
