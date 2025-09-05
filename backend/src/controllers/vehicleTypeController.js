import prisma from "../prismaClient.js";

export async function getVehicleTypes(req, res) {
    try {
        const { wheels } = req.query;
        const where = {};

        if (wheels) where.wheels = parseInt(wheels, 10);

        const types = await prisma.vehicleType.findMany({
            where,
            orderBy: { id: "asc" }
        });

        return res.json(types); // always an array
    } catch (err) {
        console.error("Error fetching vehicle types:", err);
        return res.status(500).json([]); // return [] instead of object
    }
}
export async function createVehicleType(req, res) {
    try {
        const { name, wheels } = req.body;
        if (!name || !wheels) {
            return res.status(400).json({ message: "name and wheels are required" });
        }

        const type = await prisma.vehicleType.create({
            data: { name, wheels: parseInt(wheels, 10) },
        });

        res.status(201).json(type);
    } catch (err) {
        console.error("Error creating vehicle type:", err);
        res.status(500).json({ message: err.message });
    }
}
