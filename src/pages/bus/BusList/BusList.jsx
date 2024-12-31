import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Table, TextInput } from "flowbite-react";
import axios from "axios";
import API_ROUTES from "../../../constant/api_routes";
import routes from "../../../constant/routes";

const BusList = () => {
  const [buses, setBuses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch buses
  const fetchBuses = async () => {
    try {
      const response = await axios.get(API_ROUTES.BUS_LIST, { params: { search_query: searchQuery } });
      setBuses(response.data.buses || []);
    } catch (error) {
      console.error("Error fetching buses:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a bus
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this bus?")) {
      try {
        await axios.delete(`${API_ROUTES.BUS_DELETE.replace(":id", id)}`, formData);
        setBuses((prev) => prev.filter((bus) => bus._id !== id));
      } catch (error) {
        console.error("Error deleting bus:", error);
      }
    }
  };

  useEffect(() => {
    fetchBuses();
  }, [searchQuery]);

    // Render Status Tag
  const renderStatusTag = (status) => {
      switch (status) {
        case "active":
          return <Badge color="success" className="flex justify-center">Active</Badge>;
        case "inactive":
          return <Badge color="warning"  className="flex justify-center">Inactive</Badge>;
        case "under_maintenance":
          return <Badge color="failure"  className="flex justify-center">Under Maintenance</Badge>;
        default:
          return <Badge color="gray"  className="flex justify-center">Unknown</Badge>;
      }
    };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Buses</h1>

      {/* Search Bar */}
      <div className="flex justify-between mb-4">
        <TextInput
          type="text"
          placeholder="Search by bus number or status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link to={routes.busCreate}>
          <Button className="bg-blue-500">Create New Bus</Button>
        </Link>
      </div>

      {/* Buses Table */}
      <Table>
        <Table.Head>
          <Table.HeadCell>Bus Number</Table.HeadCell>
          <Table.HeadCell>Seats</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {buses.map((bus) => (
            <Table.Row key={bus._id}>
              <Table.Cell>{bus.bus_number}</Table.Cell>
              <Table.Cell>{bus.seats_count}</Table.Cell>
              <Table.Cell>{renderStatusTag(bus.status)}</Table.Cell>
              <Table.Cell className="flex gap-1">
              <Link to={`${routes.busEdit.replace(":id", bus._id)}`}>
                  <Button className="bg-blue-500">Edit</Button>
                </Link>
                <Button color="failure" onClick={() => handleDelete(bus._id)}>
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default BusList;
