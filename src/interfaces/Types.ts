import { Request } from "express";

export type User = {
    userId: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
};


export interface CustomRequest extends Request {
    verifiedEmail?: string;
}