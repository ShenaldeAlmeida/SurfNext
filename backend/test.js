import dotenv from "dotenv";
import express from "express";
import cors from "cors";

let envFile;

if (process.env.NODE_ENV == "production") {
  envFile = ".env.production";
} else if (process.env.NODE_ENV == "development") {
  envFile = ".env.development";
}

dotenv.config({ path: envFile });

const { pool } = await import("./pool.js");

const app = express();

app.use(cors());

app.get("/apitest", async (req, res) => {
  const result = await pool.query("SELECT region_slug from regions");
  console.log(result.rows);
  res.json(result.rows);
});

app.listen(3000, () => console.log("Backend connected"));
