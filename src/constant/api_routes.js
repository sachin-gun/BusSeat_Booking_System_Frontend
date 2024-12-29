const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_ROUTES = {
    REGISTER: `${API_BASE_URL}users`,
    LOGIN: `${API_BASE_URL}/login`,

    BUS_OPERATOR_LIST: `${API_BASE_URL}/bus-operators`,
    BUS_OPERATOR_CREATE: `${API_BASE_URL}/bus-operators`,
    BUS_OPERATOR_EDIT: `${API_BASE_URL}/bus-operator`,
    BUS_OPERATOR_UPDATE: `${API_BASE_URL}/bus-operators`,

    ROUTE_LIST: `${API_BASE_URL}/routes`,
    ROUTE_CREATE: `${API_BASE_URL}/routes`,
    ROUTE_EDIT: `${API_BASE_URL}/route`,
    ROUTE_UPDATE: `${API_BASE_URL}/routes`

  };
  
  export default API_ROUTES;