import express from "express";
import { sample_region_details } from "../../sample_region_detail.js";
import { pool } from "../../pool.js";
import {
  validateMonth,
  validateAbility,
  validateFormat,
} from "../middleware_val.js";
export const spotsRouter = express.Router();
import { isQualifying, hasAnyBeach, buildExplanation } from "../helpers.js";

spotsRouter.get(
  "/:slug/spots",
  validateMonth,
  validateAbility,
  validateFormat,
  async (req, res) => {
    // --- Check Slug is in correct format ---
    const slug = req.validatedFormat;

    // --- Checks Month using validateMonth is an integer between 1 and 12 ---
    const month = req.validatedMonth;

    // --- Checks ability is allowed, is case-sensitive, rejects if missing or incorrect ---
    const ability = req.validatedAbility;

    if (process.env.USE_FAKE == "0") {
      try {
        const regionResult = await pool.query(
          "SELECT region_id, region_slug, region_name, country, description, lat, lon FROM regions WHERE region_slug = $1",
          [slug]
        );
        if (regionResult.rows.length === 0) {
          return res.status(404).json({ error: `slug ${slug} does not exist` });
        }
        let region_summary = regionResult.rows[0];
        const region_id = region_summary.region_id;

        const seasonalityResult = await pool.query(
          "SELECT swell, windiness, air_temp_c, water_temp_c, wetsuit FROM seasonality WHERE region_id = $1 AND month = $2",
          [region_id, month]
        );

        if (seasonalityResult.rows.length === 0) {
          return res.status(404).json({
            error: `No seasonality for slug ${slug} in month ${month}`,
          });
        }

        region_summary = { ...region_summary, ...seasonalityResult.rows[0] };

        const spotsResult = await pool.query(
          "SELECT spot_id, spot_slug, name, level, type, sheltered, description, lat, lon FROM spots WHERE region_id = $1",
          [region_id]
        );

        const assessedSpots = spots.map((row) => {
          let qualifying = isQualifying(row, ability);
          return { ...row, qualifying };
        });

        const q_count = assessedSpots.reduce(
          (acc, x) => acc + (x.qualifying === true ? 1 : 0),
          0
        );

        const s_count = assessedSpots.reduce(
          (acc, x) => acc + (x.sheltered && x.qualifying === true ? 1 : 0),
          0
        );

        const has_beach = hasAnyBeach(assessedSpots);

        const spot_count = assessedSpots.length;

        region_summary.explanation = buildExplanation({
          region_name: region_summary.region_name,
          month,
          ability,
          qCount: q_count,
          sCount: s_count,
        });

        Object.assign(region_summary, {
          q_count,
          s_count,
          has_beach,
          spot_count,
        });

        const spots = assessedSpots;

        return res.json({ region_summary, spots });
      } catch (err) {
        console.error("GET /regions/:slug/spots failed", {
          slug,
          month,
          ability,
          err: err.message,
        });
        return res.status(500).json({ error: "Internal Database Error" });
      }
    } else if (process.env.USE_FAKE == "1") {
      const region_summary = sample_region_details[slug].region_summary;
      const spots = sample_region_details[slug].spots || [];
      return res.json({ region_summary, spots });
    }
  }
);
