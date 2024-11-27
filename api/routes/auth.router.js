import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyUser,
} from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/auth.js";

const authRouter = new Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", logout);
authRouter.post("/", verifyToken, verifyUser);

export default authRouter;
