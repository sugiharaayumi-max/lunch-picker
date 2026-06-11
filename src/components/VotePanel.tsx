"use client";

import { useState, useEffect } from "react";
import { Restaurant } from "@/data/restaurants";
import { loadVotes, saveVotes, getUserName, setUserName, DailyVote } from "@/data/votes";

interface VotePanelProps {
  restaurants: Restaurant[];
}

export default function VotePanel({ restaurants }: VotePanelProps) {
  const [voteData, setVoteData] = useState<DailyVote>({ date: "", votes: [] });
  const [username, setUsernameState] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);

  useEffect(() => {
    const data = loadVotes();
    setVoteData(data);
    const name = getUserName();
    setUsernameState(name);
    if (!name) setShowNameInput(true);
  }, []);

  const saveName = () => {
    if (!nameInput.trim()) return;
    setUserName(nameInput.trim());
    setUsernameState(nameInput.trim());
    setShowNameInput(false);
  };

  const vote = (restaurantId: string) => {
    if (!username) { setShowNameInput(true); return; }
    const newData = { ...voteData };
    // remove user from all other votes first
    newData.votes = newData.votes.map((v) => ({
      ...v,
      voters: v.voters.filter((u) => u !== username),
    }));
    // toggle: if already voted for this, remove it
    const existing = newData.votes.find((v) => v.restaurantId === restaurantId);
    if (existing) {
      if (existing.voters.includes(username)) {
        // already voted for this one — do nothing (already removed above)
      } else {
        existing.voters.push(username);
      }
    } else {
      newData.votes.push({ restaurantId, voters: [username] });
    }
    saveVotes(newData);
    setVoteData({ ...newData });
  };

  const getVoters = (restaurantId: string) =>
    voteData.votes.find((v) => v.restaurantId === restaurantId)?.voters ?? [];

  const myVote = voteData.votes.find((v) => v.voters.includes(username))?.restaurantId;

  const totalVotes = voteData.votes.reduce((sum, v) => sum + v.voters.length, 0);

  const sorted = [...restaurants].sort(
    (a, b) => getVoters(b.id).length - getVoters(a.id).length
  );

  const winner = sorted[0] && getVoters(sorted[0].id).length > 0 ? sorted[0] : null;

  return (
    <div className="w-full max-w-xl mx-auto">
      {showNameInput && (
        <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-xl flex gap-2 items-center">
          <span className="text-sm font-medium text-orange-700">你叫什麼名字？</span>
          <input
            className="flex-1 border border-orange-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="輸入暱稱..."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && saveName()}
          />
          <button
            onClick={saveName}
            className="px-3 py-1.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600"
          >
            確定
          </button>
        </div>
      )}

      {username && (
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            你是 <span className="font-semibold text-orange-600">{username}</span>
            {myVote && (
              <span> · 已投給 <span className="font-semibold">{restaurants.find(r => r.id === myVote)?.name}</span></span>
            )}
          </p>
          <button
            onClick={() => { setNameInput(username); setShowNameInput(true); }}
            className="text-xs text-gray-400 hover:text-gray-600 underline"
          >
            換名字
          </button>
        </div>
      )}

      {winner && totalVotes > 0 && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-center">
          <p className="text-sm text-green-700">🏆 目前領先：<span className="font-bold text-green-800">{winner.name}</span>（{getVoters(winner.id).length} 票）</p>
        </div>
      )}

      <div className="space-y-2">
        {sorted.map((rest) => {
          const voters = getVoters(rest.id);
          const isMyVote = rest.id === myVote;
          const pct = totalVotes > 0 ? (voters.length / totalVotes) * 100 : 0;

          return (
            <div
              key={rest.id}
              onClick={() => vote(rest.id)}
              className={`relative overflow-hidden rounded-xl border-2 cursor-pointer transition-all select-none
                ${isMyVote ? "border-orange-400 bg-orange-50" : "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/30"}`}
            >
              {/* progress bar */}
              <div
                className="absolute inset-y-0 left-0 transition-all duration-500 opacity-20"
                style={{ width: `${pct}%`, backgroundColor: rest.color }}
              />
              <div className="relative flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: rest.color }} />
                  <div>
                    <p className="font-semibold text-gray-800">{rest.name}</p>
                    <p className="text-xs text-gray-400">{rest.category} · {rest.distance}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {voters.length > 0 && (
                    <div className="flex flex-col items-end">
                      <span className="text-lg font-bold text-gray-700">{voters.length}</span>
                      <span className="text-xs text-gray-400">{voters.join("、")}</span>
                    </div>
                  )}
                  {isMyVote && <span className="text-orange-500 text-xl">✓</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalVotes === 0 && (
        <p className="text-center text-gray-400 text-sm mt-4">點選餐廳投票 👆</p>
      )}
    </div>
  );
}
