import express from "express";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../public/browser");

const WebFallback = express.Router();

WebFallback.use(express.static("public/browser"));

WebFallback.get("*splat", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

export default WebFallback;
