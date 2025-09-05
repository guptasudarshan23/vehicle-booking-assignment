-- CreateTable
CREATE TABLE "VehicleType" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "wheels" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelName" TEXT NOT NULL,
    "registrationNo" TEXT,
    "vehicleTypeId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Vehicle_vehicleTypeId_fkey" FOREIGN KEY ("vehicleTypeId") REFERENCES "VehicleType" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "vehicleId" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Booking_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Vehicle" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
