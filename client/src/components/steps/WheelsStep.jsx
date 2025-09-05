import React, { useState } from 'react'

export default function WheelsStep({ data, updateData, next, back }) {
    const [error, setError] = useState('')

    const handleNext = () => {
        if (!data.wheels) {
            setError('Please select number of wheels')
            return
        }
        setError('')
        next()
    }

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">Number of wheels?</h2>
            <div className="flex gap-4">
                {[2, 4].map((w) => (
                    <label key={w} className="flex items-center gap-2">
                        <input
                            type="radio"
                            value={w}
                            checked={data.wheels === w}
                            onChange={() => updateData({ wheels: w })}
                        />
                        {w}
                    </label>
                ))}
            </div>
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
