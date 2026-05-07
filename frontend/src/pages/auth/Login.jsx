import React from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950">

      <div className="bg-slate-900 p-10 rounded-2xl shadow-2xl w-[400px]">

        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-slate-800 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg bg-slate-800 text-white outline-none"
        />

        <button
          onClick={() => navigate("/")}
          className="w-full bg-orange-500 hover:bg-orange-600 transition-all p-3 rounded-lg font-bold text-white"
        >
          Login
        </button>

        <p className="text-gray-400 text-center mt-6">
          Don’t have an account?
        </p>

        <Link to="/register">
          <button className="w-full mt-3 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-all p-3 rounded-lg font-bold">
            Register
          </button>
        </Link>

      </div>

    </div>
  );
}