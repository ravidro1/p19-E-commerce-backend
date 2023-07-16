const express = require("express");
const router = express.Router();
const jsonwebtoken = require("jsonwebtoken");

const {
  create,
  getAll,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const adminAuth = (req, res, next) => {
  console.log("Need adminAuth");

  try {
    const token = req.headers["x-access-token"];

    console.error(token, 2);
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

            if (!decoded.isAdmin)
              return res.status(401).json({ message: "Unauthorized" });
            else next();
          }
        }
      );
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

router.post("/create", adminAuth, create);
router.get("/getAll", getAll);
router.post("/updateProduct", adminAuth, updateProduct);
router.delete("/deleteProduct", deleteProduct);

module.exports = router;
