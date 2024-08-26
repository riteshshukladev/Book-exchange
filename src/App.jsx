import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // or 'react-query' if using v3
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import ProtectedRoute from "./components/protected-route/protectedRoute";
import Home from "./pages/Home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
