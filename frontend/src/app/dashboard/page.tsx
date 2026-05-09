"use client";

import { Header } from "@/components/ui/Header";
import { BorrowedBookCard } from "@/components/dashboard/BorrowedBookCard";
import { ReturnSummaryModal } from "@/components/dashboard/ReturnSummaryModal";
import { apiFetch } from "@/lib/api";
import { clearSession, getToken, getUser } from "@/lib/auth";
import { BorrowRecord, User } from "@/types";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [records, setRecords] = useState<BorrowRecord[]>([]);
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [summary, setSummary] = useState<{
    title: string;
    dueDate: string;
    returnDate: string;
    overdueDays: number;
    fineAmount: number;
  } | null>(null);

  async function load() {
    const token = getToken();
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      const res = await apiFetch("/my-borrowed-books", {}, token);
      setRecords((res.data || []).filter((r: BorrowRecord) => r.status === "BORROWED"));
    } catch (e) {
      const err = e as Error & { status?: number };
      if (err.status === 401) {
        clearSession();
        window.location.href = "/login?message=" + encodeURIComponent("Please log in to view your dashboard.");
        return;
      }
      setMsg(err.message);
    }
  }

  useEffect(() => {
    setUser(getUser());
    load();
  }, []);

  return (
    <main className="container">
      <Header />
      <section style={{ marginBottom: "1rem" }}>
        <h1 style={{ marginBottom: 0 }}>Your Dashboard</h1>
        <p style={{ color: "var(--muted)", margin: "0.4rem 0" }}>Name: <b>{user?.name || "-"}</b></p>
        <p style={{ color: "var(--muted)", margin: "0.4rem 0" }}>Email: <b>{user?.email || "-"}</b></p>
        <p style={{ color: "var(--muted)", margin: "0.4rem 0" }}>Member ID: <b>{user?.memberId || "-"}</b></p>
      </section>

      {msg && <p style={{ color: "var(--danger)" }}>{msg}</p>}

      <section className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
        {records.map((r) => (
          <BorrowedBookCard key={r.id} record={r} onDone={load} onReturnSummary={setSummary} />
        ))}
      </section>

      {records.length === 0 && <p style={{ color: "var(--muted)" }}>No active borrowed books.</p>}
      <ReturnSummaryModal summary={summary} onClose={() => setSummary(null)} />
    </main>
  );
}
