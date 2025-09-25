import dotenv from "dotenv";
import express from "express";
import cors from "cors";
// import { regionRouter } from "./src/routes/region_route.js";
// import { spotsRouter } from "./src/routes/slug_route.js";

let envFile;

if (process.env.NODE_ENV == "production") {
  envFile = ".env.production";
} else if (process.env.NODE_ENV == "development") {
  envFile = ".env.development";
}

dotenv.config({ path: envFile });

const { regionRouter } = await import("./src/routes/region_route.js"); //need to wait for env file to load for pool obj (imports go straigh to first)
const { spotsRouter } = await import("./src/routes/slug_route.js");

const app = express();

app.use(cors());

app.use("/regions", regionRouter);
app.use("/regions", spotsRouter);

// app.get("/test", async (req, res) => {
//   const result = await pool.query("SELECT region_name FROM regions");
//   res.json(result.rows);
// });

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(3000, () => console.log("Backend connected"));
