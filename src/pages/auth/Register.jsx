import React, { useState } from "react";
import { Button, Label, TextInput, Card } from "flowbite-react";
import axios from "axios";
import API_ROUTES from "../../constant/api_routes";
import routes from "../../constant/routes";
import { useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    operator_name: "",
    phone_number: "",
    email: "",
    password: "",
    role:"customer"
  });

  const [errorMessages, setErrorMessages] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      const response = await axios.post(API_ROUTES.REGISTER, formData);

      // Handle success
      if (response.data.message) {
        setSuccessMessage(response.data.message);
        navigate(routes.login, { state: { successMessage: response.data.message } });
      }
    } catch (error) {
      // Handle validation errors
      if (error.response && error.response.data) {
        console.log(error.response.data)
        setErrorMessages(error.response.data.error || ["Something went wrong."]);
      }
    }
  };

  return (
      <div className="pt-32">
        <Card className="w-full max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create an Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <Label htmlFor="name" value="Full Name" />
            <TextInput
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <Label htmlFor="phoneNumber" value="Phone Number" />
            <TextInput
              id="phone_number"
              name="phone_number"
              type="tel"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email" value="Email Address" />
            <TextInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password" value="Password" />
            <TextInput
              id="password"
              name="password"
              type="password"
              value={formData.password}
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
            Register
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default Register;
