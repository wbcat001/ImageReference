import express from "express";
import { ImageRetrieveController } from "../controller/ImageRetrieveController";


const router = express.Router();
router.post("/", ImageRetrieveController.getImages);

export default router;