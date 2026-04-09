import dotenv from "dotenv";
dotenv.config();

import express from "express";
import UserRoute from "../src/route/route.users.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", UserRoute);

export default app;
