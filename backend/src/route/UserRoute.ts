import express from "express";
import {UserController} from "../controller/UserController";
import { verifyToken } from "../middlewhere/verifyToken";

const router = express.Router();

router.get("/", UserController.getUser);
router.put("/:id", verifyToken, UserController.updateUser)