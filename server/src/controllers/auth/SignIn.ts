import type { Request, Response } from "express";
import { User } from "../../models/User.ts";
import jwt from "jsonwebtoken";

const SignIn = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid email" });
            return;
        }
        if (password !== user.password) {
            res.status(400).json({ message: "Invalid password" });
            return;
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.AUTH_SECRET || "AJvw41oSr7egeiPskljadflaGBF5BBlU",
            { expiresIn: "1d" },
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export default SignIn;
