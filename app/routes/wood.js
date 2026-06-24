import express from "express";
import auth from "../middlewares/auth.js";
import multer from "../middlewares/multer.js";
import * as woodController from "../controllers/wood.js";

const router = express.Router();

router.get("/", auth, woodController.getAll);
router.post("/", auth, multer, woodController.create);
router.get("/:hardness", auth, woodController.readByHardness);

export default router;
