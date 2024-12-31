import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import API_ROUTES from "../../constant/api_routes";
import routes from "../../constant/routes";

const stripePromise = loadStripe("pk_test_51Qbpu8BI3ddYlsnRRKNNF8o4f7xX0GzMK3EM9E8PcfXqsPrWxDv9ABLBYeb9cdq403UcbQth6D0oZMnr51LuDCyx00nwngnYqG"); // Replace with your Stripe publishable key

const ReservationCreatePayment = () => {
    const { id } = useParams(); // Schedule ID from the route
    const navigate = useNavigate();
    const [booking, setBooking] = useState(null);
    const [clientSecret, setClientSecret] = useState(null);
    const [amount, setAmount] = useState(0); // Payment amount
    const stripe = useStripe();
    const elements = useElements();

    // Fetch schedule details
    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await axios.get(`${API_ROUTES.BOOKING_DATA.replace(":id", id)}`);
                console.log(response)

                setBooking(response?.data?.booking);
                setAmount(response?.data.booking?.amount ?? 20); // Example: Set a fixed ticket price
            } catch (error) {
                console.error("Failed to fetch schedule:", error);
            }
        };
        fetchSchedule();
    }, [id]);

    // Create payment intent
    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await axios.post(API_ROUTES.PAYMENT_INTENT, {
                    amount,
                });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error("Failed to create payment intent:", error);
            }
        };

        if (amount > 0) {
            createPaymentIntent();
        }
    }, [amount]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            console.error("Payment failed:", error);
            alert("Payment failed. Please try again.");
        } else {
            try {
                console.log(paymentIntent)
                // Call your backend API to update the booking and save the payment details
                const response = await axios.post(`${API_ROUTES.PAYMENT_CREATE}`, {
                    booking_id: booking._id, // ID of the booking
                    amount: paymentIntent.amount / 100, // Stripe uses smallest currency unit
                    payment_method: "card", // Payment method
                    transaction_reference: paymentIntent.id, // Stripe Payment Intent ID
                });
    
                if (response.status === 201) {
                    alert("Payment successful and booking updated!");
                    navigate(routes.reservationCreate); // Redirect to the reservations page
                } else {
                    alert("Payment successful, but failed to update booking. Please contact support.");
                }
            } catch (apiError) {
                console.error("Failed to update booking:", apiError);
                alert("Payment successful, but failed to update booking. Please contact support.");
            }
        }
    };

    if (!booking) return <p>Loading...</p>;

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Booking Form</h2>
            <p>
                Route: {booking?.schedule_id?.route_id?.start_point} → {booking?.schedule_id?.route_id?.end_point}
            </p>
            <p>Start Time: {new Date(booking?.schedule_id?.start_time).toLocaleString()}</p>
            <p>End Time: {new Date(booking?.schedule_id?.end_time).toLocaleString()}</p>
            <p>Amount: LKR {amount.toFixed(2)}</p>

            <form onSubmit={handleSubmit}>
                <CardElement className="border p-2 mb-4" />
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Pay LKR {amount.toFixed(2)}
                </button>
            </form>
        </div>
    );
};

// Stripe Elements Wrapper
const ReservationCreatePaymentWrapper = () => (
    <Elements stripe={stripePromise}>
        <ReservationCreatePayment />
    </Elements>
);

export default ReservationCreatePaymentWrapper;
