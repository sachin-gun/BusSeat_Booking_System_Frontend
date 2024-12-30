
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "flowbite-react";
import axios from "axios";
import routes from "../../constant/routes";
import API_ROUTES from "../../constant/api_routes";

const PermitList = () => {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all operators
  const fetchOperators = async () => {
    try {
      const response = await axios.get(API_ROUTES.PERMIT_LIST);
      setOperators(response?.data?.permits || []);
    } catch (error) {
      console.error("Error fetching operators:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete an operator
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this permit ?")) {
      try {
        await axios.delete(`${API_ROUTES.PERMIT_DELETE}?id=${id}`);
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
      <h1 className="text-2xl font-bold mb-4">Permits</h1>
      <Link to={routes.permitCreate}>
        <Button className="mb-4 bg-blue-500">Create Permit</Button>
      </Link>
      <div className="max-h-screen overflow-y-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Permit No</Table.HeadCell>
            <Table.HeadCell>Bus Number</Table.HeadCell>
            <Table.HeadCell>Seat Count</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {operators.map((operator) => (
              <Table.Row key={operator._id}>
                <Table.Cell>{operator?._id}</Table.Cell>
                <Table.Cell>{operator?.bus_id?.bus_number}</Table.Cell>
                <Table.Cell>{operator?.bus_id?.seats_count}</Table.Cell>
                <Table.Cell>{operator?.permit_status}</Table.Cell>
                <Table.Cell className="flex gap-1">
                  <Link to={`${routes.permitEdit.replace(":id", operator._id)}`}>
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

export default PermitList;
