"use client";

import { useState, useEffect, memo } from "react";
import { Users, Box, Activity, TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

// Static import - will fail at build time if file doesn't exist
// Runtime validation added in component
import cardsDataImport from "@/data/leadCards.json";

const iconMap = {
  Users,
  Box,
  Activity,
};

function LeadCard() {
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const data = cardsDataImport || [];
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format: expected an array");
      }
      if (data.length === 0) {
        setError("No statistics data available.");
      } else {
        setCards(data);
        setError(null);
      }
    } catch (err) {
      console.error("Error processing cards data:", err);
      setError("Failed to load statistics data.");
      setCards([]);
    }
  }, []);

  if (error) {
    return (
      <section className="space-y-6">
        <div className="bg-white border rounded-xl p-6">
          <div className="flex items-center gap-3 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <section className="space-y-6">
        <div className="bg-white border rounded-xl p-6 text-center">
          <p className="text-gray-600 text-sm">No statistics available.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => {
          const Icon = iconMap[card.icon];

          return (
            <div
              key={`${card.title}-${card.value}`}
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

export default memo(LeadCard);
