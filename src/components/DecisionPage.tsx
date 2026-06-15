"use client";

import { useState } from "react";
import { Restaurant, calcAvgPrice } from "@/data/restaurants";
import SpinWheel from "./SpinWheel";
import VotePanel from "./VotePanel";

type Mode = "idle" | "spin" | "vote";

interface DecisionPageProps {
  candidates: Restaurant[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onShowMenu: (restaurant: Restaurant) => void;
}

export default function DecisionPage({ candidates, onRemove, onClear, onShowMenu }: DecisionPageProps) {
  const [mode, setMode] = useState<Mode>("idle");
  const [spinResult, setSpinResult] = useState<Restaurant | null>(null);

  if (candidates.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <p className="text-5xl mb-4">🍽</p>
        <p className="text-gray-500 font-medium">還沒有候選餐廳</p>
        <p className="text-sm text-gray-400 mt-1">去「餐廳」頁面選幾間加入候選吧！</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
      {/* 候選名單 */}
      <div className="bg-white rounded-2xl border border-orange-100 overflow-hidden shadow-sm">
        <div className="px-5 pt-4 pb-2 flex items-center justify-between">
          <h2 className="font-bold text-gray-700">🗳 候選名單 ({candidates.length})</h2>
          <button onClick={onClear} className="text-xs text-red-400 hover:text-red-600 transition">
            全部清除
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {candidates.map((r) => {
            const avg = calcAvgPrice(r);
            return (
              <div key={r.id} className="flex items-center gap-3 px-5 py-3">
                <div className="w-2 h-8 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
                <button
                  className="flex-1 text-left"
                  onClick={() => onShowMenu(r)}
                >
                  <p className="font-medium text-gray-800 text-sm">{r.name}</p>
                  <p className="text-xs text-gray-400">{r.category} · 步行{r.walkingMinutes}分鐘{avg > 0 ? ` · 均$${avg}` : ""}</p>
                </button>
                <button
                  onClick={() => onRemove(r.id)}
                  className="text-gray-300 hover:text-red-400 transition text-lg leading-none"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* 選擇模式 */}
      {mode === "idle" && (
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setMode("spin")}
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-2xl py-5 text-center transition shadow-sm"
          >
            <p className="text-3xl mb-1">🎰</p>
            <p className="font-bold">轉盤決定</p>
            <p className="text-xs opacity-80 mt-0.5">讓命運選</p>
          </button>
          <button
            onClick={() => setMode("vote")}
            className="bg-white hover:bg-orange-50 text-orange-500 border-2 border-orange-200 rounded-2xl py-5 text-center transition shadow-sm"
          >
            <p className="text-3xl mb-1">📊</p>
            <p className="font-bold">投票決定</p>
            <p className="text-xs opacity-80 mt-0.5 text-gray-400">民主表決</p>
          </button>
        </div>
      )}

      {/* 轉盤 */}
      {mode === "spin" && (
        <div className="space-y-4">
          <button onClick={() => { setMode("idle"); setSpinResult(null); }} className="text-sm text-gray-400 hover:text-gray-600">
            ← 返回
          </button>
          <SpinWheel
            restaurants={candidates}
            onResult={(r) => { setSpinResult(r); onShowMenu(r); }}
          />
          {spinResult && (
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-500">今天就吃</p>
              <p className="text-xl font-black text-orange-600">{spinResult.name} 🎉</p>
              <button onClick={() => onShowMenu(spinResult)} className="mt-2 text-sm text-orange-500 underline">
                查看菜單
              </button>
            </div>
          )}
        </div>
      )}

      {/* 投票 */}
      {mode === "vote" && (
        <div className="space-y-4">
          <button onClick={() => setMode("idle")} className="text-sm text-gray-400 hover:text-gray-600">
            ← 返回
          </button>
          <VotePanel restaurants={candidates} />
        </div>
      )}
    </div>
  );
}
