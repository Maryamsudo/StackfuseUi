"use client";

import cards from "@/data/leadCards.json";
import {  Users,Box,Activity,TrendingUp, TrendingDown,} from "lucide-react";
const iconMap = {
  Users,
  Box,
  Activity,
};

export default function LeadCard() {
  return (
    <section className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card, i) => {
          const Icon = iconMap[card.icon];

          return (
            <div
              key={i}
              className="bg-white border rounded-xl p-5 flex items-center justify-between min-h-32.5"
            >
              {/* Text */}
              <div className="space-y-2">
                <p className="text-xs sm:text-sm lg:text-base text-gray-500">{card.title}</p>

                <p className="text-xl sm:text-2xl lg:text-xl font-semibold text-gray-900">
                  {card.value}
                </p>

                <div
                  className={`flex items-center gap-1 text-xs sm:text-sm ${
                    card.trend === "up"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {card.trend === "up" ? (
                    <TrendingUp size={14} />
                  ) : (
                    <TrendingDown size={14} />
                  )}
                  <span>{card.change}</span>
                </div>
              </div>

              {/* Icon */}
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${card.bg}`}
              >
                {Icon && (
                  <Icon size={22} className={card.color} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
