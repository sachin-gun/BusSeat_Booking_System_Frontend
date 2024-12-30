import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import routes from "../constant/routes";

const LeftSidebarNavigation = () => {
  const { authState, logout } = useAuth(); // Get authState and logout function
  const role = authState?.user?.role; // Extract user role from authState

  const handleLogout = () => {
    const confirmation = window.confirm("Are you sure you want to logout?");
    if (confirmation) {
      logout(); 
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          Bus Ticket
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {/* Conditional Links for Admin */}
            {role === "admin" && (
              <>
                <li>
                  <Link
                    to={routes.operatorList}
                    className="block p-2 rounded hover:bg-gray-700 transition"
                  >
                    Operator
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.routeList}
                    className="block p-2 rounded hover:bg-gray-700 transition"
                  >
                    Routes
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.scheduleList}
                    className="block p-2 rounded hover:bg-gray-700 transition"
                  >
                    Schedule
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.permitList}
                    className="block p-2 rounded hover:bg-gray-700 transition"
                  >
                    Permit
                  </Link>
                </li>
              </>
            )}

            {/* Conditional Links for Bus Operator */}
            {role === "bus_operator" && (
              <>
                <li>
                  <Link
                    to={routes.busList}
                    className="block p-2 rounded hover:bg-gray-700 transition"
                  >
                    Bus
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.permitList}
                    className="block p-2 rounded hover:bg-gray-700 transition"
                  >
                    Permit
                  </Link>
                </li>
              </>
            )}

            {/* Conditional Links for Customer */}
            {role === "customer" && (
              <>
                <li>
                  <Link
                    to={routes.reservationCreate}
                    className="block p-2 rounded hover:bg-gray-700 transition"
                  >
                    Reserve
                  </Link>
                </li>
                <li>
                  <Link
                    to={routes.myBookings}
                    className="block p-2 rounded hover:bg-gray-700 transition"
                  >
                    My Booking
                  </Link>
                </li>
              </>
            )}

            {/* Logout Option */}
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left p-2 rounded hover:bg-red-700 transition bg-red-600"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default LeftSidebarNavigation;
