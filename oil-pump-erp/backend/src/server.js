import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";

const server = http.createServer(app);

connectDB().then(() => {
  server.listen(env.PORT, () => {
    console.log(`✅ API running on http://localhost:${env.PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to connect DB", err);
  process.exit(1);
});
