"use client";

export default function LeadHeading({ children, className = "" }) {
  return (
   <div
  className={`py-3 sm:py-4 text-xl sm:text-2xl font-semibold text-gray-900 flex items-center ${className}`}
>
  {children}
</div>

  );
}
