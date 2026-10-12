import React from "react";
import { Truck } from "lucide-react";

export const VisaIcon = () => (
  <svg viewBox="0 0 44 24" className="h-4 sm:h-4.5 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="22" y="16.5" textAnchor="middle" fill="#1A1F71" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontStyle="italic" fontSize="13.5" letterSpacing="0.5">
      VISA
    </text>
  </svg>
);

export const MastercardIcon = () => (
  <svg viewBox="0 0 38 24" className="h-4.5 sm:h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
    <circle cx="14" cy="12" r="7.5" fill="#EB001B"/>
    <circle cx="24" cy="12" r="7.5" fill="#F79E1B" fillOpacity="0.92"/>
    <path d="M19 7.3a7.48 7.48 0 0 1 2.5 4.7 7.48 7.48 0 0 1-2.5 4.7 7.48 7.48 0 0 1-2.5-4.7c0-1.8.8-3.5 2.5-4.7z" fill="#FF5F00"/>
  </svg>
);

export const AmexIcon = () => (
  <svg viewBox="0 0 38 24" className="h-4.5 sm:h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
    <rect width="38" height="24" rx="3.5" fill="#016FD0"/>
    <text x="19" y="15.5" textAnchor="middle" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="8.5" letterSpacing="0.6">AMEX</text>
  </svg>
);

export const PaypalIcon = () => (
  <svg viewBox="0 0 52 24" className="h-4.5 sm:h-5 w-auto" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 5.5H6.5c-.4 0-.7.3-.8.7L3.3 19.3c0 .3.2.5.5.5h2.9c.4 0 .7-.3.8-.7l.7-4.4c.1-.4.4-.7.8-.7h1.7c3.4 0 5.4-1.6 5.9-4.8.2-1.4 0-2.5-.7-3.2-.8-.8-2.3-1-4-1z" fill="#003087"/>
    <path d="M13.8 9.5c-.5 3.2-2.5 4.8-5.9 4.8H6.2c-.4 0-.7.3-.8.7l-.9 5.7c0 .3.2.5.5.5h2.6c.3 0 .6-.2.7-.6l.7-4.2c.1-.4.4-.7.8-.7h1.4c2.8 0 5-1.1 5.6-4.2.3-1.3.1-2.4-.6-3.2-.6-.4-1.7-.7-2.9-.7z" fill="#0079C1"/>
    <path d="M13.1 9.3c-.2-.1-.5-.2-.9-.2H9.8c-.4 0-.7.3-.8.7l-.9 5.7c0 .3.2.5.5.5h2.3l.6-3.8c.1-.4.4-.7.8-.7h.9c2 0 3.4-.8 4-3 .2-1.1 0-2-.9-2.7-.4-.3-.8-.4-1.2-.4z" fill="#00457C"/>
    <text x="25" y="16.5" fill="#003087" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="11" letterSpacing="-0.4">Pay<tspan fill="#0079C1">Pal</tspan></text>
  </svg>
);

export const BkashIcon = () => (
  <svg viewBox="0 0 56 24" className="h-4 sm:h-4.5 w-auto" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5L14 11.5L9.5 19H4.5L8.5 13L3.5 7.5L8 5Z" fill="#E2136E"/>
    <text x="17" y="16" fill="#E2136E" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="10.5" letterSpacing="0.1">bKash</text>
  </svg>
);

export const NagadIcon = () => (
  <svg viewBox="0 0 52 24" className="h-4 sm:h-4.5 w-auto" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="12" r="5" fill="#F7941D"/>
    <text x="17" y="16" fill="#F7941D" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="10" letterSpacing="0.1">Nagad</text>
  </svg>
);

export const CodIcon = () => (
  <div className="flex items-center gap-1.5 px-1 text-[#72383D]">
    <Truck className="w-3.5 h-3.5" />
    <span className="font-extrabold text-[10px] tracking-tight">COD</span>
  </div>
);

const PayWithBadges = ({ showLocal = true, className = "", align = "center", isLight = false }) => {
  return (
    <div className={`flex flex-col ${align === "left" ? "items-start" : align === "right" ? "items-end" : "items-center"} gap-2.5 ${className}`}>
      {/* Title */}
      <span className={`text-xs sm:text-sm font-bold tracking-wide ${isLight ? "text-[#322D29]" : "text-[#EFE9E1]"}`}>
        Pay With
      </span>

      {/* Badges Container */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
        {/* Visa */}
        <div
          title="Visa"
          className="h-8 px-2.5 bg-white rounded-md flex items-center justify-center shadow-xs border border-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <VisaIcon />
        </div>

        {/* Mastercard */}
        <div
          title="Mastercard"
          className="h-8 px-2.5 bg-white rounded-md flex items-center justify-center shadow-xs border border-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <MastercardIcon />
        </div>

        {/* American Express */}
        <div
          title="American Express (AMEX)"
          className="h-8 px-2.5 bg-white rounded-md flex items-center justify-center shadow-xs border border-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <AmexIcon />
        </div>

        {/* PayPal */}
        <div
          title="PayPal"
          className="h-8 px-2.5 bg-white rounded-md flex items-center justify-center shadow-xs border border-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
        >
          <PaypalIcon />
        </div>

        {/* Local MFS & COD (Optional / Enabled) */}
        {showLocal && (
          <>
            <div
              title="bKash"
              className="h-8 px-2.5 bg-white rounded-md flex items-center justify-center shadow-xs border border-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <BkashIcon />
            </div>

            <div
              title="Nagad"
              className="h-8 px-2.5 bg-white rounded-md flex items-center justify-center shadow-xs border border-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <NagadIcon />
            </div>

            <div
              title="Cash on Delivery (COD)"
              className="h-8 px-2.5 bg-white rounded-md flex items-center justify-center shadow-xs border border-[#E5E7EB] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              <CodIcon />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PayWithBadges;
