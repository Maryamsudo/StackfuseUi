"use client";

export default function LeadHeading({ children, className = "" }) {
  return (
    <div
      className={` py-4 sm:py-5  pt-2 sm:pt-3 text-xl sm:text-2xl  font-semibold text-gray-900  flex items-center
      ${className}`}    >
      {children}
    </div>
  );
}
