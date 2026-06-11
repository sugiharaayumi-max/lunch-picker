"use client";

import { useState } from "react";
import { restaurants } from "@/data/restaurants";
import SpinWheel from "@/components/SpinWheel";
import VotePanel from "@/components/VotePanel";
import RestaurantCard from "@/components/RestaurantCard";
import MenuModal from "@/components/MenuModal";
import type { Restaurant } from "@/data/restaurants";

type Tab = "spin" | "vote" | "list";

export default function Home() {
  const [tab, setTab] = useState<Tab>("vote");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [spinResult, setSpinResult] = useState<Restaurant | null>(null);

  const today = new Date().toLocaleDateString("zh-TW", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  return (
    <main className="min-h-screen bg-orange-50">
      {/* header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-orange-600">🍱 中午吃什麼</h1>
            <p className="text-xs text-gray-400">{today} · 台中美村路一段30號附近</p>
          </div>
          <div className="text-right text-xs text-gray-400">
            <p>{restaurants.length} 間餐廳</p>
          </div>
        </div>

        {/* tabs */}
        <div className="max-w-lg mx-auto px-4 flex gap-1 pb-1">
          {(["vote", "spin", "list"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition
                ${tab === t
                  ? "bg-orange-500 text-white shadow-sm"
                  : "text-gray-500 hover:bg-orange-100"
                }`}
            >
              {t === "vote" && "📊 投票"}
              {t === "spin" && "🎰 轉盤"}
              {t === "list" && "📋 餐廳"}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        {tab === "vote" && (
          <div>
            <p className="text-sm text-gray-500 mb-4 text-center">點選你想吃的，看看大家的共識 👇</p>
            <VotePanel restaurants={restaurants} />
          </div>
        )}

        {tab === "spin" && (
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-gray-500 text-center">選不了？讓命運決定！</p>
            <SpinWheel
              restaurants={restaurants}
              onResult={(r) => setSpinResult(r)}
            />
            {spinResult && (
              <button
                onClick={() => setSelectedRestaurant(spinResult)}
                className="text-sm text-orange-500 underline"
              >
                查看 {spinResult.name} 的菜單
              </button>
            )}
          </div>
        )}

        {tab === "list" && (
          <div>
            <p className="text-sm text-gray-500 mb-4">點選餐廳查看菜單</p>
            <div className="grid grid-cols-1 gap-3">
              {restaurants.map((r) => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                  onClick={() => setSelectedRestaurant(r)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <MenuModal
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />
    </main>
  );
}
