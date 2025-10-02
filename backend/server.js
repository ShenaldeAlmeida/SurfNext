// --- To load and swap between env variables ---
import dotenv from "dotenv";
//--- To works under the hood in Node for API requests ---
import express from "express";
//---
import cors from "cors";

// --- Checks if we are in dev or production and loads related environment variables ---
let envFile;

if (process.env.NODE_ENV == "production") {
  envFile = ".env.production";
} else if (process.env.NODE_ENV == "development") {
  envFile = ".env.development";
}

dotenv.config({ path: envFile });

// --- Loads Region and Spots routes eg actions done when API calls regions or spots ---
const { regionRouter } = await import("./src/routes/region_route.js"); // need to wait for env file to load for pool obj (imports go straight to first)
const { spotsRouter } = await import("./src/routes/slug_route.js");

// --- Creates express obj instance- --
const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGINS.split(",") }));

// --- Response for GET request with /regions ---
app.use("/regions", regionRouter);
app.use("/regions", spotsRouter);

// --- Checks Backend responds to calls - responds with status: ok JSON if GET request /health is sent ---
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// --- Backend opens up on port set by env
app.listen(Number(process.env.PORT), () => console.log("Backend connected"));

/* REMOVED CODE 
 app.get("/test", async (req, res) => {
   const result = await pool.query("SELECT region_name FROM regions");
   res.json(result.rows);
 });
*/
