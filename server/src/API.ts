import express from "express";
import AuthRoutes from "./routes/AuthRoutes.ts";
import BeerRoutes from "./routes/BeerRoutes.ts";
import UserRoutes from "./routes/UserRoutes.ts";
import AuthMiddleware from "./middlewares/AuthMiddleware.ts";

const api = express.Router();

api.use("/auth", AuthRoutes);

api.use("/beer", AuthMiddleware,  BeerRoutes);

api.use("/user", AuthMiddleware, UserRoutes);

export default api;
