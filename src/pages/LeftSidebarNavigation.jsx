import React from "react";
import { Link } from "react-router-dom";
import routes from "../constant/routes";

const LeftSidebarNavigation = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          My App
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
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
                to={routes.busList}
                className="block p-2 rounded hover:bg-gray-700 transition"
              >
                Bus
              </Link>
            </li>
           

           
          </ul>
        </nav>
      </div>

    
    </div>
  );
};

export default LeftSidebarNavigation;

