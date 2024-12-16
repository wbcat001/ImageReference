"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ImageRetrieveController_1 = require("../controller/ImageRetrieveController");
var router = express_1.default.Router();
router.post("/", ImageRetrieveController_1.ImageRetrieveController.getImages);
exports.default = router;
