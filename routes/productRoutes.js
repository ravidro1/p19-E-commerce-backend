const express = require("express");
const router = express.Router();

const { create } = require("../controllers/productController");

const adminAuth = () => {};

router.post("/create", create);

module.exports = router;
