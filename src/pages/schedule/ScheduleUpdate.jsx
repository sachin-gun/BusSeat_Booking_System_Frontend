import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Select, TextInput } from 'flowbite-react';
import API_ROUTES from '../../constant/api_routes';

const ScheduleUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [scheduleData, setScheduleData] = useState({
    route_id: '',
    bus_id: '',
    start_time: '',
    end_time: '',
    status: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [routesResponse, busesResponse, scheduleResponse] = await Promise.all([
          axios.get(API_ROUTES.ROUTE_LIST), // Fetch routes 
          axios.get(API_ROUTES.BUS_LIST), // Fetch buses
          axios.get(`/api/schedules/${id}`), // Fetch specific schedule
        ]);

        setRoutes(routesResponse.data.routes || []);
        setBuses(busesResponse.data.buses || []);
        setScheduleData(scheduleResponse.data.schedule || {});
      } catch (err) {
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        await axios.post(API_ROUTES.SCHEDULE_CREATE, scheduleData); // Replace with your schedule creation API
        navigate('/schedules'); // Redirect to schedules list
    } catch (err) {
      setError('Failed to update schedule.');
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Update Schedule</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="route_id" className="block mb-1">
            Route
          </label>
          <Select
            id="route_id"
            name="route_id"
            value={scheduleData.route_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a Route</option>
            {routes.map((route) => (
              <option key={route._id} value={route._id}>
                {route.name}
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="bus_id" className="block mb-1">
            Bus
          </label>
          <Select
            id="bus_id"
            name="bus_id"
            value={scheduleData.bus_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a Bus</option>
            {buses.map((bus) => (
              <option key={bus._id} value={bus._id}>
                {bus.bus_number} - {bus.seats_count} Seats
              </option>
            ))}
          </Select>
        </div>

        <div>
          <label htmlFor="start_time" className="block mb-1">
            Start Time
          </label>
          <TextInput
            id="start_time"
            type="datetime-local"
            name="start_time"
            value={scheduleData.start_time}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="end_time" className="block mb-1">
            End Time
          </label>
          <TextInput
            id="end_time"
            type="datetime-local"
            name="end_time"
            value={scheduleData.end_time}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="status" className="block mb-1">
            Status
          </label>
          <Select
            id="status"
            name="status"
            value={scheduleData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="canceled">Canceled</option>
            <option value="finished">Finished</option>
          </Select>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Updating...' : 'Update Schedule'}
        </Button>
      </form>
    </div>
  );
};

export default ScheduleUpdate;
