import { useState } from "react";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

export default function MenuManager() {

  const [foods, setFoods] = useState([
    {
      id: 1,
      name: "Chicken Burger",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },

    {
      id: 2,
      name: "Pepperoni Pizza",
      price: 349,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    },

    {
      id: 3,
      name: "Hyderabadi Biryani",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1701579231349-d7459c40919d",
    },
  ]);

  const addFood = () => {
    const newFood = {
      id: foods.length + 1,
      name: "New Food Item",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    };

    setFoods([...foods, newFood]);
  };

  const deleteFood = (id) => {
    setFoods(
      foods.filter((food) => food.id !== id)
    );
  };

  const editFood = (id) => {
    setFoods(
      foods.map((food) =>
        food.id === id
          ? {
              ...food,
              name: food.name + " Updated",
            }
          : food
      )
    );
  };

  return (
    <div className="bg-gray-950 min-h-screen text-white">

      <Navbar />

      <div className="p-8">

        <div className="flex justify-between items-center mb-10">

          <h1 className="text-5xl font-bold">
            Menu Management
          </h1>

          <div className="flex gap-4">

            <Link to="/restaurant/dashboard">
              <button className="bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl font-bold">
                Dashboard
              </button>
            </Link>

            <button
              onClick={addFood}
              className="bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-bold"
            >
              Add Food
            </button>

          </div>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {foods.map((food) => (

            <div
              key={food.id}
              className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg"
            >

              <img
                src={food.image}
                alt={food.name}
                className="w-full h-60 object-cover"
              />

              <div className="p-5">

                <h2 className="text-3xl font-bold">
                  {food.name}
                </h2>

                <p className="text-orange-400 text-2xl mt-2">
                  ₹ {food.price}
                </p>

                <div className="flex gap-3 mt-6">

                  <button
                    onClick={() => editFood(food.id)}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg w-full"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteFood(food.id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg w-full"
                  >
                    Delete
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