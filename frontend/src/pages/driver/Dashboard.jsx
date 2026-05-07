import { useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const [deliveries, setDeliveries] = useState([
    {
      id: 1,
      customer: "Rahul",
      address: "Madhapur, Hyderabad",
      status: "Assigned",
    },

    {
      id: 2,
      customer: "Ananya",
      address: "Gachibowli, Hyderabad",
      status: "Picked Up",
    },
  ]);

  const updateStatus = (id) => {
    setDeliveries(
      deliveries.map((delivery) => {

        if (delivery.id === id) {

          if (delivery.status === "Assigned") {
            return {
              ...delivery,
              status: "Picked Up",
            };
          }

          if (delivery.status === "Picked Up") {
            return {
              ...delivery,
              status: "On The Way",
            };
          }

          if (delivery.status === "On The Way") {
            return {
              ...delivery,
              status: "Delivered",
            };
          }
        }

        return delivery;
      })
    );
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white">

      <Navbar />

      <div className="p-8">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-5xl font-bold">
            Driver Dashboard
          </h1>

          <div className="bg-orange-500 px-6 py-4 rounded-xl text-2xl font-bold">
            Earnings ₹1240
          </div>

        </div>

        <div className="space-y-6">

          {deliveries.map((delivery) => (

            <div
              key={delivery.id}
              className="bg-gray-900 p-6 rounded-2xl shadow-lg"
            >

              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

                <div>

                  <h2 className="text-3xl font-bold">
                    {delivery.customer}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    {delivery.address}
                  </p>

                  <span className="inline-block mt-4 bg-blue-500 px-4 py-2 rounded-lg font-bold">
                    {delivery.status}
                  </span>

                </div>

                <div className="flex gap-4 flex-wrap">

                  <button
                    onClick={() => updateStatus(delivery.id)}
                    className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-bold"
                  >
                    Update Status
                  </button>

                  <button
                    onClick={() => navigate("/tracking")}
                    className="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-xl font-bold"
                  >
                    View Map
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}