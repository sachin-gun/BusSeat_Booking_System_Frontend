import React, { useState, useEffect } from "react";
import { Button, Card } from "flowbite-react";
import axios from "axios";
import API_ROUTES from "../../../constant/api_routes";
import { Link } from "react-router-dom";
import routes from "../../../constant/routes";

const RouteList = () => {
  // State for bus operators and search query
  const [busOperators, setBusOperators] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch data based on search query
  const fetchBusOperators = async (query = "") => {
    setLoading(true);

    try {
      const response = await axios.get(API_ROUTES.ROUTE_LIST, {
        params: { search_query: query },
      });

      console.log(response)

      setBusOperators(response?.data?.routes ?? []); 
    } catch (error) {
      console.error("Error fetching bus operators:", error);
      setBusOperators([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all data on initial render
  useEffect(() => {
    fetchBusOperators();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    // Fetch filtered data from the API
    fetchBusOperators(value);
  };

  return (
    <div className="p-4">
      <Card>
        <h2 className="text-center text-2xl font-bold mb-4">Route List</h2>

        {/* Search Input */}
        <div className="mb-4 flex gap-1">
          <input
            type="text"
            placeholder="Search by routes"
            value={searchText}
            onChange={handleSearch}
            className=" w-full p-2 border border-gray-300 rounded-lg"
          />
          <Link to={routes.busOperatorCreate}>
            <Button className="bg-blue-500">
                Add+
            </Button>
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Route Name</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Start Point</th>
                <th className="border border-gray-300 px-4 py-2 text-left">End Point</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Estimated Duration</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : busOperators.length > 0 ? (
                busOperators?.map((operator, index) => (
                  <tr key={index} className="even:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{operator.route_name}</td>
                    <td className="border border-gray-300 px-4 py-2">{operator.start_point}</td>
                    <td className="border border-gray-300 px-4 py-2">{operator.end_point}</td>
                    <td className="border border-gray-300 px-4 py-2">{operator.distance ?? 0}</td>
                    <td className="border border-gray-300 px-4 py-2">{operator.estimated_duration ?? 0}</td>
                    <td className="border border-gray-300 px-4 py-2">
                        <Link to={routes.routeEdit.replace(":id", operator._id)}>
                            <Button className="bg-green-500">Edit</Button>
                        </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default RouteList;
