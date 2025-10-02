import express from "express";
import { region_summaries, spots_by_region } from "../../sample.js";
import { pool } from "../../pool.js";
import { validateAbility } from "../middleware_val.js";
export const spotsRouter = express.Router();

spotsRouter.get("/:slug/spots", validateAbility, async (req, res) => {
  const { slug } = req.params;

  if (process.env.USE_FAKE == "0") {
    // --Checks ability is allowed, is case-sensitive, rejects if missing or incorrect
    const ability = req.validatedAbility;
    const result = await pool.query();
  } else if (process.env.USE_FAKE == "1") {
    const region_summary = region_summaries[slug];
    const spots = spots_by_region[slug] || [];
    return res.json({ region_summary, spots });
  }
});
