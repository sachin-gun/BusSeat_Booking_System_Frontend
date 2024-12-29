import React, { useState } from "react";
import { Button, Label, TextInput, Card } from "flowbite-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../../constant/routes";
import API_ROUTES from "../../../constant/api_routes";

const BusOperatorCreate = () => {

    const [formData, setFormData] = useState({
        operator_name: "",
        phone_number: "",
        email: "",
        password: "",
      });
    
      const [errorMessages, setErrorMessages] = useState([]);
      const [successMessage, setSuccessMessage] = useState("");
    
    
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
          const response = await axios.post(API_ROUTES.BUS_OPERATOR_CREATE, formData);
    
          console.log(response)

          // Handle success
          if (response.data.message) {
            setSuccessMessage(response.data.message);
            setFormData({
                operator_name: "",
                phone_number: "",
                email: "",
                password: "",
            })
          }
        } catch (error) {
            console.log(error)
          // Handle validation errors
          if (error.response && error.response.data) {
            console.log(error.response)
            setErrorMessages(error.response.data.errors || ["Something went wrong."]);
          }
        }
    }

    return   <div className="pt-4 px-4">
            <Card className="w-full">
            <h2 className="text-center text-2xl font-bold mb-4">Bus Operator Create</h2>

            {/* Search Input */}
            <div className="mb-4 flex justify-end gap-1">
                <Link to={routes.busOperatorList}>
                    <Button className="bg-blue-500">
                       Back
                    </Button>
                </Link>
            </div>

    
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div>
                <Label htmlFor="name" value="Full Name" />
                <TextInput
                  id="operator_name"
                  name="operator_name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.operator_name}
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
                  placeholder="0712345678"
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
                  placeholder="name@example.com"
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
    
              {/* Success Message */}
              {successMessage && (
                <div className="text-green-500 text-sm">{successMessage}</div>
              )}
    
              {/* Submit Button */}
              <Button type="submit" className="w-full bg-blue-500">
                Create Bus Operator
              </Button>
            </form>
          </Card>
        </div>
}

export default BusOperatorCreate