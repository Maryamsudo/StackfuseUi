"use client";

import {Users,Box,Activity,TrendingUp,TrendingDown,} from "lucide-react";
export default function LeadManagementHeader() {
  const cards = [
    {
      title: "Total Leads",
      value: "10293",
      change: "1.3% Up from past week",
      trend: "up",
      icon: Users,
      bg: "bg-indigo-100",
      color: "text-indigo-600",
    },
    {
      title: "Active Leads",
      value: "10293",
      change: "1.3% Up from past week",
      trend: "up",
      icon: Box,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      title: "Inactive Leads",
      value: "89,000",
      change: "4.3% Down from yesterday",
      trend: "down",
      icon: Activity,
      bg: "bg-green-100",
      color: "text-green-600",
    },
  ];

  return (
    <section className="space-y-6 pt-12 md:pt-0">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Lead Management
        </h1>
      
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card, i) => {
          const Icon = card.icon;

          return (
            <div
              key={i}
              className="bg-white border rounded-xl p-5 flex items-center justify-between min-h-32.5"
            >
              {/* Text */}
              <div className="space-y-2">
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {card.value}
                </p>
                <div
                  className={`flex items-center gap-1 text-sm ${
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
                  {card.change}
                </div>
              </div>

              {/* Icon */}
              <div
                className={`h-12 w-12 rounded-full flex items-center justify-center ${card.bg}`}
              >
                <Icon size={22} className={card.color} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
