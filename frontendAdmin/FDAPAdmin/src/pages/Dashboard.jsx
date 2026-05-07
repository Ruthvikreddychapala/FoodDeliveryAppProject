import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaUsers,
  FaMotorcycle,
  FaClipboardList,
  FaSignOutAlt
} from "react-icons/fa";

function Dashboard() {

  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [selectedDrivers, setSelectedDrivers] = useState({});

  const token = localStorage.getItem("token");

  // FETCH USERS
  const fetchUsers = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/admin/pending",
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      setUsers(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/orders",
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      setOrders(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // FETCH DRIVERS
  const fetchDrivers = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/admin/drivers",
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      setDrivers(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  // APPROVE USER
  const approveUser = async (id) => {
    try {

      await axios.put(
        `http://localhost:5000/api/admin/approve/${id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      fetchUsers();

    } catch (error) {
      console.log(error);
    }
  };

  // ASSIGN DRIVER
  const assignDriver = async (orderId) => {

    try {

      const driverId = selectedDrivers[orderId];

      if (!driverId) {
        return alert("Select Driver");
      }

      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/assign-driver`,
        { driverId },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      fetchOrders();

    } catch (error) {
      console.log(error);
    }
  };

  // LOAD DATA
  useEffect(() => {

    fetchUsers();
    fetchOrders();
    fetchDrivers();

  }, []);

  return (

    <div className="min-h-screen bg-slate-950 text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-4xl font-bold mb-1">
            Admin Dashboard
          </h1>

          <p className="text-gray-400 text-base">
            Manage restaurants, drivers and orders
          </p>

        </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        {/* USERS */}
        <div className="bg-slate-900 p-6 rounded-2xl">

          <div className="flex items-center gap-3 text-blue-400 mb-3">

            <FaUsers size={20} />

            <h2 className="text-xl">
              Pending Users
            </h2>

          </div>

          <h1 className="text-4xl font-bold">
            {users.length}
          </h1>

        </div>

        {/* ORDERS */}
        <div className="bg-slate-900 p-6 rounded-2xl">

          <div className="flex items-center gap-3 text-blue-400 mb-3">

            <FaClipboardList size={20} />

            <h2 className="text-xl">
              Total Orders
            </h2>

          </div>

          <h1 className="text-4xl font-bold">
            {orders.length}
          </h1>

        </div>

        {/* DRIVERS */}
        <div className="bg-slate-900 p-6 rounded-2xl">

          <div className="flex items-center gap-3 text-blue-400 mb-3">

            <FaMotorcycle size={20} />

            <h2 className="text-xl">
              Approved Drivers
            </h2>

          </div>

          <h1 className="text-4xl font-bold">
            {drivers.length}
          </h1>

        </div>

      </div>

      {/* PENDING USERS */}
      <div className="bg-slate-900 p-6 rounded-2xl mb-10">

        <h2 className="text-3xl font-bold mb-6">
          Pending Approvals
        </h2>

        {users.length === 0 ? (

          <p className="text-gray-400 text-lg">
            No pending users
          </p>

        ) : (

          <div className="space-y-4">

            {users.map((user) => (

              <div
                key={user._id}
                className="bg-slate-800 p-5 rounded-xl flex justify-between items-center"
              >

                <div>

                  <h3 className="text-xl font-bold">
                    {user.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {user.email}
                  </p>

                </div>

                <button
                  onClick={() =>
                    approveUser(user._id)
                  }
                  className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg font-semibold"
                >
                  Approve
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* ORDERS */}
      <div>

        <h2 className="text-4xl font-bold mb-8">
          Orders
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-slate-900 p-5 rounded-2xl"
            >

              {/* TOP */}
              <div className="flex justify-between items-start mb-4">

                <div>

                  <h2 className="text-2xl font-bold">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <p className="text-gray-400 text-sm mt-1">
                    {order.user?.name}
                  </p>

                </div>

                <span className="bg-blue-500 px-3 py-1 rounded-full text-xs font-bold">
                  {order.status}
                </span>

              </div>

              {/* RESTAURANT */}
              <div className="bg-slate-800 p-4 rounded-xl mb-4">

                <p className="text-gray-400 text-sm mb-1">
                  Restaurant
                </p>

                <h3 className="text-lg font-bold">
                  {order.restaurant?.name || "N/A"}
                </h3>

              </div>

              {/* DRIVER SELECT */}
              <select
                value={
                  selectedDrivers[order._id] || ""
                }
                onChange={(e) =>
                  setSelectedDrivers({
                    ...selectedDrivers,
                    [order._id]: e.target.value
                  })
                }
                className="w-full p-3 rounded-xl bg-slate-700 mb-4 outline-none text-sm"
              >

                <option value="">
                  Select Driver
                </option>

                {drivers.map((driver) => (

                  <option
                    key={driver._id}
                    value={driver._id}
                  >
                    {driver.name}
                  </option>

                ))}

              </select>

              {/* BUTTON */}
              <button
                onClick={() =>
                  assignDriver(order._id)
                }
                className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-semibold"
              >
                Assign Driver
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;