import Navbar from "../../components/Navbar";
import { useCart } from "../../context/CartContext";

export default function MenuPage() {

  const { addToCart } = useCart();

  const menu = [
    {
      id: 1,
      name: "Chicken Burger",
      price: 199,
      category: "Burger",
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },

    {
      id: 2,
      name: "Pepperoni Pizza",
      price: 349,
      category: "Pizza",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    },

    {
      id: 3,
      name: "Hyderabadi Biryani",
      price: 299,
      category: "Biryani",
      image:
        "https://images.unsplash.com/photo-1701579231349-d7459c40919d",
    },

    {
      id: 4,
      name: "French Fries",
      price: 149,
      category: "Snacks",
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877",
    },

    {
      id: 5,
      name: "Chicken Wings",
      price: 249,
      category: "Starter",
      image:
        "https://images.unsplash.com/photo-1608039755401-742074f0548d",
    },

    {
      id: 6,
      name: "Chocolate Shake",
      price: 179,
      category: "Drinks",
      image:
        "https://images.unsplash.com/photo-1572490122747-3968b75cc699",
    },
  ];

  return (
    <div className="bg-gray-950 min-h-screen text-white">

      <Navbar />

      <div className="p-8">

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-12">

          <div>

            <h1 className="text-6xl font-bold">
              Restaurant Menu
            </h1>

            <p className="text-gray-400 text-xl mt-4">
              Choose your favorite dishes
            </p>

          </div>

          <div className="bg-orange-500 px-6 py-4 rounded-2xl text-2xl font-bold">
            Live Kitchen 🍔
          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {menu.map((item) => (

            <div
              key={item.id}
              className="bg-gray-900 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition duration-300"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">

                <div className="flex justify-between items-center mb-3">

                  <h2 className="text-3xl font-bold">
                    {item.name}
                  </h2>

                  <span className="bg-blue-500 px-3 py-1 rounded-lg text-sm font-bold">
                    {item.category}
                  </span>

                </div>

                <p className="text-orange-400 text-2xl font-bold">
                  ₹ {item.price}
                </p>

                <button
                  onClick={() => addToCart(item)}
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl text-xl font-bold transition"
                >
                  Add To Cart
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}