// src/pages/Register.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // call backend register
      const res = await api.post("auth/register/", {
        username,
        password,
      });

      // backend already returns tokens after register (based on your backend code)
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);

      setSuccess("Account created successfully!");
      navigate("/"); // go to dashboard
    } catch (err) {
      setError("Registration failed. Try another username.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/preview.jpg')" }} // <-- put your image in public/images/
    >
      {/* Overlay Tint */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Form Box */}
      <div className="relative w-full max-w-sm bg-black/40 backdrop-blur-md shadow-lg rounded-xl px-8 py-6 text-white">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>

        {error && <p className="text-red-500 mb-3">{error}</p>}
        {success && <p className="text-green-500 mb-3">{success}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="w-full px-3 py-2 mb-3 border rounded focus:ring focus:ring-green-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 mb-3 border rounded focus:ring focus:ring-green-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
          >
            Register
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;