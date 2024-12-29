import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Card, Alert } from "flowbite-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API_ROUTES from "../../constant/api_routes";
import routes from "../../constant/routes";

const OperatorEdit = () => {
  const { id } = useParams(); // Get the operator ID from route parameters
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    operator_name: "",
    address: "",
  });
  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch operator data by ID
  const fetchOperatorData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_ROUTES.BUS_OPERATOR_EDIT}?id=${id}`);
      setFormData({
        operator_name: response.data.busOperator.operator_name,
        address: response.data.busOperator.address || "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch operator data:", error);
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage("");

    try {
      await axios.put(`${API_ROUTES.BUS_OPERATOR_UPDATE.replace(":id", id)}`, formData);
      setSuccessMessage("Bus operator updated successfully!");
      setTimeout(() => navigate(routes.operatorList), 2000); // Navigate back to the operator list after 2 seconds
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Failed to update operator:", error);
      }
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchOperatorData();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <Card>
        <h1 className="text-2xl font-bold mb-4">Edit Bus Operator</h1>

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
          {/* Operator Name */}
          <div>
            <Label htmlFor="operator_name" value="Operator Name" />
            <TextInput
              id="operator_name"
              name="operator_name"
              type="text"
              value={formData.operator_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Address */}
          <div>
            <Label htmlFor="address" value="Address" />
            <TextInput
              id="address"
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <Button type="submit" className="bg-blue-500">
              Update Operator
            </Button>
            <Button
              type="button"
              color="gray"
              onClick={() => navigate("/operators")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default OperatorEdit;
