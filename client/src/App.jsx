import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookingWizard from "./components/BookingWizard";
import BookingDetails from "./pages/BookingDetails";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
          <Routes>
            <Route path="/" element={<BookingWizard />} />
            <Route path="/bookings/:id" element={<BookingDetails />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

