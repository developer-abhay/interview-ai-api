import express from "express";
import {
    signin,
    signup,
} from "../controllers/Auth";

export const appRouter = express.Router();

appRouter.post("/signup", signup);
appRouter.post("/signin", signin);
