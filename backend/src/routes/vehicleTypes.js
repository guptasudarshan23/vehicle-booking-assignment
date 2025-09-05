import express from "express";
import { getVehicleTypes, createVehicleType } from "../controllers/vehicleTypeController.js";

const router = express.Router();

router.get("/", getVehicleTypes);
router.post("/", createVehicleType);

export default router;
