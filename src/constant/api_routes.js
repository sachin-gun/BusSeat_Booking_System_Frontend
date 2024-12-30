const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_ROUTES = {
    REGISTER: `${API_BASE_URL}users`,
    LOGIN: `${API_BASE_URL}/login`,

    BUS_OPERATOR_LIST: `${API_BASE_URL}/bus-operators`,
    BUS_OPERATOR_CREATE: `${API_BASE_URL}/bus-operators`,
    BUS_OPERATOR_EDIT: `${API_BASE_URL}/bus-operator`,
    BUS_OPERATOR_UPDATE: `${API_BASE_URL}/bus-operators/:id`,
    BUS_OPERATOR_DELETE: `${API_BASE_URL}/bus-operators/:id`,

    ROUTE_LIST: `${API_BASE_URL}/routes`,
    ROUTE_CREATE: `${API_BASE_URL}/routes`,
    ROUTE_EDIT: `${API_BASE_URL}/route`,
    ROUTE_UPDATE: `${API_BASE_URL}/routes/:id`,
    ROUTE_DELETE: `${API_BASE_URL}/routes/:id`,

    BUS_LIST: `${API_BASE_URL}/buses`,
    BUS_CREATE: `${API_BASE_URL}/buses`,
    BUS_EDIT: `${API_BASE_URL}/bus`,
    BUS_UPDATE: `${API_BASE_URL}/buses/:id`,
    BUS_DELETE: `${API_BASE_URL}/buses/:id`,

    SCHEDULE_LIST: `${API_BASE_URL}/schedules`,
    SCHEDULE_CREATE: `${API_BASE_URL}/schedules`,
    SCHEDULE_EDIT: `${API_BASE_URL}/schedules`,
    SCHEDULE_UPDATE: `${API_BASE_URL}/schedules/:id`,
    SCHEDULE_DELETE: `${API_BASE_URL}/schedules`,

  };
  
  export default API_ROUTES;