import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function Home() {

  const restaurants = [
    {
      id: 1,
      name: "Burger Palace",
      cuisine: "Fast Food",
      rating: 4.5,
      delivery: "25 mins",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    },

    {
      id: 2,
      name: "Pizza Hub",
      cuisine: "Italian",
      rating: 4.3,
      delivery: "30 mins",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    },

    {
      id: 3,
      name: "Biryani House",
      cuisine: "Indian",
      rating: 4.8,
      delivery: "20 mins",
      image:
        "https://images.unsplash.com/photo-1701579231349-d7459c40919d",
    },

    {
      id: 4,
      name: "Sushi World",
      cuisine: "Japanese",
      rating: 4.6,
      delivery: "35 mins",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
    },
  ];

  return (
    <div className="bg-gray-950 min-h-screen text-white">

      <Navbar />

      <div className="p-8">

        <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-12">

          <div>

            <h1 className="text-6xl font-bold">
              Discover Restaurants
            </h1>

            <p className="text-gray-400 text-xl mt-4">
              Order food from top restaurants near you
            </p>

          </div>

          <input
            type="text"
            placeholder="Search restaurants..."
            className="bg-gray-900 px-6 py-4 rounded-2xl outline-none w-full lg:w-[400px]"
          />

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {restaurants.map((restaurant) => (

            <div
              key={restaurant.id}
              className="bg-gray-900 rounded-3xl overflow-hidden shadow-xl hover:scale-105 transition duration-300"
            >

              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">

                <div className="flex justify-between items-center mb-3">

                  <h2 className="text-3xl font-bold">
                    {restaurant.name}
                  </h2>

                  <span className="bg-green-500 px-3 py-1 rounded-lg text-sm font-bold">
                    ⭐ {restaurant.rating}
                  </span>

                </div>

                <p className="text-gray-400">
                  {restaurant.cuisine}
                </p>

                <p className="text-orange-400 mt-2">
                  🚚 {restaurant.delivery}
                </p>

                <Link to="/menu">

                  <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 py-3 rounded-xl text-xl font-bold transition">
                    View Menu
                  </button>

                </Link>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}