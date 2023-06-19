const cors = require("cors");
const express = require("express");
require("dotenv").config();
const db = require("./models");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartProductRoutes = require("./routes/cartProductRoutes");
app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cartProduct", cartProductRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log("Listen To Port:", PORT));
});
