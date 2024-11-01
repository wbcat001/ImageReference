import express from "express";
import {ImageController} from "../controller/ImageController";
import { verifyToken } from "../middlewhere/verifyToken";

const router = express.Router();

router.put("/post", verifyToken, ImageController.addImage);

export default router;