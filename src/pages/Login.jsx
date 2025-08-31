// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("auth/login/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side with illustration */}
      <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center">
        <img
          src="/preview.jpg"
          alt="Login Illustration"
          className="w-3/4"
        />
      </div>

      {/* Right side with login form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/preview2.jpg" alt="Logo" className="w-12 h-12" />
          </div>

          <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back</h1>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition transform hover:scale-[1.02]"
            >
              Login
            </button>
          </form>

          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <Link to="/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
          </div>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
