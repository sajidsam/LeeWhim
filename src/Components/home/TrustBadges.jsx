import React from "react";
import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";

const TrustBadges = () => {
  const badges = [
    {
      icon: Truck,
      title: "Nationwide Delivery",
      description: "Cash on delivery across all 64 districts in Bangladesh",
    },
    {
      icon: ShieldCheck,
      title: "100% Authentic Handloom",
      description: "Certified Dhakai Jamdani & 22K micron plated jewellery",
    },
    {
      icon: RefreshCw,
      title: "7-Day Easy Exchange",
      description: "Hassle-free size & color exchange policy",
    },
    {
      icon: Headphones,
      title: "Dedicated Concierge",
      description: "Live styling advice via WhatsApp & phone support",
    },
  ];

  return (
    <section className="bg-rose-50/40 border-y border-rose-100/60 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 sm:p-4 rounded-2xl bg-white/80 border border-rose-100/80 shadow-xs hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-rose-100/60 text-[#be123c] flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                    {badge.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5 line-clamp-2 leading-relaxed">
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
