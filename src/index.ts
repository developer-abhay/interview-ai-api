import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/v1", () => {
    console.log('hello')
});

const port = process.env.BACKEND_PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port : ${port}`);
});