import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  return (
    <div className="bg-gray-950 min-h-screen text-white">

      <Navbar />

      <div className="flex flex-col justify-center items-center h-[80vh] text-center px-6">

        <div className="bg-gray-900 p-12 rounded-3xl shadow-2xl max-w-2xl w-full">

          <div className="text-8xl mb-6">
            ✅
          </div>

          <h1 className="text-5xl font-bold text-green-400 mb-6">
            Payment Successful
          </h1>

          <p className="text-gray-400 text-xl mb-10">
            Your food order has been placed successfully.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">

            <div className="bg-gray-800 p-5 rounded-2xl">

              <h2 className="text-xl font-bold">
                Order ID
              </h2>

              <p className="text-orange-400 mt-2">
                #FD1024
              </p>

            </div>

            <div className="bg-gray-800 p-5 rounded-2xl">

              <h2 className="text-xl font-bold">
                Payment
              </h2>

              <p className="text-green-400 mt-2">
                Completed
              </p>

            </div>

            <div className="bg-gray-800 p-5 rounded-2xl">

              <h2 className="text-xl font-bold">
                ETA
              </h2>

              <p className="text-blue-400 mt-2">
                25 mins
              </p>

            </div>

          </div>

          <Link to="/tracking">

            <button className="bg-orange-500 hover:bg-orange-600 px-10 py-4 rounded-2xl text-2xl font-bold transition">
              Track Order
            </button>

          </Link>

        </div>

      </div>

    </div>
  );
}