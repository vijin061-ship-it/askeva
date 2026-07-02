import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { auth_router } from "./routes/auth_route.js";
import { employee_router } from "./routes/employee_route.js";
import { analytic_router } from "./routes/analytics_route.js";



dotenv.config();

const app = express();

app.use( cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/auth", auth_router);
app.use("/api", employee_router)
app.use("/api", analytic_router)
const PORT = 5000;

app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});