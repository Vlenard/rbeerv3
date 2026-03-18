import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";
import WebAuthMiddleware from "../middlewares/WebAuthMiddleware.ts";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../../public/browser");

const WebFallback = express.Router();

// Serve static files from the public/browser directory
WebFallback.use(express.static("public/browser"));

// Apply web authentication middleware, excluding sign-in, sign-up, and root paths
WebFallback.use(WebAuthMiddleware({ excludedPaths: ["/sign-in", "/sign-up", "/"] }));

// Handle all other routes by serving the index.html file
WebFallback.get("*splat", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

export default WebFallback;
