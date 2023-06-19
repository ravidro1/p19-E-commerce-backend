const express = require("express");
const router = express.Router();

const { create } = require("../controllers/cartProductController");

router.post("/create", create);

module.exports = router;
