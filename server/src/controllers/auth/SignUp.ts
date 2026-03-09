import type { Request, Response } from "express";
import { User } from "../../models/User.ts";
import jwt from "jsonwebtoken";

const SignUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            process.env.AUTH_SECRET || "AJvw41oSr7egeiPskljadflaGBF5BBlU",
            { expiresIn: "1d" },
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export default SignUp;
