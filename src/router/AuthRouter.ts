import express from "express";
import {
    signin,
    signup,
    verifyMe,
} from "../controllers/Auth";
import { verifyCookies } from "../middlewares/AuthMiddleware";

export const appRouter = express.Router();

appRouter.post("/signup", signup);
appRouter.post("/signin", signin);
appRouter.get("/me", verifyCookies, verifyMe);
