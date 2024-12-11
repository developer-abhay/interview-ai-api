import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { validateUserInput } from "../utils/Validation";
import { User } from "../interfaces/Types";
import { createUser, findUserByEmail } from "../db/Dynamo";
dotenv.config();

// SignUp Handler
export const signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    try {
        // Validate user inputs
        validateUserInput("signup", { email, password, name });

        // Check if user with email already exists
        const existinguser = await findUserByEmail(email);

        if (existinguser) {
            res.status(409).json({ message: "User Already Exists" });
            return;
        }

        //  Create a new user
        const hashedPassword = await bcrypt.hash(password, 10);

        const user: User = {
            userId: uuidv4(),
            name,
            email,
            password: hashedPassword,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        await createUser(user);

        res.status(200).json({ message: "User registered Successfully" });
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.error("Error during signup: ", err.message);
            res.status(500).json({ message: err.message });
        } else {
            console.error("Unexpected error during signup: ", err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
};

// SignIn Handler
export const signin = async (req: Request, res: Response) => {
    res.status(200).json({ message: "Signin successful" });
};