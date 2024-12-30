import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Table, Card } from "flowbite-react";
import API_ROUTES from "../../constant/api_routes";
import routes from "../../constant/routes"
import SeatTable from "./components/SeatTable";
import { useAuth } from "../../hooks/useAuth";

const SeatSelect = () => {
    const { id: scheduleId } = useParams(); // Get schedule ID from route params
    const navigate = useNavigate();
    const { authState } = useAuth(); 
    const [schedule, setSchedule] = useState(null); // Holds schedule details
    const [availableSeats, setAvailableSeats] = useState([]); // Available seats
    const [selectedSeat, setSelectedSeat] = useState(null); // Selected seat
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage,setSuccessMessage] = useState("")

    // Fetch schedule details and available seats
    useEffect(() => {
        const fetchScheduleAndSeats = async () => {
            try {
                // Fetch schedule details
                const scheduleResponse = await axios.get(
                    `${API_ROUTES.SCHEDULE_EDIT}?id=${scheduleId}`
                );
                setSchedule(scheduleResponse.data.schedule);

                // Fetch available seats
                const seatResponse = await axios.get(
                    `${API_ROUTES.AVAILABLE_SEATS}?schedule_id=${scheduleId}`
                );
                setAvailableSeats(seatResponse.data.data.availableSeats);
            } catch (error) {
                setErrorMessage(error.response?.data.message || "Failed to load data.");
            }
        };
        fetchScheduleAndSeats();
    }, [scheduleId]);

    // Handle seat selection and proceed to payment
    const handleConfirmSeat = async () => {
        if (!selectedSeat) {
            setErrorMessage("Please select a seat.");
            return;
        }

        try {
            // Calculate the lock time (current time + 5 minutes)
            const lockedUntil = new Date();
            lockedUntil.setMinutes(lockedUntil.getMinutes() + 5);
    
            // Create booking
            const response = await axios.post(`${API_ROUTES.BOOKING_CREATE}`, {
                user_id: authState?.user?._id, // Get user ID from auth state
                schedule_id: scheduleId,
                seat_number: selectedSeat,
                amount: 100, // Assuming `amount` is part of schedule
                locked_until: lockedUntil.toISOString(),
            });
    
            console.log(response?.data?.booking?._id);
            
            setSuccessMessage("Booking confirmed! Redirecting to payment...");
            setTimeout(() => {
                navigate( `${routes?.reservationPayment?.replace(":id", response?.data?.booking?._id)}`);
            }, 3000); // 3-second delay
        } catch (error) {
            setErrorMessage(error.response?.data.message || "Failed to create booking.");
        }
    };

    if (!schedule) return <p>Loading...</p>;

    return (
        <Card>
            <h2 className="text-center text-2xl font-bold mb-4">Select Your Seat</h2>

            {/* Display Schedule Details */}
            <div className="mb-4">
                <p>
                    <strong>Route:</strong> {schedule.route_id.start_point} →{" "}
                    {schedule.route_id.end_point}
                </p>
                <p>
                    <strong>Bus:</strong> {schedule.bus_id.bus_number}
                </p>
                <p>
                    <strong>Start Time:</strong>{" "}
                    {new Date(schedule.start_time).toLocaleString()}
                </p>
                <p>
                    <strong>End Time:</strong>{" "}
                    {new Date(schedule.end_time).toLocaleString()}
                </p>
            </div>

            {/* Display Available Seats */}
            <div className="mb-4">
                <h3 className="text-lg font-bold">Available Seats</h3>
            
                <SeatTable
                    availableSeats={availableSeats}
                    selectedSeat={selectedSeat}
                    setSelectedSeat={setSelectedSeat}
                />
            </div>

            {/* Success Banner */}
            {successMessage && (
                <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
                    {successMessage}
                </div>
            )}

            {/* Error Message */}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            {/* Confirm Seat Button */}
            <Button
                className="bg-blue-600"
                onClick={handleConfirmSeat}
                disabled={!selectedSeat}
            >
                Confirm Seat
            </Button>
        </Card>
    );
};

export default SeatSelect;
