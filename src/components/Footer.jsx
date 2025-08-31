// src/components/Footer.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, List, Wallet, CreditCard, TrendingUp, Repeat } from "lucide-react";

function Footer() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Dashboard", icon: <Home size={20} /> },
    { to: "/categories", label: "Categories", icon: <List size={20} /> },
    { to: "/accounts", label: "Accounts", icon: <Wallet size={20} /> },
    { to: "/expenses", label: "Expenses", icon: <CreditCard size={20} /> },
    { to: "/incomes", label: "Incomes", icon: <TrendingUp size={20} /> },
    { to: "/transfers", label: "Transfers", icon: <Repeat size={20} /> },
  ];

  return (
    <footer className="bg-white border-t shadow-inner sticky bottom-0">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-around">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex flex-col items-center text-sm ${
              location.pathname === link.to
                ? "text-indigo-600 font-semibold"
                : "text-gray-600 hover:text-indigo-500"
            }`}
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>
    </footer>
  );
}

export default Footer;
