import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { Button, Label, TextInput, Card, Alert } from "flowbite-react";
import axios from "axios";
import API_ROUTES from "../../../constant/api_routes";
import routes from "../../../constant/routes";

const BusCreate = () => {
  const { authState } = useAuth();
  const operatorId = authState?.user?._id;

  console.log(authState)

  const [formData, setFormData] = useState({
    bus_number: "",
    seats_count: "",
  });
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name=="seats_count")
    {
      setFormData({ ...formData, [name]: parseInt(value) });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage("");

    if (!operatorId) {
      setErrors(["You must be logged in as a bus operator to create a bus."]);
      return;
    }

    try {
      const response = await axios.post(API_ROUTES.BUS_CREATE, {
        operatorId,
        ...formData,
      });
      setSuccessMessage("Bus created successfully!");
      setTimeout(() => navigate(routes.busList), 2000); // Redirect after success
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors(["An unexpected error occurred."]);
      }
    }
  };

  return (
    <div className="p-4">
      <Card>
        <h1 className="text-2xl font-bold mb-4">Create Bus</h1>

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
            />
          </div>

          {/* Submit Button */}
          <Button className="bg-blue-500" type="submit">Create Bus</Button>
        </form>
      </Card>
    </div>
  );
};

export default BusCreate;
