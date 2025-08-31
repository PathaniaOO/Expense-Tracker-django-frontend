// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BanknotesIcon } from "@heroicons/react/24/solid";

function Header() {
  const navigate = useNavigate();
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-gray-900 dark:text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo / App Name */}
        <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          <BanknotesIcon className="w-6 h-6 text-green-600" />
              Expense Tracker
        </h1>

        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
          >
            {dark ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
