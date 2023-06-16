import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
// import { db } from "./database";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const sqlStatement = "";
    // await db.query();
    res.send("success");
  } catch (error) {
    res.send("fail");
  }
});

const createTable = (req, res) => {};

app.listen(PORT, () => console.log("Listen To Port:", PORT));
