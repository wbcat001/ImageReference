"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ImageAnalysisController_1 = require("../controller/ImageAnalysisController");
var router = express_1.default.Router();
router.post("/test", ImageAnalysisController_1.ImageAnalysisController.processImage);
exports.default = router;
