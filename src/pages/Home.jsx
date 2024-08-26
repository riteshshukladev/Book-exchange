import React, { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { isAuthenticated } from "../services/authService";

const Home = () => {

  return (
    <div>
            <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4">
          <li>
            <Link to="add-book" className="text-white hover:text-gray-400">
              Add Book
            </Link>
          </li>
          <li>
            <Link to="book-filter" className="text-white hover:text-gray-400">
              Filter Books
            </Link>
          </li>
          <li>
            <Link to="book-matchmaking" className="text-white hover:text-gray-400">
              Matchmaking
            </Link>
          </li>
          <li>
            <Link to="user-profile" className="text-white hover:text-gray-400">
              Profile
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default Home;
