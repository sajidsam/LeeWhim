import React from "react";
import logoWhite from "@/assets/logoWhite.png";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Truck,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#322D29] text-[#D1C7BD] pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand Info & Socials */}
          <div className="space-y-4">
            <a href="/" className="inline-block">
              {/* Authentic Rongon logo in white for dark background */}
              <img
                src={logoWhite}
                alt="Rongon Logo"
                className="h-16 md:h-20 w-auto object-contain"
              />
            </a>
            <p className="text-xs sm:text-sm text-[#D1C7BD] leading-relaxed">
              Your premier atelier for handcrafted Dhakai Jamdanis, regal Banarasi weaves, and artisanal 22K gold-plated Kundan & Polki jewellery. Elevating South Asian feminine elegance.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://wa.me/+8801970085954"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-[#EFE9E1]/10 flex items-center justify-center hover:bg-[#72383D] text-[#EFE9E1] transition-all duration-300 hover:-translate-y-1"
              >
                <MessageCircle className="w-4 h-4 text-[#EFE9E1]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-[#EFE9E1]/10 flex items-center justify-center hover:bg-[#72383D] text-[#EFE9E1] transition-all duration-300 hover:-translate-y-1"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#EFE9E1]/10 flex items-center justify-center hover:bg-[#72383D] text-[#EFE9E1] transition-all duration-300 hover:-translate-y-1"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full bg-[#EFE9E1]/10 flex items-center justify-center hover:bg-[#72383D] text-[#EFE9E1] transition-all duration-300 hover:-translate-y-1"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Collections */}
          <div>
            <h3 className="text-[#EFE9E1] font-bold text-sm uppercase tracking-wider mb-5 border-l-2 border-[#72383D] pl-3">
              Collections
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#D1C7BD]">
              <li>
                <a href="#catalog-section" className="hover:text-[#EFE9E1] transition-colors">
                  Pure Dhakai Jamdani
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#EFE9E1] transition-colors">
                  Banarasi Katan Silk
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#EFE9E1] transition-colors">
                  Artisanal Kundan Chokers
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#EFE9E1] transition-colors">
                  Polki Bridal Necklace Sets
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#EFE9E1] transition-colors">
                  Handcrafted Jhumkas & Chandbalis
                </a>
              </li>
              <li>
                <a href="#catalog-section" className="hover:text-[#EFE9E1] transition-colors">
                  Organza & Chanderi Sarees
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div>
            <h3 className="text-[#EFE9E1] font-bold text-sm uppercase tracking-wider mb-5 border-l-2 border-[#72383D] pl-3">
              Customer Care
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#D1C7BD]">
              <li>
                <a href="#track-order" className="text-[#EFE9E1] font-semibold hover:underline transition-colors">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="#exchange" className="hover:text-[#EFE9E1] transition-colors">
                  7-Day Return & Exchange
                </a>
              </li>
              <li>
                <a href="#cod-info" className="hover:text-[#EFE9E1] transition-colors">
                  Cash on Delivery Policy
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#EFE9E1] transition-colors">
                  Frequently Asked Questions (FAQs)
                </a>
              </li>
              <li>
                <a href="#authenticity" className="hover:text-[#EFE9E1] transition-colors">
                  Handloom Authenticity Guarantee
                </a>
              </li>
              <li>
                <a href="#privacy" className="hover:text-[#EFE9E1] transition-colors">
                  Privacy & Purchase Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div>
            <h3 className="text-[#EFE9E1] font-bold text-sm uppercase tracking-wider mb-5 border-l-2 border-[#72383D] pl-3">
              Contact Atelier
            </h3>
            <div className="space-y-3.5 text-xs sm:text-sm text-[#D1C7BD]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#AC9C8D] mt-0.5 shrink-0" />
                <span>House 42, Road 11, Banani / Gulshan, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#AC9C8D] shrink-0" />
                <a href="tel:+8801970085954" className="hover:text-white transition-colors">
                  +880 1970 085 954
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#AC9C8D] shrink-0" />
                <a href="mailto:care@rongon.com" className="hover:text-white transition-colors">
                  care@rongon.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#AC9C8D] mt-0.5 shrink-0" />
                <div>
                  <p>Sat - Thu: 10:30 AM - 9:00 PM</p>
                  <p className="text-[11px] text-[#AC9C8D]">Friday: 3:00 PM - 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Subscription Row */}
        <div className="pt-6 pb-8 border-t border-[#AC9C8D]/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 bg-[#EFE9E1]/5 p-6 rounded-2xl">
            <div>
              <h4 className="text-[#EFE9E1] font-bold text-base mb-1 font-brand tracking-wide">
                Join the Rongon Circle
              </h4>
              <p className="text-[#D1C7BD] text-xs sm:text-sm">
                Receive exclusive invites to new Jamdani loomings, private festive sales, and 10% off your first order.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing to Rongon VIP club!");
              }}
              className="flex w-full md:w-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                required
                className="flex-1 md:w-68 px-4 py-2.5 bg-white rounded-l-xl text-[#322D29] placeholder-[#AC9C8D] focus:outline-none text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#72383D] hover:bg-[#322D29] text-white text-xs sm:text-sm font-semibold rounded-r-xl transition-colors flex items-center gap-1.5"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Payment Methods Badges - Unified White Sticker */}
        <div className="pt-6 pb-6 border-t border-[#AC9C8D]/20 flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-[#AC9C8D] font-semibold">
            Secure Payment & Nationwide Delivery
          </span>
          <div className="bg-white rounded-xl px-5 py-2.5 flex flex-wrap items-center justify-center gap-4 sm:gap-6 shadow-sm">
            <span className="font-extrabold text-[#E2136E] text-xs sm:text-sm tracking-wide">bKash</span>
            <span className="font-extrabold text-[#F7941D] text-xs sm:text-sm tracking-wide">Nagad</span>
            <span className="font-extrabold text-[#8C3494] text-xs sm:text-sm tracking-wide">Rocket</span>
            <span className="font-extrabold text-[#1A1F71] text-xs sm:text-sm tracking-wide">VISA</span>
            <span className="font-extrabold text-[#EB001B] text-xs sm:text-sm tracking-wide">Mastercard</span>
            <span className="h-4 w-px bg-[#D9D9D9] hidden sm:inline-block" />
            <span className="font-bold text-[#72383D] text-xs sm:text-sm flex items-center gap-1.5">
              <Truck className="w-4 h-4" />
              Cash on Delivery (COD)
            </span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-5 border-t border-[#AC9C8D]/20 flex flex-col md:flex-row justify-between items-center text-xs text-[#AC9C8D]">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-[#EFE9E1] font-medium">Rongon Atelier</span>. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">
            Crafted with elegance for discerning women
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;