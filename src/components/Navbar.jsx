import React from "react";
import { Link } from "react-router";

function Navbar() {
  return (
    <div className="navbar bg-[#C8A27A] flex justify-between items-center p-2">
      <Link to="/" className="font-bold text-xl italic">
        KIRAA
      </Link>

      <div className="navbar_content flex justify-center gap-6 md:gap-24 text-sm md:text-base">
        <Link to="/" className="px-4 py-2 hover:text-red-50 transition">
          Home
        </Link>

        <Link to="/products" className="px-4 py-2 hover:text-red-50 transition">
          Ethnic Wear
        </Link>

        <Link to="/products" className="px-4 py-2 hover:text-red-50 transition">
          Traditional
        </Link>

        <Link to="/products" className="px-4 py-2 hover:text-red-50 transition">
          Party Wear
        </Link>

        <Link to="/orders" className="px-4 py-2 hover:text-red-50 transition">
          Your Orders
        </Link>

        <Link to="/cart" className="px-4 py-2 hover:text-red-50 transition">
          Cart
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
