import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import API_ROUTES from "../../constant/api_routes";

const OperatorView = () => {
  const { id } = useParams();
  const [operator, setOperator] = useState(null);

  useEffect(() => {
    const fetchOperator = async () => {
      try {
        const response = await axios.get(`${API_ROUTES.BUS_OPERATOR_EDIT}?id=${id}`);
        setOperator(response.data.busOperator);
      } catch (error) {
        console.error("Error fetching operator:", error);
      }
    };

    fetchOperator();
  }, [id]);

  if (!operator) return <p>Loading...</p>;

  return (
    <div>
      <h1>{operator.operator_name}</h1>
      <p>Email: {operator.user_id.email}</p>
      <p>Phone: {operator.user_id.phone_number}</p>
      <p>Address: {operator.address || "N/A"}</p>
    </div>
  );
};

export default OperatorView;
