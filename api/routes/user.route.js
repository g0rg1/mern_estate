import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controller/user.controller.js";
import { verifyAdmin } from "../middleware/auth.js";

const userRouter = new Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", verifyAdmin, getUser);
userRouter.put("/:id", verifyAdmin, updateUser);
userRouter.delete("/:id", verifyAdmin, deleteUser);

export default userRouter;
