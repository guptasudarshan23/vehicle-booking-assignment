import prisma from "../prismaClient.js";

function parseDateOnlyToISO(dateStr) {
    return new Date(dateStr + "T00:00:00.000Z");
}

export async function createBooking(req, res) {
    try {
        const { firstName, lastName, vehicleId, startDate, endDate } = req.body;
        if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
            return res.status(400).json({ message: "Missing fields" });
        }

        const start = parseDateOnlyToISO(startDate);
        const end = parseDateOnlyToISO(endDate);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return res.status(400).json({ message: "Invalid date format (YYYY-MM-DD)" });
        }
        if (start > end) {
            return res.status(400).json({ message: "startDate must be <= endDate" });
        }

        const result = await prisma.$transaction(async (tx) => {
            const conflict = await tx.booking.findFirst({
                where: {
                    vehicleId: parseInt(vehicleId, 10),
                    NOT: [
                        { endDate: { lt: start } },
                        { startDate: { gt: end } }
                    ]
                }
            });

            if (conflict) return { conflict: true };

            const booking = await tx.booking.create({
                data: {
                    vehicleId: parseInt(vehicleId, 10),
                    firstName,
                    lastName,
                    startDate: start,
                    endDate: end
                }
            });

            return { booking };
        });

        if (result.conflict) {
            return res.status(409).json({ message: "Vehicle already booked for those dates" });
        }

        res.status(201).json(result.booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export async function getBookings(req, res) {
    try {
        const bookings = await prisma.booking.findMany({
            include: { vehicle: true }
        });
        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

export async function getBookingById(req, res) {
    try {
        const { id } = req.params;
        const booking = await prisma.booking.findUnique({
            where: { id: parseInt(id, 10) },
            include: { vehicle: { include: { vehicleType: true } } }
        });

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.json(booking);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

