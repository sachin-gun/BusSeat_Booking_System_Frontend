import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Select, TextInput } from 'flowbite-react';
import API_ROUTES from '../../constant/api_routes';
import routes from '../../constant/routes';

const ScheduleCreate = () => {
  const [busRoutes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [scheduleData, setScheduleData] = useState({
    route_id: '',
    bus_id: '',
    start_time: '',
    end_time: '',
    status: 'active',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch routes
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const { data } = await axios.get(API_ROUTES.ROUTE_LIST); // Replace with your route fetching API
        setRoutes(data.routes || []);
      } catch (err) {
        console.error('Error fetching routes:', err);
      }
    };

    const fetchBuses = async () => {
      try {
        const { data } = await axios.get(API_ROUTES.BUS_LIST); // Replace with your bus fetching API
        setBuses(data.buses || []);
      } catch (err) {
        console.error('Error fetching buses:', err);
      }
    };

    fetchRoutes();
    fetchBuses();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(API_ROUTES.SCHEDULE_CREATE, scheduleData); // Replace with your schedule creation API
      setLoading(false);
      navigate(routes.scheduleList); // Redirect to schedules list after success
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create schedule.');
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Create Schedule</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Route Selection */}
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
            {busRoutes.map((route) => (
              <option key={route._id} value={route._id}>
                {route.route_name} {/* Adjust this based on your route schema */}
              </option>
            ))}
          </Select>
        </div>

        {/* Bus Selection */}
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

        {/* Start Time */}
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

        {/* End Time */}
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


        {/* Submit Button */}
        <div>
          <Button type="submit" disabled={loading} className='bg-blue-500'>
            {loading ? 'Creating...' : 'Create Schedule'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleCreate;
