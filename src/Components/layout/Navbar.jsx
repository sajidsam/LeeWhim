import React from "react";
import logo from "@/assets/logo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBagShopping,
  faCircleInfo,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const navItems = [
  {
    label: "Home",
    icon: faHouse,
  },
  {
    label: "Shop",
    icon: faBagShopping,
  },
  {
    label: "About",
    icon: faCircleInfo,
  },
  {
    label: "Contact",
    icon: faEnvelope,
  },
];

const Navbar = () => {
  return (
    <nav className="mx-6 mt-4">
      <section className="bg-[#dd5b89] rounded-full h-24 px-10 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center">
          <img
            src={logo}
            alt="Lee's Whim Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <button
              key={item.label}
              className="
                relative
                group
                overflow-hidden

                flex
                flex-col
                items-center
                justify-center

                px-5
                py-2

                text-white
                transition-all
                duration-300

                hover:bg-white/15
                hover:backdrop-blur-xl
                hover:border
                hover:border-white/20
                hover:shadow-[0_8px_30px_rgba(255,255,255,0.2)]
                rounded-2xl
              "
            >
              {/* Glossy Shine Effect */}
              <span
                className="
                  absolute
                  top-0
                  left-[-150%]
                  h-full
                  w-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-white/40
                  to-transparent
                  skew-x-12
                  group-hover:left-[150%]
                  transition-all
                  duration-700
                "
              />

              {/* Icon */}
              <FontAwesomeIcon
                icon={item.icon}
                className="
                  relative
                  z-10
                  text-xl
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />

              {/* Text */}
              <span
                className="
                  relative
                  z-10
                  text-xs
                  font-medium
                  tracking-wider
                  uppercase
                "
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>

      </section>
    </nav>
  );
};

export default Navbar;