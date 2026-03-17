import dotenv from "dotenv";
import db from "./Db.ts";
import express from "express";
import corsMiddleware from "./middlewares/CorsMiddleware.ts";
import api from "./API.ts";
import WebFallback from "./routes/WebFallback.ts";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const start = async (): Promise<void> => {
    // Connect to DB
    await db();

    // Configure CORS middleware
    app.use(corsMiddleware);

    // Parse JSON bodies
    app.use(express.json());

    //Rbeer api
    app.use("/api", api);

    // SPA fallback (for client-side routing)
    app.use(WebFallback);

    app.listen(port, () => {
        console.log("Server runs on http://localhost:" + port);
    });
};

start();
