"use client";

import { useEffect, useState } from "react";

export function SearchBar({ value, onSearch }: { value: string; onSearch: (v: string) => void }) {
  const [local, setLocal] = useState(value);

  useEffect(() => {
    setLocal(value);
  }, [value]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (local !== value) onSearch(local);
    }, 350);
    return () => clearTimeout(t);
  }, [local, onSearch, value]);

  return (
    <input
      value={local}
      placeholder="Search by title, author, or description"
      onChange={(e) => setLocal(e.target.value)}
    />
  );
}
