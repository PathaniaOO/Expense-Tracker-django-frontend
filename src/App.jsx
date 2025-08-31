import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Categories from "./pages/Category";
import Accounts from "./pages/Accounts";
import Expenses from "./pages/Expenses";
import Incomes from "./pages/Incomes";
import Transfers from "./pages/Transfers";
import Layout from "./components/Layout";

// Check if user is logged in
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("access"); // adjust key if different
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private route */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <Categories />
            </PrivateRoute>
          }
        />

        <Route
          path="/accounts"
          element={
            <PrivateRoute>
              <Accounts />
            </PrivateRoute>
          }
        />

        <Route
          path="/expenses"
          element={
            <PrivateRoute>
              <Expenses />
            </PrivateRoute>
          }
        />
        <Route
          path="/incomes"
          element={
            <PrivateRoute>
              <Incomes />
            </PrivateRoute>
          }
        />
        <Route
          path="/transfers"
          element={
            <PrivateRoute>
              <Transfers />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="incomes" element={<Incomes />} />
          <Route path="transfers" element={<Transfers />} />
        </Route>
        {/* Catch-all → redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
