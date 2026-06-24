import express from "express";
import auth from "../middlewares/auth.js";
import * as woodController from "../controllers/wood.js";

const router = express.Router();

router.get("/", auth, woodController.getAll);
router.get("/:hardness", auth, woodController.readByHardness);

export default router;
