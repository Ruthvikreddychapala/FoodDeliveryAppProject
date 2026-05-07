import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async () => {

    try {

      await API.post("/auth/register", {
        name,
        email,
        password,
        role,
      });

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message || "Registration Failed"
      );
    }
  };

  return (

    <div className="flex items-center justify-center min-h-screen bg-slate-950">

      <div className="bg-slate-900 p-10 rounded-2xl shadow-2xl w-[450px]">

        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white outline-none"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white outline-none"
        >

          <option value="">Select Role</option>

          <option value="customer">
            Customer
          </option>

          <option value="restaurant">
            Restaurant Owner
          </option>

          <option value="driver">
            Driver
          </option>

        </select>

        <button
          onClick={handleRegister}
          className="w-full bg-orange-500 hover:bg-orange-600 transition-all p-3 rounded-lg font-bold text-white"
        >
          Register
        </button>

        <p className="text-gray-400 text-center mt-6">
          Already have an account?
        </p>

        <Link to="/login">

          <button className="w-full mt-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all p-3 rounded-lg font-bold">

            Login

          </button>

        </Link>

      </div>

    </div>
  );
}