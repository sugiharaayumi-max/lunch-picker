"use client";

import { Restaurant } from "@/data/restaurants";

interface MenuModalProps {
  restaurant: Restaurant | null;
  onClose: () => void;
}

export default function MenuModal({ restaurant, onClose }: MenuModalProps) {
  if (!restaurant) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="p-5 rounded-t-2xl text-white"
          style={{ backgroundColor: restaurant.color }}
        >
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{restaurant.name}</h2>
              <p className="text-sm opacity-80 mt-1">{restaurant.address} · {restaurant.distance}</p>
              <p className="text-sm opacity-80">{restaurant.hours}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl font-bold leading-none"
            >
              ×
            </button>
          </div>
          <div className="flex gap-2 mt-3">
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{restaurant.category}</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{restaurant.priceRange}</span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {restaurant.menu.map((cat) => (
            <div key={cat.category}>
              <h3 className="font-bold text-gray-700 mb-2 pb-1 border-b border-gray-100">
                {cat.category}
              </h3>
              <div className="space-y-2">
                {cat.items.map((item) => (
                  <div key={item.name} className="flex justify-between items-start gap-2">
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.name}</p>
                      {item.description && (
                        <p className="text-xs text-gray-400">{item.description}</p>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-orange-600 whitespace-nowrap">
                      ${item.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
