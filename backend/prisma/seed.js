
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...");

    // Clear existing data (optional, helps prevent duplicates)
    await prisma.booking.deleteMany().catch(() => { });
    await prisma.vehicle.deleteMany().catch(() => { });
    await prisma.vehicleType.deleteMany().catch(() => { });

    // VehicleType Creation
    const bike = await prisma.vehicleType.create({
        data: { name: "Bike", wheels: 2 }
    });

    const car = await prisma.vehicleType.create({
        data: { name: "Car", wheels: 4 }
    });

    const suv = await prisma.vehicleType.create({
        data: { name: "SUV", wheels: 4 }
    });

    // Vehicle Creation
    await prisma.vehicle.createMany({
        data: [
            { modelName: "Yamaha MT-15", vehicleTypeId: bike.id },
            { modelName: "Honda Activa", vehicleTypeId: bike.id },
            { modelName: "Maruti Swift", vehicleTypeId: car.id },
            { modelName: "Hyundai i20", vehicleTypeId: car.id },
            { modelName: "Mahindra XUV500", vehicleTypeId: suv.id },
        ]
    });

    console.log("✅ Seeding complete");
}

main()
    .catch((e) => {
        console.error("❌ Error seeding:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
