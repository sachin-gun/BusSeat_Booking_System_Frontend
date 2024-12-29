import React, { useState } from "react";
import { Button, Label, TextInput, Checkbox, Card } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import routes from "../../constant/routes";
import API_ROUTES from "../../constant/api_routes";
import { useAuth } from "../../hooks/useAuth";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();
    
  const successMessage = location.state?.successMessage || "";

  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });

  const [errorMessages, setErrorMessages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessages([]); // Reset error messages

    // Frontend validations
    const errors = [];
    if (!formData.phone_number) {
      errors.push("Contact number is required.");
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      errors.push("Contact number must be 10 digits.");
    }

    if (!formData.password) {
      errors.push("Password is required.");
    }

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    try {
      // Backend API call
      const response = await axios.post(API_ROUTES.LOGIN, formData);

      // Handle success (example: navigate to dashboard or handle token storage)
      login(response.data.token, response.data.user);
      navigate(routes.busList)
    } catch (error) {
      // Handle API validation errors
      if (error.response && error.response.data) {
        setErrorMessages(
          error.response.data.error || ["Invalid login credentials."]
        );
      }
    }
  };

  return (
    <div className="pt-32">
      {successMessage && (
        <div className="text-green-500 text-sm text-center mb-4">
          {successMessage}
        </div>
      )}
      <Card className="w-full max-w-sm mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login to Your Account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Contact Number Input */}
          <div>
            <Label htmlFor="phone_number" value="Contact Number" />
            <TextInput
              id="phone_number"
              name="phone_number"
              type="tel"
              placeholder="0712345678"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <Label htmlFor="password" value="Your Password" />
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
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

          {/* Remember Me Checkbox */}
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember" value="Remember me" />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-blue-500">
            Login
          </Button>
        </form>

        {/* Divider */}
        <div className="text-center text-gray-500 text-sm">
          <p className="mt-4">
            Don’t have an account?{" "}
            <Link
              to={routes.register}
              className="text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}

export default Login;
