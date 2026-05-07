import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">

      <div className="bg-slate-900 p-10 rounded-2xl shadow-2xl w-[450px]">

        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white outline-none"
        />

        <select className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white outline-none">

          <option>Select Role</option>

          <option>Customer</option>

          <option>Restaurant Owner</option>

          <option>Driver</option>

        </select>

        <button
          onClick={() => navigate("/")}
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