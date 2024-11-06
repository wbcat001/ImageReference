import express from "express";
import {ImageController} from "../controller/ImageController";
import { verifyToken } from "../middlewhere/verifyToken";

const router = express.Router();

router.post("/add", verifyToken, ImageController.addImage);
router.post("/", verifyToken, ImageController.getImage);

export default router;