import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table, TextInput } from "flowbite-react";
import axios from "axios";
import API_ROUTES from "../../../constant/api_routes";
import routes from "../../../constant/routes";

const RouteList = () => {
  const [busRoutes, setRoutes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch routes
  const fetchRoutes = async () => {
    try {
      const response = await axios.get(`${API_ROUTES.ROUTE_LIST}?search_query=${searchQuery}`);
      setRoutes(response.data.routes);
    } catch (error) {
      console.error("Error fetching routes:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete a route
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this route?")) {
      try {
        await axios.delete(`/api/routes/${id}`);
        setRoutes((prev) => prev.filter((route) => route._id !== id));
      } catch (error) {
        console.error("Error deleting route:", error);
      }
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, [searchQuery]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Routes</h1>

      {/* Search Bar */}
      <div className="flex justify-between gap-4 mb-4">
        <TextInput
          type="text"
          placeholder="Search by name, start, or end point"
          value={searchQuery}
          className="w-full"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link to={routes.routeCreate}>
          <Button className="bg-blue-500 w-48">Create New Route</Button>
        </Link>
      </div>

      {/* Routes Table */}
      <Table>
        <Table.Head>
          <Table.HeadCell>Route Name</Table.HeadCell>
          <Table.HeadCell>Start Point</Table.HeadCell>
          <Table.HeadCell>End Point</Table.HeadCell>
          <Table.HeadCell>Distance</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {busRoutes.map((route) => (
            <Table.Row key={route._id}>
              <Table.Cell>{route.route_name}</Table.Cell>
              <Table.Cell>{route.start_point}</Table.Cell>
              <Table.Cell>{route.end_point}</Table.Cell>
              <Table.Cell>{route.distance} km</Table.Cell>
              <Table.Cell className="flex gap-1">
              <Link to={`${routes.routeEdit.replace(":id", route._id)}`}>
                  <Button className="bg-green-500">Edit</Button>
                </Link>
                <Button color="failure" onClick={() => handleDelete(route._id)}>
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

export default RouteList;
