import React, { useState } from "react";
import { Button, Label, TextInput, Card } from "flowbite-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_ROUTES from "../../constant/api_routes";
import routes from "../../constant/routes";

const OperatorCreate = () => {
  const [formData, setFormData] = useState({
    operator_name: "",
    email: "",
    phone_number: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    try {
      await axios.post(API_ROUTES.BUS_OPERATOR_CREATE, formData);
      alert("Operator created successfully!");
      navigate(routes.operatorList);
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        console.error("Error creating operator:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <Card>
        <h1 className="text-2xl font-bold mb-4">Create Bus Operator</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="operator_name" value="Operator Name" />
            <TextInput
              id="operator_name"
              name="operator_name"
              value={formData.operator_name}
              onChange={handleChange}
              
            />
          </div>
          <div>
            <Label htmlFor="email" value="Email" />
            <TextInput
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              
            />
          </div>
          <div>
            <Label htmlFor="phone_number" value="Phone Number" />
            <TextInput
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              
            />
          </div>
          <div>
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              name="password"
              type="password"
              value={formData.password}
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
          <Button type="submit" className="bg-blue-500">Create Operator</Button>
        </form>
      </Card>
    </div>
  );
};

export default OperatorCreate;
