const { Product } = require("../models");
const { uploadImage, deleteImage } = require("../cloudinaty");

// [name, description?, picURL?, price?, quantity?]
exports.create = async (req, res) => {
  try {
    const { name, description, imageData, price, quantity } = req.body;

    const validQuantity = quantity == null ? 0 : quantity;

    let product = await Product.create({
      name,
      description,
      price,
      quantity: validQuantity,
    });
    if (!product)
      return res.status(400).json({ message: "Product Creation Fail" });

    if (imageData != null) {
      const productID = product.dataValues.id;
      const picURL = await uploadImage(imageData, productID);
      await Product.update({ picURL }, { where: { id: productID } });
      product = await Product.findByPk(productID);
    }

    res.status(200).json({ message: "success", product: product.dataValues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message });
  }
};

// []
exports.getAll = async (req, res) => {
  try {
    const products = await Product.findAll();

    console.log(products);
    if (products == null) return res.status(400).json({ message: "Fail" });
    res.status(200).json({ message: "success", products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message });
  }
};

// [id, name?, description?, picURL?, price?, quantity?]
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.body;

    const updateFields = {};

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] != null && key != "id")
        updateFields[key] = req.body[key];
    });

    await Product.update(updateFields, { where: { id } });

    const product = await Product.findByPk(productID);

    console.log(product);

    if (product == null) return res.status(400).json({ message: "Fail" });

    res.status(200).json({ message: "success", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message });
  }
};

// [id]
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;

    const { result } = await deleteImage(id);
    console.log(result);

    res.status(200).json({ message: "success", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message });
  }
};
