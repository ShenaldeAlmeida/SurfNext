import express from "express";
import cors from "cors";
import { regionRouter } from "./src/routes/region_route.js";
import { spotsRouter } from "./src/routes/slug_route.js";

const app = express();

app.use(cors());

app.use("/regions", regionRouter);
app.use("/regions", spotsRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => console.log("Backend connected"));
