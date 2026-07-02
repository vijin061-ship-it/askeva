import express from "express";
import { authenticate_token } from "../middleware/auth.js";
import { analytics_controller } from "../controllers/analytics_controller.js";


export const analytic_router = express.Router();

analytic_router.get("/analytics", authenticate_token, analytics_controller);