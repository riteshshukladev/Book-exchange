import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import Home from "./pages/Home";
import MatchMaking from "./components/user-pages/MatchMaking";
import BookListing from "./components/user-pages/BookListing";
import FilterBooks from "./components/user-pages/FilterBooks";
import Profile from "./components/user-pages/Profile";
import ExchangesPage from "./components/user-pages/ExchangesPage";
import ExchangeRequest from "./components/exchanges/ExchangeRequest";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* Protected routes */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<BookListing />} />
            <Route path="exchange" element={<FilterBooks />} />
            <Route path="finds" element={<MatchMaking />} />
            <Route path="profile" element={<Profile />} />
            <Route path="record" element={<ExchangesPage />} />
            <Route path="exchange-request/:bookId" element={<ExchangeRequest />} /> 

          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
