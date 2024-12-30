

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Label, Select, Card, Table } from "flowbite-react";
import API_ROUTES from "../../constant/api_routes";

const ReservationCreate = () => {
  const [points, setPoints] = useState([]); // Holds unique points for dropdown
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [schedules, setSchedules] = useState([]); // Holds fetched schedules
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch unique points
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get(API_ROUTES.ROUTE_POINTS);
        setPoints(response.data.data || []);
      } catch (error) {
        setErrorMessage("Failed to fetch points.");
      }
    };
    fetchPoints();
  }, []);

  // Fetch schedules when startPoint and endPoint are selected
  const fetchSchedules = async () => {
    if (!startPoint || !endPoint) {
      setErrorMessage("Please select both start and end points.");
      return;
    }

    setErrorMessage("");
    try {
      const response = await axios.get(API_ROUTES.SCHEDULE_BY_POINTS, {
        params: { start_point: startPoint, end_point: endPoint },
      });
      setSchedules(response.data.schedules || []);
    } catch (error) {
      setErrorMessage(error.response?.data.message || "Failed to fetch schedules.");
    }
  };

  return (
    <Card>
      <h2 className="text-center text-2xl font-bold mb-4">Booking Bus</h2>

      {/* Dropdowns for Start and End Points */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="start_point" value="Start Point" />
          <Select
            id="start_point"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
          >
            <option value="">Select Start Point</option>
            {points.map((point) => (
              <option key={point} value={point}>
                {point}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="end_point" value="End Point" />
          <Select
            id="end_point"
            value={endPoint}
            onChange={(e) => setEndPoint(e.target.value)}
          >
            <option value="">Select End Point</option>
            {points.map((point) => (
              <option key={point} value={point}>
                {point}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Fetch Schedules Button */}
      <Button className="bg-blue-600" onClick={fetchSchedules}>Find Schedules</Button>

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

      {/* Schedule Table */}
      {schedules.length > 0 && (
        <Table>
          <Table.Head>
            <Table.HeadCell>Route</Table.HeadCell>
            <Table.HeadCell>Bus Number</Table.HeadCell>
            <Table.HeadCell>Start Time</Table.HeadCell>
            <Table.HeadCell>End Time</Table.HeadCell>
            <Table.HeadCell>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {schedules.map((schedule) => (
              <Table.Row key={schedule._id}>
                <Table.Cell>
                  {schedule.route_id.start_point} → {schedule.route_id.end_point}
                </Table.Cell>
                <Table.Cell>{schedule.bus_id.bus_number}</Table.Cell>
                <Table.Cell>
                  {new Date(schedule.start_time).toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                  {new Date(schedule.end_time).toLocaleString()}
                </Table.Cell>
                <Table.Cell>
                    <Button className="bg-green-500">Book</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Card>
  );
};

export default ReservationCreate;
