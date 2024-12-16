import express from "express";
import { ImageAnalysisController } from "../controller/ImageAnalysisController";


const router = express.Router();

router.post("/test", ImageAnalysisController.processImage);
router.post("/test2", ImageAnalysisController.processImage2);

export default router;