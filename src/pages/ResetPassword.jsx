import React, { useState } from "react";
import API from "../api/api";
import { useNavigate, useLocation, Link } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract token from query string
  const params = new URLSearchParams(location.search);
  const resetToken = params.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await API.post("/auth/reset-password", { resetToken, password });
      setMessage("Password reset successful! You can now log in.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="w-full max-w-md mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200 flex flex-col gap-6"
        >
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Reset Password</h2>
          <p className="text-center text-gray-500 mb-4">Enter your new password below.</p>
          <div className="mb-2 relative">
            <label className="block text-sm font-semibold mb-2">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12 transition"
              placeholder="Enter your new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-sm text-gray-500 hover:text-gray-700 font-medium"
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg font-bold text-lg shadow transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
          {message && <p className="mt-4 text-center text-sm text-blue-600">{message}</p>}
          <p className="mt-6 text-center text-sm">
            <Link to="/login" className="text-blue-500 hover:underline font-semibold">
              Back to Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
