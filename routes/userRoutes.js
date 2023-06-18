const express = require("express");
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");

const {
  sigUp,
  login,
  refreshToken,
  logout,
} = require("../controllers/userController");

const jwtVerify = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    console.error(token, 1);
    if (!token) return res.status(401).json({ message: "Token Required" });
    else {
      jsonwebtoken.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
          if (err) {
            res.status(401).json({ message: "Token Wrong" });
          } else {
            req.userID = decoded.user_id;
            next();
          }
        }
      );
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

router.post("/sign-up", sigUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh-token", refreshToken);
router.get("/isTokenValid", jwtVerify, (req, res) => {
  res.status(200).json({ message: "TokenValid" });
});

router.get("/test", jwtVerify, (req, res) => {
  res.status(200).json({ message: "test-success" });
});

module.exports = router;
