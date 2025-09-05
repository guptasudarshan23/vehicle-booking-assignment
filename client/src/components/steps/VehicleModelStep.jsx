import React, { useEffect, useState } from 'react'
import { getVehicles } from '../../services/api'

export default function VehicleModelStep({ data, updateData, next, back }) {
    const [models, setModels] = useState([])
    const [error, setError] = useState('')

    useEffect(() => {
        if (data.vehicleTypeId) {
            getVehicles(data.vehicleTypeId).then(setModels).catch(console.error)
        }
    }, [data.vehicleTypeId])

    const handleNext = () => {
        if (!data.vehicleId) {
            setError('Please select a vehicle model')
            return
        }
        setError('')
        next()
    }

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Select Vehicle Model</h2>
            {models.map((m) => (
                <label key={m.id} className="flex items-center gap-2 block">
                    <input
                        type="radio"
                        value={m.id}
                        checked={data.vehicleId === m.id}
                        onChange={() => updateData({ vehicleId: m.id })}
                    />
                    {m.modelName}
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
