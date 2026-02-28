import React, { useState } from "react";
import API from "../api/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      await API.post("/auth/forgot-password", { email });
      setMessage("Password reset link sent! Check your email.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending reset link.");
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
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Forgot Password</h2>
          <p className="text-center text-gray-500 mb-4">Enter your email to receive a password reset link.</p>
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              placeholder="Enter your email address"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg font-bold text-lg shadow transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          {message && <p className="mt-4 text-center text-sm text-blue-600">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
