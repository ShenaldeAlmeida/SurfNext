import express from "express";
import { region_data } from "../../sample.js";

export const regionRouter = express.Router();

regionRouter.get("/", (req, res) => {
  res.json(region_data);
});
