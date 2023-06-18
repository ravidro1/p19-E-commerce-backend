const express = require("express");
const router = express.Router();

const {sigUp} = require("../controllers/userController");

router.post("/sign-up", sigUp);

module.exports = router;
