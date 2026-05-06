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
      alert("Failed to fetch users");
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
      alert("Failed to fetch orders");
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
      alert("Failed to fetch drivers");
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
      alert("Approval failed");
    }
  };

  // ASSIGN DRIVER
  const assignDriver = async (orderId) => {
    const driverId = selectedDrivers[orderId];

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
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px"
      }}
    >
      {/* MAIN CONTAINER */}
      <div
        style={{
          maxWidth: "1600px",
          margin: "0 auto"
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px"
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "34px",
                fontWeight: "700",
                marginBottom: "6px"
              }}
            >
              Food Delivery Admin
            </h1>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "15px"
              }}
            >
              Manage restaurants, drivers and orders
            </p>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            style={{
              background: "#ef4444",
              border: "none",
              color: "white",
              padding: "10px 16px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "28px",
            marginBottom: "40px"
          }}
        >
          {/* USERS */}
          <div
            style={{
              background: "#1e293b",
              borderRadius: "16px",
              padding: "20px"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px"
              }}
            >
              <FaUsers
                size={18}
                color="#60a5fa"
              />

              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "14px"
                }}
              >
                Pending Users
              </p>
            </div>

            <h2
              style={{
                fontSize: "28px",
                margin: 0
              }}
            >
              {users.length}
            </h2>
          </div>

          {/* ORDERS */}
          <div
            style={{
              background: "#1e293b",
              borderRadius: "16px",
              padding: "20px"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px"
              }}
            >
              <FaClipboardList
                size={18}
                color="#60a5fa"
              />

              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "14px"
                }}
              >
                Total Orders
              </p>
            </div>

            <h2
              style={{
                fontSize: "28px",
                margin: 0
              }}
            >
              {orders.length}
            </h2>
          </div>

          {/* DRIVERS */}
          <div
            style={{
              background: "#1e293b",
              borderRadius: "16px",
              padding: "20px"
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "12px"
              }}
            >
              <FaMotorcycle
                size={18}
                color="#60a5fa"
              />

              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "14px"
                }}
              >
                Available Drivers
              </p>
            </div>

            <h2
              style={{
                fontSize: "28px",
                margin: 0
              }}
            >
              {drivers.length}
            </h2>
          </div>
        </div>

        {/* PENDING USERS */}
        <div
          style={{
            background: "#1e293b",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "40px"
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              marginBottom: "20px"
            }}
          >
            Pending Users
          </h2>

          {users.length === 0 ? (
            <p
              style={{
                color: "#94a3b8",
                fontSize: "14px"
              }}
            >
              No pending users
            </p>
          ) : (
            users.map((user) => (
              <div
                key={user._id}
                style={{
                  background: "#0f172a",
                  borderRadius: "12px",
                  padding: "16px",
                  marginBottom: "14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "18px",
                      marginBottom: "4px"
                    }}
                  >
                    {user.name}
                  </h3>

                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "14px"
                    }}
                  >
                    {user.email}
                  </p>
                </div>

                <button
                  onClick={() =>
                    approveUser(user._id)
                  }
                  style={{
                    background: "#10b981",
                    border: "none",
                    color: "white",
                    padding: "10px 14px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "14px"
                  }}
                >
                  Approve
                </button>
              </div>
            ))
          )}
        </div>

        {/* ORDERS */}
        <div>
          <h2
            style={{
              fontSize: "28px",
              marginBottom: "22px"
            }}
          >
            Orders
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(460px, 1fr))",
              gap: "28px"
            }}
          >
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: "#1e293b",
                  borderRadius: "18px",
                  padding: "18px"
                }}
              >
                {/* TOP */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "18px"
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "18px",
                        marginBottom: "4px"
                      }}
                    >
                      Order #{order._id.slice(-6)}
                    </h3>

                    <p
                      style={{
                        color: "#94a3b8",
                        fontSize: "14px"
                      }}
                    >
                      Customer: {order.user?.name}
                    </p>
                  </div>

                  <div
                    style={{
                      background:
                        order.status === "delivered"
                          ? "#059669"
                          : order.status === "preparing"
                          ? "#d97706"
                          : "#2563eb",
                      padding: "6px 14px",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: "600"
                    }}
                  >
                    {order.status}
                  </div>
                </div>

                {/* RESTAURANT */}
                <div
                  style={{
                    background: "#0f172a",
                    borderRadius: "10px",
                    padding: "14px",
                    marginBottom: "16px"
                  }}
                >
                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "13px",
                      marginBottom: "6px"
                    }}
                  >
                    Restaurant
                  </p>

                  <h4
                    style={{
                      fontSize: "14px",
                      margin: 0
                    }}
                  >
                    {order.restaurant?.name ||
                      "Not Assigned"}
                  </h4>
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
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "none",
                    background: "#334155",
                    color: "white",
                    marginBottom: "14px",
                    fontSize: "14px"
                  }}
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
                  style={{
                    width: "100%",
                    background: "#2563eb",
                    border: "none",
                    color: "white",
                    padding: "10px",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "14px"
                  }}
                >
                  Assign Driver
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;