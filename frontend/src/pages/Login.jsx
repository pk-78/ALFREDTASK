import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import { toast } from "react-hot-toast";
import url from "../service/url";

const LoginForm = () => {
  const [formData, setFormData] = useState({ userId: "", password: "" });
  const [error, setError] = useState(""); // Error state for displaying errors
  const navigate = useNavigate(); // For navigation after successful login
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before submission
    setLoading(true);

    try {
      const response = await axios.post(`${url}/user/loginUser`, formData);

      toast.success("Login Successful");
      // console.log(response.data.user._id);
      setId(response.data.user._id);
      navigate(`/${response.data.user._id}`); // Redirect to homepage or dashboard
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Failed to login";
      setError(errorMessage); // Set error message
      console.error(err);
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Login
        </h2>

        <input
          type="text"
          name="userId"
          placeholder="User ID"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.userId}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full flex justify-center items-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition mb-4"
        >
          {!loading ? (
            <div className="">Login</div>
          ) : (
            <div className="loader"></div>
          )}
        </button>

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
