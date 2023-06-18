const cors = require("cors");
const express = require("express");
require("dotenv").config();
const db = require("./models");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }));

const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log("Listen To Port:", PORT));
});
