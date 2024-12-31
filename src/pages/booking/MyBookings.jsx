import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Spinner } from "flowbite-react";
import API_ROUTES from "../../constant/api_routes";
import { useAuth } from "../../hooks/useAuth";

const MyBookings = () => {
  const { authState } = useAuth(); // Access user authentication state
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const response = await axios.get(API_ROUTES.GET_BOOKINGS_BY_USER, {
          params: { user_id: authState?.user?._id }, // Pass user ID from authState
        });
        setBookings(response.data.bookings || []);
      } catch (error) {
        setErrorMessage(
          error.response?.data?.message || "Failed to fetch bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    if (authState?.user?._id) {
      fetchBookings();
    }
  }, [authState?.user?._id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Card>
      <h2 className="text-2xl font-bold text-center mb-4">My Bookings</h2>

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      {/* Bookings Table */}
      {bookings.length > 0 ? (
        <Table>
          <Table.Head>
            <Table.HeadCell>Route</Table.HeadCell>
            <Table.HeadCell>Bus Number</Table.HeadCell>
            <Table.HeadCell>Seat Number</Table.HeadCell>
            <Table.HeadCell>Amount</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {bookings.map((booking) => (
              <Table.Row key={booking._id}>
                <Table.Cell>
                  {booking.schedule_id.route_id.start_point} →{" "}
                  {booking.schedule_id.route_id.end_point}
                </Table.Cell>
                <Table.Cell>{booking.schedule_id.bus_id.bus_number}</Table.Cell>
                <Table.Cell>{booking.seat_number}</Table.Cell>
                <Table.Cell>{`LKR ${booking.amount.toFixed(2)}`}</Table.Cell>
                <Table.Cell>
                  {booking.status.charAt(0).toUpperCase() +
                    booking.status.slice(1)}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p className="text-center">No bookings found.</p>
      )}
    </Card>
  );
};

export default MyBookings;
