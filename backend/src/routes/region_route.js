import express from "express";
import { region_data } from "../../sample_regions_list.js";
import { pool } from "../../pool.js";
export const regionRouter = express.Router();
import { isEligible, computeScore, rank } from "../helpers.js";
import { validateMonth, validateAbility } from "../middleware_val.js";

regionRouter.get("/", validateMonth, validateAbility, async (req, res) => {
  if (process.env.USE_FAKE == "0") {
    // --- Checks Month using validateMonth is an integer between 1 and 12 ---
    const month = req.validatedMonth;

    // --- Checks ability is allowed, is case-sensitive, rejects if missing or incorrect ---
    const ability = req.validatedAbility;

    try {
      const result = await pool.query(
        "SELECT * FROM vw_regions_month_counts WHERE month = $1",
        [month]
      );

      const eligible = result.rows.filter((row) => isEligible(row, ability));

      const scored = eligible.map((row) => {
        const { score, q_count, s_count, explanation } = computeScore(
          row,
          ability
        );
        return {
          region_id: row.region_id,
          region_slug: row.region_slug,
          region_name: row.region_name,
          country: row.country,
          lat: row.lat,
          lon: row.lon,
          score,
          q_count,
          s_count,
          has_beach: row.has_beach_any_count > 0,
          windiness: row.windiness,
          wetsuit: row.wetsuit,
          air_temp_c: row.air_temp_c,
          water_temp_c: row.water_temp_c,
          explanation,
        };
      });
      const ranked = rank(scored);
      return res.json(ranked);
    } catch (err) {
      return res.status(500).json({ error: "Internal Database Error" });
    }
  } else if (process.env.USE_FAKE == "1") {
    return res.json(region_data);
  }
});

// if first time then swell in small/med, q_spot_firstime >= 1
// if beginner then check swell is in small or medium, q_spot_b >= 1, has_beach_any >=1, then return everything
// if int then check q_spot_i >= 1
// if adv then swell in med,large, q_spot_i >= 1

/* REMOVED CODE
// import fs from "fs";
    // const reg_query = fs.readFileSync(
    //   "../db/queries/region_month_countsV2.sql", // readFileSync works relative to the working dir (here assumes from Backend) not the file like imports do
    //   "utf-8"
    // );

    if (ability == "FIRSTTIME") {
      const qualified = result.rows.filter(
        (row) =>
          ["small", "medium"].includes(row.swell) && row.q_count_firsttime >= 1
      );
      return res.json(qualified);
    } else if (ability == "BEGINNER") {
      const qualified = result.rows.filter(
        (row) =>
          ["small", "medium"].includes(row.swell) &&
          row.q_count_b >= 1 &&
          row.has_beach_any_count >= 1
      );
      return res.json(qualified);
    } else if (ability == "INTERMEDIATE") {
      const qualified = result.rows.filter((row) => row.q_count_i >= 1);
      return res.json(qualified);
    } else if (ability == "ADVANCED") {
      const qualified = result.rows.filter(
        (row) => ["medium", "large"].includes(row.swell) && row.q_count_a >= 1
      );
      return res.json(qualified);
    }

*/
