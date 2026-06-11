"use client";

import { Restaurant } from "@/data/restaurants";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div className="h-2" style={{ backgroundColor: restaurant.color }} />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-gray-800">{restaurant.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{restaurant.address}</p>
          </div>
          <span className="text-sm font-semibold text-gray-500">{restaurant.priceRange}</span>
        </div>
        <div className="flex gap-2 mt-3">
          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-600">{restaurant.category}</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-600">🚶 {restaurant.distance}</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">🕐 {restaurant.hours}</p>
        <p className="text-xs text-orange-500 mt-2 font-medium">點我看菜單 →</p>
      </div>
    </div>
  );
}
