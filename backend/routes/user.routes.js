import express from "express";
import { createUser, loginUser } from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.post("/createUser", createUser);
userRoute.post("/loginUser", loginUser);

export default userRoute;
