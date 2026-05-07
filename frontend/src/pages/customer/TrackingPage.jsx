import Navbar from "../../components/Navbar";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function TrackingPage() {

  const restaurant = [17.4474, 78.3762];

  const driver = [17.4425, 78.4100];

  const customer = [17.4375, 78.4483];

  return (
    <div className="bg-gray-950 min-h-screen text-white">

      <Navbar />

      <div className="p-8">

        <div className="flex justify-between items-center mb-8">

          <div>

            <h1 className="text-5xl font-bold">
              Live Order Tracking
            </h1>

            <p className="text-gray-400 mt-2">
              Your order is on the way 🚗
            </p>

          </div>

          <div className="bg-orange-500 px-6 py-4 rounded-xl font-bold text-2xl">
            ETA 25 mins
          </div>

        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">

          <div className="bg-gray-900 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold">
              Restaurant
            </h2>

            <p className="text-gray-400 mt-2">
              Burger Palace
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold">
              Driver
            </h2>

            <p className="text-gray-400 mt-2">
              Rahul Kumar
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-2xl">
            <h2 className="text-2xl font-bold">
              Delivery Status
            </h2>

            <p className="text-green-400 mt-2 font-bold">
              On The Way
            </p>
          </div>

        </div>

        <div className="bg-gray-900 rounded-2xl overflow-hidden">

          <MapContainer
            center={driver}
            zoom={12}
            style={{
              height: "600px",
              width: "100%",
            }}
          >

            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={restaurant}>
              <Popup>
                Restaurant
              </Popup>
            </Marker>

            <Marker position={driver}>
              <Popup>
                Driver
              </Popup>
            </Marker>

            <Marker position={customer}>
              <Popup>
                Customer
              </Popup>
            </Marker>

            <Polyline
              positions={[
                restaurant,
                driver,
                customer,
              ]}
              color="orange"
            />

          </MapContainer>

        </div>

      </div>

    </div>
  );
}