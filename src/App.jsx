import { Route } from "react-router-dom";
import Login from "../src/pages/Login";
import Signup from "../src/pages/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Signup />} path="/signup" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
