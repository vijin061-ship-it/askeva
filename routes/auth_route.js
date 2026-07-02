import express from "express";
import { login_controller } from "../controllers/auth_controllers.js";
import { login_validation } from "../validator/validator.js";

export const auth_router = express.Router();


auth_router.post('/login', login_validation, login_controller)

