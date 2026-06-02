import React from "react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <section className="bg-[#dd5b89] flex justify-around items-center gap-6 mx-6 py-4 h-20">

      {/* Logo */}
      <div className="h-50 w-46 flex align-middle">
        <img
          src={logo}
          alt="Leeswhim Logo"
          className="object-fill"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-6 text-white font-medium">
        <button className="hover:text-black transition">Home</button>
        <button className="hover:text-black transition">Shop</button>
        <button className="hover:text-black transition">About</button>
        <button className="hover:text-black transition">Contact</button>
      </div>

    </section>
  );
};

export default Navbar;