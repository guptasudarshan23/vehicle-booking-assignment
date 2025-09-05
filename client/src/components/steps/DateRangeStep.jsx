import React, { useState } from 'react'
import { createBooking } from '../../services/api'

export default function DateRangeStep({
    data,
    updateData,
    back,
    setSuccessData
}) {
    const [error, setError] = useState('')

    const handleSubmit = async () => {
        if (!data.startDate || !data.endDate) {
            setError('Please select both start and end date')
            return
        }
        setError('')
        try {
            const booking = await createBooking(data)
            setSuccessData(booking)
        } catch (err) {
            console.error(err)
            setError(
                err.response?.data?.message || 'Something went wrong while booking'
            )
        }
    }

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Select Date Range</h2>
            <input
                type="date"
                value={data.startDate}
                onChange={(e) => updateData({ startDate: e.target.value })}
                className="border p-2 rounded w-full mb-2"
            />
            <input
                type="date"
                value={data.endDate}
                onChange={(e) => updateData({ endDate: e.target.value })}
                className="border p-2 rounded w-full"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-4 flex justify-between">
                <button onClick={back} className="px-4 py-2 rounded border">
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}
