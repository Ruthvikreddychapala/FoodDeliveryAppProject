import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-950 min-h-screen text-white">
      <Navbar />

      <div className="p-8">
        <h1 className="text-5xl font-bold mb-10">
          Your Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center text-3xl mt-32">
            Cart is Empty
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-900 p-6 rounded-2xl flex justify-between items-center"
                >
                  <div className="flex gap-5 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 h-28 rounded-xl object-cover"
                    />

                    <div>
                      <h2 className="text-2xl font-bold">
                        {item.name}
                      </h2>

                      <p className="text-orange-400 text-xl">
                        ₹ {item.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="bg-red-500 px-4 py-2 rounded-lg"
                    >
                      -
                    </button>

                    <span className="text-2xl">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="bg-green-500 px-4 py-2 rounded-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-gray-900 p-6 rounded-2xl">
              <div className="flex justify-between text-3xl font-bold">
                <span>Total</span>
                <span>₹ {total}</span>
              </div>

              <Link to="/success">
                <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 py-4 rounded-xl text-2xl font-bold">
                  Proceed To Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}