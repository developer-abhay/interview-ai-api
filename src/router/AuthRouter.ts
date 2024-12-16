import express from "express";
import {
    signin,
    signup,
    verifyMe,
} from "../controllers/Auth";

export const appRouter = express.Router();

appRouter.post("/signup", signup);
appRouter.post("/signin", signin);
appRouter.post("/me", verifyMe);
