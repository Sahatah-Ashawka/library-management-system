"use client";

import { apiFetch } from "@/lib/api";
import { clearSession, getToken } from "@/lib/auth";
import { useEffect, useState } from "react";

export function BorrowButton({ bookId, available }: { bookId: number; available: number }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(getToken());
  }, []);

  const isOut = available <= 0;

  async function borrow() {
    if (!token) {
      window.location.href = "/login?message=" + encodeURIComponent("Please log in to borrow books.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      await apiFetch(`/borrow/${bookId}`, { method: "POST" }, token);
      setMessage("Borrowed successfully. Check your dashboard for due date details.");
      setTimeout(() => window.location.reload(), 700);
    } catch (e) {
      const err = e as Error & { status?: number };
      if (err.status === 401) {
        clearSession();
        window.location.href = "/login?message=" + encodeURIComponent("Please log in to borrow books.");
        return;
      }
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  const label = isOut ? "Out of stock" : !token ? "Login to borrow" : loading ? "Borrowing..." : "Borrow this book";

  return (
    <div>
      <button
        onClick={borrow}
        disabled={isOut || loading}
        style={{
          background: isOut ? "#525a70" : "var(--accent)",
          color: "#0d1024",
          fontWeight: 700,
          minWidth: 180,
        }}
      >
        {label}
      </button>
      {message && <p style={{ marginTop: "0.7rem", color: "var(--muted)" }}>{message}</p>}
    </div>
  );
}
