"use client";

import { useState, useEffect } from "react";
import { restaurants, getTodayRecommendations, calcAvgPrice, isOpenToday } from "@/data/restaurants";

const DAY_NAMES = ["日", "一", "二", "三", "四", "五", "六"];
const MONTH_NAMES = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];

interface DashboardProps {
  onRestaurantClick: (id: string) => void;
}

export default function Dashboard({ onRestaurantClick }: DashboardProps) {
  const [now, setNow] = useState(new Date());
  const [recs] = useState(() => getTodayRecommendations(restaurants, 5));

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const month = MONTH_NAMES[now.getMonth()];
  const date = now.getDate();
  const day = DAY_NAMES[now.getDay()];
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      {/* 日期時鐘區 */}
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 p-6 mb-5 text-center">
        <div className="text-5xl font-black text-orange-600 tracking-tight">
          {hours}:{minutes}
          <span className="text-2xl text-orange-300 ml-1">{seconds}</span>
        </div>
        <div className="mt-2 flex items-center justify-center gap-2">
          <span className="text-2xl font-bold text-gray-700">{month}月{date}日</span>
          <span className="bg-orange-100 text-orange-600 text-sm font-semibold px-2 py-0.5 rounded-full">
            週{day}
          </span>
        </div>
      </div>

      {/* 今日推薦 */}
      <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
        <div className="px-5 pt-4 pb-2 flex items-center justify-between">
          <h2 className="font-bold text-gray-700">🍽 今日推薦</h2>
          <span className="text-xs text-gray-400">已過濾公休店家</span>
        </div>

        <div className="divide-y divide-gray-50">
          {recs.map((r, i) => {
            const avg = calcAvgPrice(r);
            return (
              <button
                key={r.id}
                onClick={() => onRestaurantClick(r.id)}
                className="w-full flex items-center gap-3 px-5 py-3 hover:bg-orange-50 transition text-left"
              >
                {/* 排名 */}
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  i === 0 ? "bg-orange-500 text-white" :
                  i === 1 ? "bg-orange-300 text-white" :
                  "bg-gray-100 text-gray-500"
                }`}>
                  {i + 1}
                </span>

                {/* 色塊 */}
                <div className="w-2 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />

                {/* 資訊 */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{r.name}</p>
                  <p className="text-xs text-gray-400 truncate">{r.category} · 步行{r.walkingMinutes}分鐘</p>
                </div>

                {/* 均消 */}
                <div className="text-right flex-shrink-0">
                  {avg > 0 && <p className="text-sm font-semibold text-orange-500">均${avg}</p>}
                  <p className="text-xs text-gray-300">{r.priceRange}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="px-5 py-3 bg-gray-50 text-xs text-gray-400 text-center">
          今日開放 {restaurants.filter(isOpenToday).length} 間 · 點選查看菜單
        </div>
      </div>
    </div>
  );
}
