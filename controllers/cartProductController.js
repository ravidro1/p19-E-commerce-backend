const { CartProduct } = require("../models");

// [user_id, product_id]
exports.create = async (req, res) => {
  try {
    const { user_id, product_id } = req.body;

    console.log(req.body);
    const cartProduct = await CartProduct.create({
      user_id,
      product_id,
    });
    if (!cartProduct)
      return res.status(400).json({ message: "CartProduct Creation Fail" });
    res.status(200).json({ message: "success", cartProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
