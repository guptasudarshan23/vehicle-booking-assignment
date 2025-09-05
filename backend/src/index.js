import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import vehicles from "./routes/vehicles.js";
import bookings from "./routes/bookings.js";
import vehicleTypes from "./routes/vehicleTypes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/vehicles", vehicles);
app.use("/api/bookings", bookings);
app.use("/api/vehicle-types", vehicleTypes);

app.get("/", (req, res) => {
    res.json({ message: "Server is running " });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
