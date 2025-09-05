import { Router } from "express";
import { createVehicle, getVehicles } from "../controllers/vehicleController.js";

const router = Router();

router.post("/", createVehicle);   // Add a new vehicle
router.get("/", getVehicles);      // Get all vehicles

export default router;
