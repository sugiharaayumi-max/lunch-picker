export interface Vote {
  restaurantId: string;
  voters: string[];
}

export interface DailyVote {
  date: string;
  votes: Vote[];
  result?: string;
}

export const getTodayKey = () => new Date().toISOString().split("T")[0];

export const loadVotes = (): DailyVote => {
  if (typeof window === "undefined") return { date: getTodayKey(), votes: [] };
  const key = `lunch-votes-${getTodayKey()}`;
  const stored = localStorage.getItem(key);
  if (stored) return JSON.parse(stored);
  return { date: getTodayKey(), votes: [] };
};

export const saveVotes = (data: DailyVote) => {
  if (typeof window === "undefined") return;
  const key = `lunch-votes-${data.date}`;
  localStorage.setItem(key, JSON.stringify(data));
};

export const getUserName = (): string => {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("lunch-username") || "";
};

export const setUserName = (name: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("lunch-username", name);
};
