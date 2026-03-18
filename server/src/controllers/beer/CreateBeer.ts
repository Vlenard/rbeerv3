import type { Response } from "express";
import type { BeerRequest } from "../../interfaces/BeerRequest";
import type { AuthRequest } from "../../interfaces/AuthRequest";
import { Beer } from "../../models/Beer.ts";

/*
 * Create a beer
 * Path(POST: api/beer/)
 */
const CreateBeer = async (req: BeerRequest, res: Response): Promise<void> => {
    try {
        const newBeer = await Beer.create({
            ...req.body,
            owner: req.user.id,
        });

        res.status(201).json(newBeer).end();
    } catch (error: any) {
        res.status(400).json({ message: error.message, user: req.user }).end();
    }
};

export default CreateBeer;
