import { Request } from "express";

export interface AuthorizedRequest extends Request {
    user: {
        id: string,
        name: string,
        email: string
    };
}
