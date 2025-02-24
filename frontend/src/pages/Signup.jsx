import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import url from "../service/url";
import toast from "react-hot-toast";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    userId: "",

    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${url}/user/createUser`, formData);

      toast.success("User Created Successfully");
      console.log(response.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create user");
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Sign Up
        </h2>

        <input
          type="text"
          name="userId"
          placeholder="userId"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          onChange={handleChange}
          required
        />

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition mb-4"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
