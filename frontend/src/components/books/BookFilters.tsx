"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { SearchBar } from "./SearchBar";
import { GenreFilter } from "./GenreFilter";

export function BookFilters({ genres }: { genres: string[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();

  const search = params.get("search") || "";
  const genre = params.get("genre") || "";

  const update = useCallback((next: { search?: string; genre?: string }) => {
    const p = new URLSearchParams(params.toString());
    if (next.search !== undefined) next.search ? p.set("search", next.search) : p.delete("search");
    if (next.genre !== undefined) next.genre ? p.set("genre", next.genre) : p.delete("genre");
    const q = p.toString();
    router.replace(q ? `${pathname}?${q}` : pathname);
  }, [params, router, pathname]);

  return (
    <div className="glass filter-shell">
      <SearchBar value={search} onSearch={(v) => update({ search: v })} />
      <GenreFilter genres={genres} selected={genre} onChange={(g) => update({ genre: g })} />
    </div>
  );
}
