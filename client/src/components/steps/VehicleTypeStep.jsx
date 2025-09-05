import React, { useEffect, useState } from 'react'
import { getVehicleTypes } from '../../services/api'

export default function VehicleTypeStep({ data, updateData, next, back }) {
    const [types, setTypes] = useState([])
    const [error, setError] = useState('')


    useEffect(() => {
        if (data.wheels) {
            getVehicleTypes(data.wheels)
                .then((res) => {
                    console.log("Vehicle types API response:", res);
                    setTypes(Array.isArray(res) ? res : []);
                })
                .catch((err) => {
                    console.error("Error fetching vehicle types:", err);
                    setTypes([]);
                });
        }
    }, [data.wheels]);

    const handleNext = () => {
        if (!data.vehicleTypeId) {
            setError('Please select a vehicle type')
            return
        }
        setError('')
        next()
    }

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Select Vehicle Type</h2>
            {types.map((t) => (
                <label key={t.id} className="flex items-center gap-2">
                    <input
                        type="radio"
                        value={t.id}
                        checked={parseInt(data.vehicleTypeId, 10) === t.id}
                        onChange={() => updateData({ vehicleTypeId: t.id })}
                        className="mr-2"
                    />
                    {t.name}
                </label>
            ))}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-4 flex justify-between">
                <button onClick={back} className="px-4 py-2 rounded border">
                    Back
                </button>
                <button
                    onClick={handleNext}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Next
                </button>
            </div>
        </div>
    )
}
