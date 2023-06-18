import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql
  .createPool({
    host: process.env.MY_SQL_HOST,
    user: process.env.MY_SQL_USER,
    password: process.env.MY_SQL_PASSWORD,
    database: "node_ecommerce",
    port: 3306,
  })
  .promise();
