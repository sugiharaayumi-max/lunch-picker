"use client";

import { Restaurant, calcAvgPrice } from "@/data/restaurants";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onClick: () => void;
}

export default function RestaurantCard({ restaurant, onClick }: RestaurantCardProps) {
  const avg = calcAvgPrice(restaurant);

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      {restaurant.imageUrl ? (
        <div className="relative w-full h-32 bg-gray-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={restaurant.imageUrl}
            alt={restaurant.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-2 left-3">
            <h3 className="font-bold text-white text-lg drop-shadow">{restaurant.name}</h3>
          </div>
        </div>
      ) : (
        <div className="h-2" style={{ backgroundColor: restaurant.color }} />
      )}

      <div className="p-4">
        {!restaurant.imageUrl && (
          <h3 className="font-bold text-gray-800 mb-1">{restaurant.name}</h3>
        )}
        <p className="text-xs text-gray-400">{restaurant.address}</p>
        <div className="flex gap-2 mt-2 flex-wrap">
          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-600">{restaurant.category}</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-600">🚶 {restaurant.distance}</span>
          {avg > 0 && (
            <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full text-xs font-medium">均消 ${avg}</span>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-2">🕐 {restaurant.hours}</p>
        <p className="text-xs text-orange-500 mt-2 font-medium">點我看菜單 →</p>
      </div>
    </div>
  );
}
