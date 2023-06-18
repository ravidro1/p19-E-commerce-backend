const cors = require("cors");
const express = require("express");
require("dotenv").config();
const db = require("./models");
const app = express();
const PORT = process.env.PORT;

const userRoutes = require("./routes/userRoutes");
app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log("Listen To Port:", PORT));
});
