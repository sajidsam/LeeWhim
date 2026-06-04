import React from "react";
import logo from "@/assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBagShopping,
  faCircleInfo,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faFacebook,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons"; // Note: Requires @fortawesome/free-brands-svg-icons

const footerLinks = [
  { label: "Home", icon: faHouse },
  { label: "Shop", icon: faBagShopping },
  { label: "About", icon: faCircleInfo },
  { label: "Contact", icon: faEnvelope },
];

const socialLinks = [
  { icon: faInstagram, url: "#" },
  { icon: faFacebook, url: "#" },
  { icon: faPinterest, url: "#" },
];

const Footer = () => {
  return (
    <footer className="mx-6 mb-6 mt-12">
      <section className="bg-[#dd5b89] rounded-[2.5rem] px-10 py-12 text-white flex flex-col md:flex-row flex-wrap justify-between items-center gap-8 shadow-lg">
        
        {/* Left Side: Brand & Logo */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <img
            src={logo}
            alt="Lee's Whim Logo"
            className="h-14 w-auto object-contain brightness-100 invert-0"
          />
          <p className="text-white/80 text-sm font-light text-center md:text-left max-w-xs">
            Adding a touch of whimsy and elegance to your everyday style.
          </p>
        </div>

        {/* Center: Reusable Nav Links with Navbar Hover Styles */}
        <div className="flex flex-wrap justify-center gap-4">
          {footerLinks.map((item) => (
            <a
              key={item.label}
              href={`#${item.label.toLowerCase()}`}
              className="
                relative
                group
                overflow-hidden
                flex
                items-center
                gap-2
                px-4
                py-2
                text-sm
                font-medium
                tracking-wide
                transition-all
                duration-300
                hover:bg-white/15
                hover:backdrop-blur-xl
                hover:border
                hover:border-white/20
                hover:shadow-[0_8px_30px_rgba(255,255,255,0.15)]
                rounded-xl
              "
            >
              {/* Glossy Shine Effect */}
              <span className="absolute top-0 left-[-150%] h-full w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 group-hover:left-[150%] transition-all duration-700" />
              
              <FontAwesomeIcon icon={item.icon} className="text-xs group-hover:scale-110 transition-transform duration-300" />
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Right Side: Social Icons & Copyright */}
        <div className="flex flex-col items-center md:items-end space-y-4">
          {/* Social Media Row */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-white/30 bg-white/5 hover:bg-white text-white hover:text-[#dd5b89] transition-all duration-300 shadow-md hover:scale-105"
              >
                <FontAwesomeIcon icon={social.icon} className="text-lg" />
              </a>
            ))}
          </div>

          {/* Copyright text */}
          <p className="text-xs text-white/60 font-light tracking-wide">
            &copy; {new Date().getFullYear()} Lee's Whim. All rights reserved.
          </p>
        </div>

      </section>
    </footer>
  );
};

export default Footer;