import React, { useContext } from "react";
import { AuthContext } from "./AuthContext"; 

function LoginRegister() {

    const {isLogin, setIsLogin} = useContext(AuthContext);

    return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Tabs for Login/Register */}
        <div className="flex justify-between mb-6">
          <button
            className={`py-2 px-4 text-lg font-semibold cursor-pointer ${
              isLogin
                ? "border-b-2 border-blue-900 text-blue-900"
                : "text-gray-600"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`py-2 px-4 text-lg font-semibold cursor-pointer ${
              !isLogin
                ? "border-b-2 border-blue-900 text-blue-700"
                : "text-gray-600"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {isLogin ? (
          <div>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Login to Your Account
            </h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="login-email"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="login-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="login-password"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-600"
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
            <form>
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
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="register-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="register-password"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                  placeholder="Create a password"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="register-confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="register-confirm-password"
                  className="w-full mt-1 p-3 border border-gray-300 rounded-md"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-3 rounded-md hover:bg-blue-600"
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
