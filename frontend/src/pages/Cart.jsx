import Navbar from "../components/Navbar";

import {
  useCart
} from "../context/CartContext";

import {
  useNavigate
} from "react-router-dom";

export default function CartPage() {

  const navigate =
    useNavigate();

  const {
    cart,
    increaseQty,
    decreaseQty,
    clearCart
  } = useCart();

  const total =
    cart.reduce(
      (acc, item) =>
        acc +
        item.price *
          item.quantity,
      0
    );

  // PLACE ORDER
  const placeOrder =
    async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        if (!token) {

          alert(
            "Please login first"
          );

          return;
        }

        const restaurantId =
          cart[0]
            ?.restaurantId;

        const items =
          cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity:
              item.quantity
          }));

        const response =
          await fetch(
            "http://localhost:5000/api/orders",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",

                Authorization:
                  `Bearer ${token}`
              },

              body: JSON.stringify(
                {
                  restaurantId,
                  items,
                  totalPrice:
                    total
                }
              )
            }
          );

        const data =
          await response.json();

        console.log(data);

        clearCart();

        navigate(
          `/tracking/${data._id}`
        );

      } catch (error) {

        console.log(error);

      }
    };

  return (

    <div className="bg-slate-950 min-h-screen text-white">

      <Navbar />

      <div className="p-8">

        <h1 className="text-5xl font-bold mb-10">

          Your Cart

        </h1>

        {cart.length === 0 ? (

          <div className="text-center text-3xl mt-32 text-gray-400">

            Cart is Empty

          </div>

        ) : (

          <>

            <div className="space-y-6">

              {cart.map(
                (item) => (

                  <div
                    key={item.id}
                    className="bg-slate-900 p-6 rounded-2xl flex justify-between items-center"
                  >

                    <div>

                      <h2 className="text-2xl font-bold">

                        {item.name}

                      </h2>

                      <p className="text-orange-400 text-xl mt-2">

                        ₹
                        {" "}
                        {item.price}

                      </p>

                    </div>

                    <div className="flex items-center gap-4">

                      <button
                        onClick={() =>
                          decreaseQty(
                            item.id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 w-12 h-12 rounded-xl text-2xl font-bold"
                      >

                        -

                      </button>

                      <span className="text-2xl font-bold">

                        {
                          item.quantity
                        }

                      </span>

                      <button
                        onClick={() =>
                          increaseQty(
                            item.id
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 w-12 h-12 rounded-xl text-2xl font-bold"
                      >

                        +

                      </button>

                    </div>

                  </div>
                )
              )}

            </div>

            {/* TOTAL */}
            <div className="mt-10 bg-slate-900 p-8 rounded-2xl">

              <div className="flex justify-between text-3xl font-bold mb-8">

                <span>
                  Total
                </span>

                <span className="text-green-400">

                  ₹ {total}

                </span>

              </div>

              <button
                onClick={
                  placeOrder
                }
                className="w-full bg-orange-500 hover:bg-orange-600 py-4 rounded-xl text-2xl font-bold"
              >

                Place Order

              </button>

            </div>

          </>

        )}

      </div>

    </div>
  );
}