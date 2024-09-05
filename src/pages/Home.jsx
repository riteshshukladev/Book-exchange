import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Toaster } from "../components/ui/toaster";
import { useQuery } from "@tanstack/react-query";
import { fetchPendingRequests } from "@/services/authService";

const Home = () => {
  const location = useLocation();
  const [showCount, setShowCount] = useState(true);
  const {
    data: requestCount,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["pendingRequests"],
    queryFn: fetchPendingRequests,
    refetchInterval: 60000, // Refetch every minute
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    setShowCount(location.pathname !== "/exchanges");
  }, [location.pathname]);

  console.log("Request Count:", requestCount);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/profile" className="text-decoration-none">
              <h1 className="text-xl font-semibold text-gray-800">Hey!!</h1>
            </Link>
            <nav>
              <ul className="flex space-x-6">
                {["books", "filter", "matchmaking", "exchanges", "profile"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        to={item.toLowerCase()}
                        className={`text-gray-600 hover:text-gray-900 transition-colors relative ${
                          location.pathname === `/${item.toLowerCase()}`
                            ? "text-blue-500"
                            : ""
                        }`}
                      >
                        {item}
                        {item === "exchanges" &&
                          showCount &&
                          requestCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                              {requestCount}
                            </span>
                          )}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow bg-gray-100">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
};

export default Home;
