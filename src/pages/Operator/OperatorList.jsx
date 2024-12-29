import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "flowbite-react";
import axios from "axios";
import routes from "../../constant/routes";
import API_ROUTES from "../../constant/api_routes";

const OperatorList = () => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all operators
  const fetchOperators = async () => {
    try {
      const response = await axios.get(API_ROUTES.BUS_OPERATOR_LIST);
      setOperators(response.data.busOperators || []);
    } catch (error) {
      console.error("Error fetching operators:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete an operator
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this operator?")) {
      try {
        await axios.delete(`${API_ROUTES.BUS_OPERATOR_DELETE.replace(":id", id)}`);
        setOperators((prev) => prev.filter((op) => op._id !== id));
      } catch (error) {
        console.error("Error deleting operator:", error);
      }
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bus Operators</h1>
      <Link to={routes.operatorCreate}>
        <Button className="mb-4 bg-blue-500">Create New Operator</Button>
      </Link>
      <div className="max-h-screen overflow-y-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Operator Name</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {operators.map((operator) => (
              <Table.Row key={operator._id}>
                <Table.Cell>{operator.operator_name}</Table.Cell>
                <Table.Cell>{operator.user_id.email}</Table.Cell>
                <Table.Cell>{operator.user_id.phone_number}</Table.Cell>
                <Table.Cell className="flex gap-1">
                  <Link to={`${routes.operatorView.replace(":id", operator._id)}`}>
                    <Button className="bg-green-500">View</Button>
                  </Link>
                  <Link to={`${routes.operatorEdit.replace(":id", operator._id)}`}>
                    <Button className="bg-blue-600">Edit</Button>
                  </Link>
                  <Button color="failure" onClick={() => handleDelete(operator._id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default OperatorList;
