"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../controller/AuthController");
var router = express_1.default.Router();
router.post("/login", AuthController_1.AuthController.login);
router.post("/register", AuthController_1.AuthController.register);
router.post("/logout", AuthController_1.AuthController.logout);
exports.default = router;
