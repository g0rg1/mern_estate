import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controller/user.controller.js";
import { verifyAdmin } from "../middleware/auth.js";

const userRouter = new Router();

userRouter.get("/", verifyAdmin, getUsers); //GET ALL
userRouter.get("/:id", verifyAdmin, getUser); //GET One
userRouter.put("/:id", verifyAdmin, updateUser); //UPDATE
userRouter.delete("/:id", verifyAdmin, deleteUser); //DELETE

export default userRouter;
