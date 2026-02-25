import dotenv from 'dotenv';
import auth from './auth.ts';
import express from "express";
import { fileURLToPath } from 'node:url';
import { toNodeHandler } from "better-auth/node";
import path from 'node:path';
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../public/browser");

const start = async (): Promise<void> => {
  const authInstance = await auth.init();
  // Configure CORS middleware
  if (process.env.NODE_ENV === "development") {
    app.use(
      cors({
        origin: "http://localhost:4200", // frontend
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
      })
    );
  } else {
    app.use(
      cors({
        origin: false, // block every cross origin request
      })
    );
  }

  app.all("/api/auth/*splat", toNodeHandler(authInstance));

  app.use(express.json());

  // app.all("/api/beer/*beer", beerAPI);

  // Serve static files
  app.use(express.static("public/browser"));

  // SPA fallback (for client-side routing)
  app.get("*splat", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  app.listen(port, () => {
    console.log("Server runs on http://localhost:" + port);
  });
};

start();