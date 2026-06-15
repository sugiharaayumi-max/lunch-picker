"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "lunch-candidates";

export function useCandidates() {
  const [candidates, setCandidates] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCandidates(JSON.parse(stored));
    } catch {}
  }, []);

  const save = (ids: string[]) => {
    setCandidates(ids);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  };

  const toggle = useCallback((id: string) => {
    setCandidates((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clear = useCallback(() => save([]), []);

  return { candidates, toggle, clear };
}
