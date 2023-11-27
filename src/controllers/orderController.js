const Order = require('../models/Order');

// inserindo pedidos
exports.register = async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();

    return res.status(200).json(savedOrder);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// editando produto no carrinho - admin
exports.edit = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true },
    );

    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// deletando produto no carrinho - admin
exports.delete = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    return res.status(200).json({ ok: 'produto deletado do carrinho.' });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// listando produtos
exports.search_user = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.id });

    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// listando produtos - admin
exports.search_admin = async (req, res) => {
  try {
    const orders = await Order.find();

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// obtendo um rendimento mensal
exports.income = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: '$createdAt' },
          sales: '$amount',
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: '$sales' },
        },
      },
    ]);

    return res.status(200).json(income);
  } catch (err) {
    return res.status(500).json(err);
  }
};
