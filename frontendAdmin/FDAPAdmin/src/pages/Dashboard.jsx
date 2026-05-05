import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [driverId, setDriverId] = useState("");

  const token = localStorage.getItem("token");

  // Fetch pending users
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/pending", {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      setUsers(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch users");
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      setOrders(res.data);
    } catch (error) {
      alert("Failed to fetch orders");
    }
  };

  // Fetch drivers
  const fetchDrivers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/drivers", {
        headers: {
          Authorization: "Bearer " + token
        }
      });

      setDrivers(res.data);
    } catch (error) {
      alert("Failed to fetch drivers");
    }
  };

  // Approve user
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

      alert("User Approved");
      fetchUsers();
    } catch (error) {
      alert("Approval failed");
    }
  };

  // Assign driver
  const assignDriver = async (orderId) => {
    if (!driverId) {
      alert("Please select a driver");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/assign-driver`,
        { driverId },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      alert("Driver Assigned");
      fetchOrders();
    } catch (error) {
      alert("Assignment failed");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchOrders();
    fetchDrivers();
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <h2>Admin Dashboard</h2>

      {/* -------- Pending Users -------- */}
      <h3>Pending Users</h3>

      {users.length === 0 ? (
        <p>No pending users</p>
      ) : (
        users.map((user) => (
          <div key={user._id} style={{ marginBottom: "15px" }}>
            <strong>{user.name}</strong> ({user.role}) - {user.email}
            <br />
            <button onClick={() => approveUser(user._id)}>
              Approve
            </button>
          </div>
        ))
      )}

      <hr />

      {/* -------- Orders Section -------- */}
      <h3>Orders</h3>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={{ marginBottom: "20px" }}>
            <strong>Order ID:</strong> {order._id} <br />
            <strong>User:</strong> {order.user?.name} <br />
            <strong>Restaurant:</strong> {order.restaurant?.name} <br />
            <strong>Status:</strong> {order.status} <br />

            <select onChange={(e) => setDriverId(e.target.value)}>
              <option value="">Select Driver</option>
              {drivers.map((driver) => (
                <option key={driver._id} value={driver._id}>
                  {driver.name} ({driver.email})
                </option>
              ))}
            </select>

            <br /><br />

            <button onClick={() => assignDriver(order._id)}>
              Assign Driver
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;