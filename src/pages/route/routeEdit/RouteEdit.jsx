import React, { useState, useEffect } from "react";
import { Button, Label, TextInput, Card } from "flowbite-react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import routes from "../../../constant/routes";
import API_ROUTES from "../../../constant/api_routes";

const RouteEdit = () => {
  const { id } = useParams(); // Get route ID from URL
  const [formData, setFormData] = useState({
    route_name: "",
    start_point: "",
    end_point: "",
    distance: null,
    estimated_duration: "",
  });

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch data for the route to edit
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.get(`${API_ROUTES.ROUTE_EDIT}?id=${id}`);
        setFormData(response.data?.route); // Assuming the API returns the route object
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    fetchRoute();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "distance") {
      setFormData({
        ...formData,
        [name]: parseInt(value),
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]);
    setSuccessMessage("");

    try {
      const response = await axios.put(`${API_ROUTES.ROUTE_UPDATE}/${id}`, formData);

      // Handle success
      if (response.data.message) {
        setSuccessMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
      // Handle validation errors
      if (error.response && error.response.data) {
        console.log(error.response);
        setErrorMessages(error.response.data.errors || ["Something went wrong."]);
      }
    }
  };

  return (
    <div className="pt-4 px-4">
      <Card className="w-full">
        <h2 className="text-center text-2xl font-bold mb-4">Edit Route</h2>

        {/* Back Button */}
        <div className="mb-4 flex justify-end gap-1">
          <Link to={routes.routeList}>
            <Button className="bg-blue-500">Back</Button>
          </Link>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Route Name */}
          <div>
            <Label htmlFor="route_name" value="Route Name" />
            <TextInput
              id="route_name"
              name="route_name"
              type="text"
              placeholder="138"
              value={formData.route_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Start Point */}
          <div>
            <Label htmlFor="start_point" value="Start Point" />
            <TextInput
              id="start_point"
              name="start_point"
              type="text"
              placeholder="Kottawa"
              value={formData.start_point}
              onChange={handleChange}
              required
            />
          </div>

          {/* End Point */}
          <div>
            <Label htmlFor="end_point" value="End Point" />
            <TextInput
              id="end_point"
              name="end_point"
              type="text"
              placeholder="Pettah"
              value={formData.end_point}
              onChange={handleChange}
              required
            />
          </div>

          {/* Distance */}
          <div>
            <Label htmlFor="distance" value="Distance (km)" />
            <TextInput
              id="distance"
              name="distance"
              type="number"
              placeholder="44"
              value={formData.distance || ""}
              onChange={handleChange}
              required
            />
          </div>

          {/* Estimated Duration */}
          <div>
            <Label htmlFor="estimated_duration" value="Estimated Duration" />
            <TextInput
              id="estimated_duration"
              name="estimated_duration"
              type="text"
              placeholder="2 hours"
              value={formData.estimated_duration}
              onChange={handleChange}
              required
            />
          </div>

          {/* Error Messages */}
          {errorMessages.length > 0 && (
            <div className="text-red-500 text-sm">
              {errorMessages.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="text-green-500 text-sm">{successMessage}</div>
          )}

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-500">
            Update Route
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default RouteEdit;
