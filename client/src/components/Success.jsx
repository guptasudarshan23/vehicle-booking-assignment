import React from 'react'

export default function Success({ booking }) {
    return (
        <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Booking Confirmed ✅</h2>
            <p className="text-gray-700">
                {booking.firstName} {booking.lastName}, your vehicle has been booked from{' '}
                <strong>{booking.startDate.slice(0, 10)}</strong> to{' '}
                <strong>{booking.endDate.slice(0, 10)}</strong>.
            </p>
        </div>
    )
}
