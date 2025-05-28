import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { AuthContext } from "./AuthContext";

function LoginRegister() {
  const { setIsLogin } = useContext(AuthContext);
  const [isLoginForm, setIsLoginForm] = useState(true);

  //view password
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] =
    useState(false);

  // Login State
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Registration State
  const [registerName, setRegisterName] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(""); // For successful registration message

  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setLoginError("");
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        {
          identifier: loginIdentifier,
          password: loginPassword,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        setIsLogin(true);
        navigate(`/userprofile`);
      } else {
        setLoginError(response.data?.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError(
        error.response?.data?.message ||
          "Failed to connect to the server or an unexpected error occurred."
      );
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    setRegisterError("");
    setRegisterSuccess("");

    if (registerPassword !== registerConfirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, {
        name: registerName,
        username: registerUsername,
        email: registerEmail,
        password: registerPassword,
      });

      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        setRegisterSuccess("Registration successful! You can now log in.");
        // Optionally, switch to login form after a short delay
        setTimeout(() => {
          setIsLoginForm(true);
          // Clear registration form fields
          setRegisterName("");
          setRegisterUsername("");
          setRegisterEmail("");
          setRegisterPassword("");
          setRegisterConfirmPassword("");
          setRegisterError("");
        }, 1500);
      } else {
        setRegisterError(response.data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setRegisterError(
        error.response?.data?.message ||
          "Failed to connect to the server or an unexpected error occurred."
      );
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Tabs for Login/Register */}
        <div className="flex justify-between mb-6">
          <button
            className={`py-2 px-4 text-lg font-semibold cursor-pointer ${
              isLoginForm
                ? "border-b-2 border-blue-700 text-blue-700"
                : "text-gray-600"
            }`}
            onClick={() => setIsLoginForm(true)}
          >
            Login
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold cursor-pointer ${
              !isLoginForm
                ? "border-b-2 border-blue-700 text-blue-700"
                : "text-gray-600"
            }`}
            onClick={() => setIsLoginForm(false)}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {isLoginForm ? (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Login to Your Account
            </h2>
            {loginError && <p className="text-red-500 mb-4">{loginError}</p>}
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="login-identifier"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username or Email
                </label>
                <input
                  type="text"
                  id="login-identifier"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your username or email"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    id="login-password"
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md pr-12"
                    placeholder="Enter your password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3 top-3 text-sm text-blue-600 hover:underline"
                  >
                    {showLoginPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Login
              </button>
            </form>
          </div>
        ) : (
          // Register Form
          <div>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Create an Account
            </h2>
            {registerError && (
              <p className="text-red-500 mb-4">{registerError}</p>
            )}
            {registerSuccess && (
              <p className="text-green-500 mb-4">{registerSuccess}</p>
            )}
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="register-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="register-name"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your full name"
                  required
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="register-username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="register-username"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                  placeholder="Choose a username"
                  required
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="register-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="register-email"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                  required
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showRegisterPassword ? "text" : "password"}
                    id="register-password"
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md pr-12"
                    placeholder="Create a password"
                    required
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowRegisterPassword(!showRegisterPassword)
                    }
                    className="absolute right-3 top-3 text-sm text-blue-600 hover:underline"
                  >
                    {showRegisterPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="register-confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showRegisterConfirmPassword ? "text" : "password"}
                    id="register-confirm-password"
                    className="w-full mt-1 p-3 border border-gray-300 rounded-md pr-12"
                    placeholder="Confirm your password"
                    required
                    value={registerConfirmPassword}
                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowRegisterConfirmPassword(
                        !showRegisterConfirmPassword
                      )
                    }
                    className="absolute right-3 top-3 text-sm text-blue-600 hover:underline"
                  >
                    {showRegisterConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-700 text-white py-3 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Register
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginRegister;
