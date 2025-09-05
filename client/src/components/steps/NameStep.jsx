import React, { useState } from 'react'

export default function NameStep({ data, updateData, next }) {
    const [error, setError] = useState('')

    const handleNext = () => {
        if (!data.firstName || !data.lastName) {
            setError('Please enter both first and last name')
            return
        }
        setError('')
        next()
    }

    return (
        <div>
            <h2 className="text-lg font-semibold mb-2">What is your name?</h2>
            <input
                type="text"
                placeholder="First name"
                value={data.firstName}
                onChange={(e) => updateData({ firstName: e.target.value })}
                className="border p-2 rounded w-full mb-2"
            />
            <input
                type="text"
                placeholder="Last name"
                value={data.lastName}
                onChange={(e) => updateData({ lastName: e.target.value })}
                className="border p-2 rounded w-full"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
                onClick={handleNext}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Next
            </button>
        </div>
    )
}
