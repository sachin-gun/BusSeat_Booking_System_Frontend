import React, { useEffect, useState } from "react";
import { Button, Label, TextInput, Card, Alert } from "flowbite-react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import routes from "../../../constant/routes";
import API_ROUTES from "../../../constant/api_routes";

const BusOperatorEdit = () => {
  const { id } = useParams(); // Get the operator ID from route parameters
  const navigate = useNavigate();

  const [operatorData, setOperatorData] = useState({
    operator_name: "",
    address: "",
    user: {
      name: "",
      email: "",
      phone_number: "",
    },
  });

  const [errors, setErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch bus operator data by ID
  const fetchOperatorData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_ROUTES.BUS_OPERATOR_EDIT, {
        params: {
          id,
        },
      });

      
      setOperatorData({
        operator_name: response.data.busOperator.operator_name,
        address: response.data.busOperator.address || "",
        user: {
          name: response.data.busOperator.user_id.name,
          email: response.data.busOperator.user_id.email,
          phone_number: response.data.busOperator.user_id.phone_number,
        },
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch operator data:", error);
      setLoading(false);
    }
  };

  // Update bus operator details
  const handleUpdate = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccessMessage("");

    try {
       await axios.put(`${API_ROUTES.BUS_OPERATOR_UPDATE}/${id}`, {
        operator_name: operatorData.operator_name,
        address: operatorData.address,
      });

      setSuccessMessage("Bus operator updated successfully!");
    } catch (error) {
      console.error("Failed to update operator:", error);
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      }
    }
  };

  useEffect(() => {
    fetchOperatorData();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="pt-4 px-4">
      <Card>
        <h2 className="text-center text-2xl font-bold mb-4">Edit Bus Operator</h2>

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

         {/* Search Input */}
         <div className="mb-4 flex justify-end gap-1">
                <Link to={routes.busOperatorList}>
                    <Button className="bg-blue-500">
                       Back
                    </Button>
                </Link>
            </div>


        <form onSubmit={handleUpdate} className="space-y-4">
          {/* Operator Name */}
          <div>
            <Label htmlFor="operator_name" value="Operator Name" />
            <TextInput
              id="operator_name"
              name="operator_name"
              type="text"
              placeholder="Operator Name"
              value={operatorData.operator_name}
              onChange={(e) =>
                setOperatorData({ ...operatorData, operator_name: e.target.value })
              }
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
              placeholder="Address"
              value={operatorData.address}
              onChange={(e) =>
                setOperatorData({ ...operatorData, address: e.target.value })
              }
            />
          </div>

          <h3 className="text-lg font-semibold">Associated User</h3>
          {/* Associated User - Name */}
          <div>
            <Label value="Name" />
            <TextInput value={operatorData.user.name} disabled  />
          </div>

          {/* Associated User - Email */}
          <div>
            <Label value="Email Address" />
            <TextInput value={operatorData.user.email || "N/A"} disabled />
          </div>

          {/* Associated User - Phone Number */}
          <div>
            <Label value="Phone Number" />
            <TextInput value={operatorData.user.phone_number} disabled />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <Button type="submit" className="bg-blue-500 w-full">
              Update
            </Button>
        
          </div>
        </form>
      </Card>
    </div>
  );
};

export default BusOperatorEdit;
