// src/pages/BookingDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBookingById } from "../services/api";

export default function BookingDetails() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        getBookingById(id)
            .then(setBooking)
            .catch((err) => {
                console.error(err);
                setError("Failed to fetch booking details");
            });
    }, [id]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!booking) return <p>Loading booking details...</p>;

    return (
        <div className="max-w-lg mx-auto p-6 border rounded-lg shadow-md bg-white">
            <h1 className="text-xl font-bold mb-4">Booking Details</h1>

            <p><strong>Name:</strong> {booking.firstName} {booking.lastName}</p>
            <p><strong>Vehicle:</strong> {booking.vehicle?.modelName || "N/A"}</p>
            <p><strong>Type:</strong> {booking.vehicle?.vehicleType?.name || "N/A"}</p>
            <p><strong>Start Date:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
            <p><strong>End Date:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
            <p><strong>Created:</strong> {new Date(booking.createdAt).toLocaleString()}</p>

            <div className="mt-4">
                <Link to="/" className="text-blue-500 underline">← Back to Home</Link>
            </div>
        </div>
    );
}
