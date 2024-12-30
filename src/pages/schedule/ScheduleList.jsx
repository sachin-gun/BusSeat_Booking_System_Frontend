import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button, Table } from 'flowbite-react';
import routes from '../../constant/routes';
import API_ROUTES from '../../constant/api_routes';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const { data } = await axios.get(API_ROUTES.SCHEDULE_LIST); // Replace with your schedule fetching API
        setSchedules(data.schedules || []);
      } catch (err) {
        setError('Error fetching schedules.');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Schedules</h2>
      <Link to={routes.scheduleCreate}>
        <Button className="mb-4 bg-blue-500">Create New Schedule</Button>
      </Link>
      <Table>
        <Table.Head>
          <Table.HeadCell>Route</Table.HeadCell>
          <Table.HeadCell>Bus</Table.HeadCell>
          <Table.HeadCell>Start Time</Table.HeadCell>
          <Table.HeadCell>End Time</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {schedules.map((schedule) => (
            <Table.Row key={schedule._id}>
              <Table.Cell>{schedule.route_id.route_name}</Table.Cell>
              <Table.Cell>{schedule.bus_id.bus_number}</Table.Cell>
              <Table.Cell>{new Date(schedule.start_time).toLocaleString()}</Table.Cell>
              <Table.Cell>{new Date(schedule.end_time).toLocaleString()}</Table.Cell>
              <Table.Cell>{schedule.status}</Table.Cell>
              <Table.Cell className="flex gap-2">
                <Link to={`${routes.scheduleEdit.replace(":id", schedule._id)}`}>
                  <Button className="bg-blue-500">Edit</Button>
                </Link>
                <Button
                  color="failure"
                  onClick={async () => {
                    if (window.confirm('Are you sure you want to delete this schedule?')) {
                      try {
                        await axios.delete(`${API_ROUTES.SCHEDULE_DELETE}?id=${schedule._id}`);
                        setSchedules((prev) =>
                          prev.filter((s) => s._id !== schedule._id)
                        );
                      } catch (err) {
                        alert('Failed to delete schedule.');
                      }
                    }
                  }}
                >
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

export default ScheduleList;
