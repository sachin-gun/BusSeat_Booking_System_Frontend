import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Label, Select, TextInput, Card } from "flowbite-react";
import API_ROUTES from "../../constant/api_routes";

const PermitCreate = () => {
  const [formData, setFormData] = useState({
    bus_id: "",
    operator_id: "",
    route_id: "",
    comments: "",
  });

  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch buses and routes on component mount
  useEffect(() => {
    fetchBuses();
    fetchRoutes();
  }, []);

  // Fetch buses from API
  const fetchBuses = async () => {
    try {
      const response = await axios.get(API_ROUTES.BUS_LIST);
      console.log(response?.data?.buses)
      setBuses(response.data.buses || []);
    } catch (error) {
      console.error("Failed to fetch buses:", error);
    }
  };

  // Fetch routes from API
  const fetchRoutes = async () => {
    try {
      const response = await axios.get(API_ROUTES.ROUTE_LIST);
      setRoutes(response.data.routes || []);
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    }
  };

  // Handle bus selection and update operator_id
  const handleBusChange = (e) => {
    const selectedBusId = e.target.value;
    setFormData({ ...formData, bus_id: selectedBusId });

    // Find the selected bus in the buses array
    const selectedBus = buses.find((bus) => bus._id === selectedBusId);
    if (selectedBus) {
      setFormData((prev) => ({
        ...prev,
        operator_id: selectedBus.operator_id._id, // Update operator_id
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]);
    setSuccessMessage("");

    try {
      const response = await axios.post(API_ROUTES.PERMIT_CREATE, formData);
      setSuccessMessage(response.data.message);
      setFormData({ bus_id: "", operator_id: "", route_id: "", comments: "" });
    } catch (error) {
      setErrorMessages(error.response?.data.errors || ["Something went wrong."]);
    }
  };

  return (
    <Card>
      <h2 className="text-center text-2xl font-bold mb-4">Create Permit</h2>
      <form onSubmit={handleSubmit}>
        {/* Bus Dropdown */}
        <div className="mb-4">
          <Label htmlFor="bus_id" value="Bus" />
          <Select
            id="bus_id"
            name="bus_id"
            value={formData?.bus_id}
            onChange={handleBusChange}
            required
          >
            <option value="" disabled>
              Select a Bus
            </option>
            {buses.map((bus) => (
              <option key={bus?._id} value={bus?._id}>
                {bus?.bus_number} (Operator: {bus?.operator_id?.operator_name})
              </option>
            ))}
          </Select>
        </div>

        {/* Route Dropdown */}
        <div className="mb-4">
          <Label htmlFor="route_id" value="Route" />
          <Select
            id="route_id"
            name="route_id"
            value={formData.route_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a Route
            </option>
            {routes.map((route) => (
              <option key={route._id} value={route._id}>
                {route.route_name} - {route.start_point} to {route.end_point}
              </option>
            ))}
          </Select>
        </div>

        {/* Comments */}
        <div className="mb-4">
          <Label htmlFor="comments" value="Comments" />
          <TextInput
            id="comments"
            name="comments"
            placeholder="Add comments"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>

        {/* Error Messages */}
        {errorMessages.length > 0 && (
          <div className="text-red-500">
            {errorMessages.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        {/* Success Message */}
        {successMessage && <div className="text-green-500">{successMessage}</div>}

        <Button className="bg-blue-500" type="submit">Create Permit</Button>
      </form>
    </Card>
  );
};

export default PermitCreate;
