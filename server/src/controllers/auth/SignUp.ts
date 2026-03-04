import type { Request, Response } from "express";

const SignUp = async (req: Request, res: Response): Promise<void> => {
    res.status(200);
    res.json({message: "Sign up successful"})
    res.end();
    res.send();
};

export default SignUp;
