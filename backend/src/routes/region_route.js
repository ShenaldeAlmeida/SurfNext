import express from "express";
// import fs from "fs";
import { region_data } from "../../sample.js";
import { pool } from "../../pool.js";

export const regionRouter = express.Router();

regionRouter.get("/", async (req, res) => {
  if (process.env.USE_FAKE == 0) {
    const month = req.query.month;
    // const reg_query = fs.readFileSync(
    //   "../db/queries/region_month_countsV2.sql", // readFileSync works relative to the working dir (here assumes from Backend) not the file like imports do
    //   "utf-8"
    // );
    const result = await pool.query(
      "SELECT * FROM vw_regions_month_counts WHERE month = $1",
      [month]
    );
    return res.json(result.rows);
  } else if (process.env.USE_FAKE == 1) {
    return res.json(region_data);
  }
});
