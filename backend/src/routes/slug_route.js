import express from "express";
import { region_summaries, spots_by_region } from "../../sample.js";

export const spotsRouter = express.Router();

spotsRouter.get("/:slug/spots", (req, res) => {
  const { slug } = req.params;
  const region_summary = region_summaries[slug];
  const spots = spots_by_region[slug] || [];
  res.json({ region_summary, spots });
});
