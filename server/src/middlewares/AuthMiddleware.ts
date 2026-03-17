import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../interfaces/requests/AuthRequest.d.ts";
import jwt from "jsonwebtoken";

const AuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {

    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Access denied. No token provided." });
        return;
    }

    try {
        const secret = process.env.AUTH_SECRET || "AJvw41oSr7egeiPskljadflaGBF5BBlU";
        const decoded = jwt.verify(token, secret);

        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or expired token." });
    }
};

export default AuthMiddleware;
