import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import { useToast } from "../components/ui/use-toast";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginError("");
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      // Attach token to user object for AuthContext
      const userWithToken = { ...res.data.user, token: res.data.token };
      login(userWithToken); // update context immediately
      if (userWithToken.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      // Show a user-friendly error below the form for invalid credentials
      if (msg.toLowerCase().includes("invalid email or password")) {
        setLoginError("Please enter correct email or password.");
          toast({
            title: "Please enter correct email or password.",
            variant: "destructive",
          });
      } else if (msg.toLowerCase().includes("refresh token missing")) {
        setLoginError("Please enter correct email or password.");
          toast({
            title: "Please enter correct email or password.",
            variant: "destructive",
          });
      } else {
          toast({
            title: "Something went wrong. Please try again.",
            variant: "destructive",
          });
      }
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
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
            Login
          </h2>
          <p className="text-center text-gray-500 mb-4">
            Enter your email and password to access your account.
          </p>
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
          <div className="mb-2 relative">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12 transition"
              placeholder="Enter your password"
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
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="mt-2 text-center text-sm">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline font-semibold"
            >
              Forgot password?
            </Link>
          </p>
          <p className="mt-4 text-center text-sm">
            Don't have an account?
            <Link
              to="/register"
              className="text-blue-500 hover:underline ml-1 font-semibold"
            >
              Register
            </Link>
          </p>
          {loginError && (
            <div className="text-center text-red-600 font-medium text-sm mt-2">
              {loginError}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
