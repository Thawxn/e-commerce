const Product = require('../models/Product');

// registrando produto
exports.register = async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();

    return res.status(200).json(savedProduct);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// editando produto
exports.edit = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true },
    );

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// listando produtos
exports.search = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// listando todos usuario
exports.search_all = async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let product;

    if (qNew) {
      product = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      product = await Product.find({ categories: { $in: [qCategory] } });
    } else {
      product = await Product.find();
    }

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
};
