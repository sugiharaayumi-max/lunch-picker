"use client";

import { Restaurant, calcAvgPrice } from "@/data/restaurants";

interface RestaurantCardProps {
  restaurant: Restaurant;
  isCandidate: boolean;
  onToggleCandidate: (id: string) => void;
  onClick: () => void;
}

export default function RestaurantCard({
  restaurant,
  isCandidate,
  onToggleCandidate,
  onClick,
}: RestaurantCardProps) {
  const avg = calcAvgPrice(restaurant);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col">
      {/* 圖片區 */}
      <div
        className="relative w-full h-36 bg-gray-100 cursor-pointer"
        onClick={onClick}
      >
        {restaurant.imageUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={restaurant.imageUrl}
              alt={restaurant.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-2 left-3 right-3">
              <h3 className="font-bold text-white text-base drop-shadow leading-tight line-clamp-1">
                {restaurant.name}
              </h3>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-end pb-2 px-3" style={{ backgroundColor: restaurant.color + "33" }}>
            <div className="w-full h-1 rounded-full mb-1" style={{ backgroundColor: restaurant.color }} />
          </div>
        )}
      </div>

      {/* 內容區 */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        {!restaurant.imageUrl && (
          <h3 className="font-bold text-gray-800 text-sm leading-tight">{restaurant.name}</h3>
        )}
        <div className="flex gap-1 flex-wrap">
          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-600">{restaurant.category}</span>
          <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs text-gray-500">🚶 {restaurant.walkingMinutes}分鐘</span>
          {avg > 0 && (
            <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full text-xs font-medium">均${avg}</span>
          )}
        </div>
        <p className="text-xs text-gray-400">🕐 {restaurant.hours}</p>
      </div>

      {/* 按鈕區 */}
      <div className="px-3 pb-3 flex gap-2">
        <button
          onClick={onClick}
          className="flex-1 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
        >
          查看菜單
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onToggleCandidate(restaurant.id); }}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
            isCandidate
              ? "bg-orange-500 text-white hover:bg-orange-600"
              : "bg-orange-50 text-orange-500 hover:bg-orange-100 border border-orange-200"
          }`}
        >
          {isCandidate ? "✓ 已選入" : "+ 加入候選"}
        </button>
      </div>
    </div>
  );
}
