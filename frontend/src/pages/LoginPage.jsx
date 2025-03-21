import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import {
  FaCommentDots,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUser,
} from "react-icons/fa";
import AuthImagePattern from "../component/AuthImagePattern"; // Ensure this component exists

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side - Form Section */}
      <div className="flex flex-col justify-center items-center p-8 sm:p-16 shadow-lg rounded-lg">
        <div className="w-full max-w-md space-y-8">
          {/* Logo & Title */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="size-14 rounded-xl bg-blue-100 flex items-center justify-center hover:bg-blue-200 transition-all">
                <FaCommentDots className="size-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-white">
                Login to Your Account
              </h1>
              <p className="text-white">Access your account and start chatting</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
              <input
                type="email"
                className="input input-bordered w-full pl-10 bg-gray-500 text-white"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10 bg-gray-500 text-white"
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-all flex items-center justify-center disabled:opacity-50"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <FaUser className="size-5 animate-spin mr-2" />
                  Logging In...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="text-center mt-4">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image Section */}
      <AuthImagePattern
        title="Welcome Back"
        subtitle="Login and start connecting with friends!"
      />
    </div>
  );
}

export default LoginPage;
