import express from "express"
import { toNodeHandler } from "better-auth/node";
import auth from "./auth.ts";
import { beerAPI } from "./routes/beerRoutes.ts";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../public/browser");

const init = () => {

    app.use(express.json());

    //@ts-ignore
    app.all("/api/auth/*auth", toNodeHandler(auth));
    app.all("/api/beer/*beer", beerAPI);

    // Serve static files
    app.use(express.static("public/browser"));

    // SPA fallback (for client-side routing)
    app.get("*any", (req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
    });
};

const listen = () => {

    app.listen(port, () => {
        console.log("Server runs on http://localhost:" + port);
    });

};


export default {
    init,
    listen
}