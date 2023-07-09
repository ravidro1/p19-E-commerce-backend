const express = require("express");
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");

const {
  signUp,
  adminSignUp,
  login,
  refreshToken,
  logout,
  getUserInfo,
} = require("../controllers/userController");
const { User } = require("../models");

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
            req.isAdmin = decoded.isAdmin;
            next();
          }
        }
      );
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

router.post("/sign-up", signUp);
router.post("/admin-sign-up", adminSignUp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh-token", refreshToken);
router.get("/get-user-info", jwtVerify, getUserInfo);

router.get("/", async (req, res) => {
  const userFunc = await User.findByPk(1);
  res.send(userFunc.getFullName());
});

router.get("/isTokenValid", jwtVerify, (req, res) => {
  res.status(200).json({ message: "TokenValid" });
});

module.exports = router;
