import React, { useState } from "react";
import NameStep from "./steps/NameStep";
import WheelsStep from "./steps/WheelsStep";
import VehicleTypeStep from "./steps/VehicleTypeStep";
import VehicleModelStep from "./steps/VehicleModelStep";
import DateRangeStep from "./steps/DateRangeStep";
import Success from "./Success";

import { useNavigate } from "react-router-dom";

const steps = [NameStep, WheelsStep, VehicleTypeStep, VehicleModelStep, DateRangeStep];

export default function BookingWizard() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        wheels: null,
        vehicleTypeId: null,
        vehicleId: null,
        startDate: "",
        endDate: "",
    });
    const [successData, setSuccessData] = useState(null);

    const navigate = useNavigate(); // to navigate programmatically

    const StepComponent = steps[currentStep];

    const next = () => setCurrentStep((s) => s + 1);
    const back = () => setCurrentStep((s) => s - 1);

    const updateData = (data) => {
        setFormData({ ...formData, ...data });
    };

    if (successData) {
        // when booking is successful, navigate to booking details
        navigate(`/bookings/${successData.id}`);
        return null; // nothing to render while redirecting
    }

    return (
        <div>
            <StepComponent
                data={formData}
                updateData={updateData}
                next={next}
                back={back}
                setSuccessData={setSuccessData}
            />
            <div className="mt-4 text-sm text-gray-500 text-center">
                Step {currentStep + 1} of {steps.length}
            </div>
        </div>
    );
}
