import express from "express";
import { ImageAnalysisController } from "../controller/ImageAnalysisController";


const router = express.Router();

// router.post("/test", ImageAnalysisController.processImage);
// router.post("/test2", ImageAnalysisController.processImage2);
// router.post("/test3", ImageAnalysisController.processImage3);
router.post("/image", ImageAnalysisController.getImage);
router.post("/brightness", ImageAnalysisController.getBrightness);
router.post("/color", ImageAnalysisController.getColors);
router.post("/shape", ImageAnalysisController.getShape);

export default router;