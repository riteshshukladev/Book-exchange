import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';  // or 'react-query' if using v3
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Signup />} path="/signup" />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;