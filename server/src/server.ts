import dotenv from "dotenv";
import db from "./db.ts";
import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import AuthRoutes from "./routes/AuthRoutes.ts";
import BeerRoutes from "./routes/BeerRoutes.ts";
import UserRoutes from "./routes/UserRoutes.ts";
import corsMiddleware from "./middlewares/CorsMiddleware.ts";
import AuthMiddleware from "./middlewares/AuthMiddleware.ts";


dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../public/browser");

const start = async (): Promise<void> => {
    // Connect to DB
    await db.connect();

    // Configure CORS middleware
    app.use(corsMiddleware);

    // Parse JSON bodies
    app.use(express.json());

    // Serve static files
    app.use(express.static("public/browser"));

    // Auth routes
    app.use("/api/auth/", AuthRoutes);

    // User routes
    app.use("/api/user/", AuthMiddleware, UserRoutes);

    // Beer routes
    app.use("/api/beer/", AuthMiddleware, BeerRoutes);

    // SPA fallback (for client-side routing)
    app.get("*splat", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });

    app.listen(port, () => {
        console.log("Server runs on http://localhost:" + port);
    });
};

start();
