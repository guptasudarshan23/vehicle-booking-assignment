import prisma from "../prismaClient.js";

// Create a new vehicle
export async function createVehicle(req, res) {
    try {
        const { modelName, registrationNo, vehicleTypeId } = req.body;

        if (!modelName || !vehicleTypeId) {
            return res.status(400).json({ message: "modelName and vehicleTypeId are required" });
        }

        const vehicle = await prisma.vehicle.create({
            data: {
                modelName,
                registrationNo,
                vehicleTypeId: parseInt(vehicleTypeId, 10),
            },
        });

        res.status(201).json(vehicle);
    } catch (err) {
        console.error("Error creating vehicle:", err);
        res.status(500).json({ message: err.message });
    }
}

// Get all vehicles with their types
export async function getVehicles(req, res) {
    try {
        const vehicles = await prisma.vehicle.findMany({
            include: { vehicleType: true },
        });
        res.json(vehicles);
    } catch (err) {
        console.error("Error fetching vehicles:", err);
        res.status(500).json({ message: err.message });
    }
}
