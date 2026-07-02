import express from "express";
import { authenticate_token } from "../middleware/auth.js";
import { get_all_employees_controller, create_employee_controller, update_employee_controller, delete_employee_controller } from "../controllers/employee_controllers.js";


export const employee_router = express.Router();


employee_router.get('/employee', authenticate_token, get_all_employees_controller)
employee_router.post("/employee", authenticate_token, create_employee_controller);
employee_router.put("/employee/:id", authenticate_token, update_employee_controller);
employee_router.delete("/employee/:id", authenticate_token, delete_employee_controller);

