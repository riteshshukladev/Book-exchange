import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // or 'react-query' if using v3
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import Home from "./pages/Home";

import MatchMaking from './components/user-pages/MatchMaking'
import BookListing from "./components/user-pages/BookListing";
import FilterBooks from "./components/user-pages/FilterBooks";
import Profile from "./components/user-pages/Profile";
const queryClient = new QueryClient();
import ExchangesPage from "./components/user-pages/ExchangesPage";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route path ="books" element = {<BookListing/>}/>
            <Route path="filter" element={<FilterBooks />} />
            <Route path="matchmaking" element={<MatchMaking />} />
            <Route path="profile" element={<Profile />} />
            <Route path="exchanges" element={<ExchangesPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
