"use client";

import { useState, useMemo, useEffect } from "react";
import { restaurants, calcAvgPrice, isOpenToday } from "@/data/restaurants";
import type { Restaurant } from "@/data/restaurants";
import RestaurantCard from "@/components/RestaurantCard";
import DecisionPage from "@/components/DecisionPage";
import MenuModal from "@/components/MenuModal";
import { useCandidates } from "@/hooks/useCandidates";

type Tab = "list" | "decision";

const CATEGORIES = Array.from(new Set(restaurants.map((r) => r.category)));
const MAX_WALK = Math.max(...restaurants.map((r) => r.walkingMinutes));
const ALL_PRICES = restaurants.map(calcAvgPrice).filter((p) => p > 0);
const MIN_PRICE = Math.min(...ALL_PRICES);
const MAX_PRICE = Math.max(...ALL_PRICES);

const DAY_NAMES = ["日", "一", "二", "三", "四", "五", "六"];

export default function Home() {
  const [tab, setTab] = useState<Tab>("list");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const { candidates, toggle, clear } = useCandidates();

  // 過濾器狀態
  const [filterWalk, setFilterWalk] = useState<number>(MAX_WALK);
  const [filterMinPrice, setFilterMinPrice] = useState<number>(0);
  const [filterMaxPrice, setFilterMaxPrice] = useState<number>(MAX_PRICE);
  const [filterCategory, setFilterCategory] = useState<string>("全部");
  const [filterOpenOnly, setFilterOpenOnly] = useState<boolean>(false);

  const candidateRestaurants = useMemo(
    () => restaurants.filter((r) => candidates.includes(r.id)),
    [candidates]
  );

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      if (r.walkingMinutes > filterWalk) return false;
      const avg = calcAvgPrice(r);
      if (avg > 0) {
        if (avg < filterMinPrice || avg > filterMaxPrice) return false;
      }
      if (filterCategory !== "全部" && r.category !== filterCategory) return false;
      if (filterOpenOnly && !isOpenToday(r)) return false;
      return true;
    });
  }, [filterWalk, filterMinPrice, filterMaxPrice, filterCategory, filterOpenOnly]);

  const tabs: { key: Tab; label: string; badge?: number }[] = [
    { key: "list", label: "📋 餐廳" },
    { key: "decision", label: "🗳 決策", badge: candidates.length || undefined },
  ];

  const timeStr = now
    ? `${now.getMonth() + 1}/${now.getDate()}（週${DAY_NAMES[now.getDay()]}）${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`
    : "";

  return (
    <main className="min-h-screen bg-orange-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-black text-orange-600">🍱 中午吃什麼</h1>
          <p className="text-xs text-gray-400 tabular-nums">{timeStr}</p>
        </div>
        <div className="max-w-5xl mx-auto px-4 flex gap-1 pb-2">
          {tabs.map(({ key, label, badge }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`relative flex-1 py-2 rounded-lg text-sm font-semibold transition ${
                tab === key
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-gray-500 hover:bg-orange-100"
              }`}
            >
              {label}
              {badge != null && badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 餐廳列表 */}
      {tab === "list" && (
        <div className="max-w-5xl mx-auto px-4 py-5 space-y-4">
          {/* 過濾器 */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
            {/* 步行時間 */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 w-20 flex-shrink-0">🚶 {filterWalk} 分鐘內</span>
              <input
                type="range"
                min={5} max={MAX_WALK} step={1}
                value={filterWalk}
                onChange={(e) => setFilterWalk(Number(e.target.value))}
                className="flex-1 accent-orange-500"
              />
            </div>

            {/* 預算 */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500 w-20 flex-shrink-0">💰 均消</span>
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs text-gray-400">${filterMinPrice}</span>
                <input
                  type="range"
                  min={0} max={MAX_PRICE} step={10}
                  value={filterMinPrice}
                  onChange={(e) => setFilterMinPrice(Math.min(Number(e.target.value), filterMaxPrice - 10))}
                  className="flex-1 accent-orange-500"
                />
                <input
                  type="range"
                  min={0} max={MAX_PRICE} step={10}
                  value={filterMaxPrice}
                  onChange={(e) => setFilterMaxPrice(Math.max(Number(e.target.value), filterMinPrice + 10))}
                  className="flex-1 accent-orange-500"
                />
                <span className="text-xs text-gray-400">${filterMaxPrice}</span>
              </div>
            </div>

            {/* 類別 + 僅顯示今日開放 */}
            <div className="flex gap-2 flex-wrap items-center">
              {["全部", ...CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                    filterCategory === cat
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-500 hover:bg-orange-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
              <button
                onClick={() => setFilterOpenOnly((v) => !v)}
                className={`ml-auto px-3 py-1 rounded-full text-xs font-medium transition ${
                  filterOpenOnly
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-green-100"
                }`}
              >
                {filterOpenOnly ? "✓ 今日開放" : "今日開放"}
              </button>
            </div>

            <p className="text-xs text-gray-400 text-right">找到 {filtered.length} 間餐廳</p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((r) => (
              <RestaurantCard
                key={r.id}
                restaurant={r}
                isCandidate={candidates.includes(r.id)}
                onToggleCandidate={toggle}
                onClick={() => setSelectedRestaurant(r)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p className="text-4xl mb-3">🔍</p>
              <p>找不到符合條件的餐廳</p>
              <button
                onClick={() => {
                  setFilterWalk(MAX_WALK);
                  setFilterMinPrice(0);
                  setFilterMaxPrice(MAX_PRICE);
                  setFilterCategory("全部");
                  setFilterOpenOnly(false);
                }}
                className="mt-3 text-sm text-orange-500 underline"
              >
                清除所有過濾條件
              </button>
            </div>
          )}
        </div>
      )}

      {/* 決策頁 */}
      {tab === "decision" && (
        <DecisionPage
          candidates={candidateRestaurants}
          onRemove={toggle}
          onClear={clear}
          onShowMenu={(r) => setSelectedRestaurant(r)}
        />
      )}

      <MenuModal
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />
    </main>
  );
}
