
import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Toaster } from "../components/ui/toaster";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-semibold text-gray-800">Hey, John!</h1>
            <nav>
              <ul className="flex space-x-6">
                {["add-book", "book-filter", "book-matchmaking","exchanges", "user-profile"].map((item) => (
                  <li key={item}>
                    <Link
                      to={item.toLowerCase()}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-grow bg-gray-100">
        <Outlet />
      </main>
      <Toaster></Toaster>
    </div>
  );
};

export default Home;
