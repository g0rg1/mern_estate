import { Router } from "express";
import {
  createHouse,
  deleteHouse,
  getFeatured,
  getHouse,
  getHouses,
  updateHouse,
  getByName,
} from "../controller/house.controller.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const houseRouter = new Router();

houseRouter.get("/", getHouses);
houseRouter.get("/find/:id", verifyToken, getHouse);
houseRouter.put("/:id", verifyAdmin, updateHouse);
houseRouter.delete("/:id", verifyAdmin, deleteHouse);
houseRouter.post("/", verifyToken , createHouse);
houseRouter.get("/featured", getFeatured);
houseRouter.get("/city/:city", getByName);

export default houseRouter;
