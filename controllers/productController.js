const { Product } = require("../models");

// [name, description, picURL, price, rating]
exports.create = async (req, res) => {
  try {
    const { name, description, picURL, price, rating } = req.body;

    console.log(req.body);
    const product = await Product.create({
      name,
      description,
      picURL,
      price,
      rating,
    });
    if (!product)
      return res.status(400).json({ message: "Product Creation Fail" });
    res.status(200).json({ message: "success", product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
