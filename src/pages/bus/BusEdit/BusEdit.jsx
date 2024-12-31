import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Label, TextInput, Card, Alert, Select } from "flowbite-react";
import axios from "axios";
import API_ROUTES from "../../../constant/api_routes";
import routes from "../../../constant/routes";

const BusEdit = () => {
  const { id } = useParams(); // Bus ID from the route parameter
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    bus_number: "",
    seats_count: "",
    status: "",
  });
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch the bus details by ID
  useEffect(() => {
    const fetchBus = async () => {
      try {
        const response = await axios.get(API_ROUTES.BUS_EDIT, { params: { id } });
        const { bus_number, seats_count, status } = response.data.bus;
        setFormData({ bus_number, seats_count, status });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bus details:", error);
        setErrors(["Failed to load bus details."]);
        setLoading(false);
      }
    };

    fetchBus();
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage("");

    try {
      await axios.put(`${API_ROUTES.BUS_UPDATE.replace(":id", id)}`, formData);
      setSuccessMessage("Bus updated successfully!");
      setTimeout(() => navigate(routes.busList), 2000); // Redirect after success
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["An unexpected error occurred."]);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <Card>
        <h1 className="text-2xl font-bold mb-4">Edit Bus</h1>

        {/* Success Message */}
        {successMessage && (
          <Alert color="success" className="mb-4">
            {successMessage}
          </Alert>
        )}

        {/* Error Messages */}
        {errors.length > 0 && (
          <Alert color="failure" className="mb-4">
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Bus Number */}
          <div>
            <Label htmlFor="bus_number" value="Bus Number" />
            <TextInput
              id="bus_number"
              name="bus_number"
              value={formData.bus_number}
              onChange={handleChange}
              required
            />
          </div>

          {/* Seats Count */}
          <div>
            <Label htmlFor="seats_count" value="Seats Count" />
            <TextInput
              id="seats_count"
              name="seats_count"
              type="number"
              min="1"
              value={formData.seats_count}
              onChange={handleChange}
              required
            />
          </div>

          {/* Status */}
          <div>
            <Label htmlFor="status" value="Status" />
            <Select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="under_maintenance">Under Maintenance</option>
            </Select>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="bg-blue-500">Update Bus</Button>
        </form>
      </Card>
    </div>
  );
};

export default BusEdit;
