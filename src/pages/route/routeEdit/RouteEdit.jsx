import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Card } from "flowbite-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API_ROUTES from "../../../constant/api_routes";
import routes from "../../../constant/routes";

const RouteEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    route_name: "",
    start_point: "",
    end_point: "",
    distance: "",
    estimated_duration: "",
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await axios.get(`${API_ROUTES.ROUTE_EDIT}?id=${id}`);
        setFormData(response.data.route);
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name == "distance")
    {
      setFormData({ ...formData, [name]: parseInt(value) });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      await axios.put(`${API_ROUTES.ROUTE_UPDATE.replace(":id", id)}`, formData);
      alert("Route updated successfully!");
      navigate(routes.routeList);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error updating route:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <Card>
        <h1 className="text-2xl font-bold mb-4">Edit Route</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="route_name" value="Route Name" />
            <TextInput
              id="route_name"
              name="route_name"
              value={formData?.route_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="start_point" value="Start Point" />
            <TextInput
              id="start_point"
              name="start_point"
              value={formData?.start_point}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="end_point" value="End Point" />
            <TextInput
              id="end_point"
              name="end_point"
              value={formData?.end_point}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="distance" value="Distance (km)" />
            <TextInput
              id="distance"
              name="distance"
              type="number"
              value={formData?.distance}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="estimated_duration" value="Estimated Duration" />
            <TextInput
              id="estimated_duration"
              name="estimated_duration"
              value={formData?.estimated_duration}
              onChange={handleChange}
            />
          </div>
          {errors.length > 0 && (
            <div className="text-red-500">
              {errors.map((err, index) => (
                <p key={index}>{err}</p>
              ))}
            </div>
          )}
          <Button type="submit" className="bg-blue-500">Update Route</Button>
        </form>
      </Card>
    </div>
  );
};

export default RouteEdit;
