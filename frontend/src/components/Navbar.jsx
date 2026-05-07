import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Cart", path: "/cart" },
    { name: "Tracking", path: "/tracking" },
    { name: "Restaurant", path: "/restaurant/dashboard" },
    { name: "Driver", path: "/driver/dashboard" },
  ];

  return (
    <nav className="bg-black text-white px-8 py-5 flex justify-between items-center shadow-lg sticky top-0 z-50">
      <h1 className="text-3xl font-bold text-orange-500">
        FoodExpress
      </h1>

      <div className="flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`transition duration-300 hover:text-orange-400 ${
              location.pathname === item.path
                ? "text-orange-500 font-bold"
                : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}