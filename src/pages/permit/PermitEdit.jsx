import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Select, TextInput, Label, Card } from "flowbite-react";
import API_ROUTES from "../../constant/api_routes";
import routes from "../../constant/routes";

const PermitEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  
  const [formData, setFormData] = useState({
    permit_status: "",
    comments: "",
    routeName: "",
    busNo : ""
  });

  useEffect(() => {
    fetchPermit();
  }, []);

  const fetchPermit = async () => {
    try {
      const response =  await axios.get(`${API_ROUTES.PERMIT_EDIT}?id=${id}`, formData);
      const permit = response.data.permit;
      setFormData({
        permit_status: permit.permit_status,
        comments: permit.comments || "",
        routeName : permit?.route_id?.route_name,
        busNo : permit?.bus_id?.bus_number
      });
    } catch (error) {
      console.error("Failed to fetch permit:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put(`${API_ROUTES.PERMIT_UPDATE.replace(":id", id)}`, formData);
        alert("Permit updated successfully!");
      navigate(routes.permitList);
    } catch (error) {
      console.error("Failed to update permit:", error);
    }
  };

  return (
    <Card>
      <h2 className="text-center text-2xl font-bold mb-4">Edit Permit</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
          <Label htmlFor="bus_no" value="Bus No" />
          <TextInput
            id="bus_no"
            name="bus_no"
            value={formData.busNo}
            readOnly={true}
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="route" value="Route Name" />
          <TextInput
            id="route"
            name="route"
            value={formData.routeName}
            readOnly={true}
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="permit_status" value="Permit Status" />
          <Select
            id="permit_status"
            name="permit_status"
            value={formData.permit_status}
            onChange={handleChange}
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </Select>
        </div>
        <div className="mb-4">
          <Label htmlFor="comments" value="Comments" />
          <TextInput
            id="comments"
            name="comments"
            placeholder="Add comments"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>
        <Button type="submit" className="bg-blue-500">Update Permit</Button>
      </form>
    </Card>
  );
};

export default PermitEdit;
