"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ImageController_1 = require("../controller/ImageController");
var verifyToken_1 = require("../middlewhere/verifyToken");
var router = express_1.default.Router();
router.post("/add", verifyToken_1.verifyToken, ImageController_1.ImageController.addImage);
router.post("/", verifyToken_1.verifyToken, ImageController_1.ImageController.getImage);
exports.default = router;
