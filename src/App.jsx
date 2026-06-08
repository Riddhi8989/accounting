import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/register";
import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Purchase from "./pages/Purchase";
import Invoice from "./pages/Invoice";
import Navbar from "./components/Navbar";

function App() {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  return (
    <>
      {isLoggedIn && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="./pages/dashboard"
          element={
            isLoggedIn ? (
              <Dashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="./pages/sales"
          element={
            isLoggedIn ? (
              <Sales />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="./pages/purchase"
          element={
            isLoggedIn ? (
              <Purchase />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="./pages/invoice"
          element={
            isLoggedIn ? (
              <Invoice />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;