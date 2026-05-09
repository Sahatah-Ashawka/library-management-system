"use client";

import { BorrowRecord } from "@/types";
import { apiFetch } from "@/lib/api";
import { clearSession, getToken, getUser } from "@/lib/auth";
import { useState } from "react";
import { ExtendModal } from "./ExtendModal";

export function BorrowedBookCard({
  record,
  onDone,
  onReturnSummary,
}: {
  record: BorrowRecord;
  onDone: () => void;
  onReturnSummary: (summary: {
    title: string;
    dueDate: string;
    returnDate: string;
    overdueDays: number;
    fineAmount: number;
  }) => void;
}) {
  const [memberId, setMemberId] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [extendOpen, setExtendOpen] = useState(false);

  const isBorrowed = record.status === "BORROWED";

  async function extend() {
    const token = getToken();
    if (!token) {
      window.location.href = "/login?message=" + encodeURIComponent("Please log in to borrow books.");
      return;
    }

    setLoading(true);
    setMsg("");
    try {
      const res = await apiFetch(`/borrow-records/${record.id}/extend`, {
        method: "POST",
        body: JSON.stringify({ memberId }),
      }, token);
      const newDueDate = new Date(res.data.dueDate).toLocaleDateString();
      setMsg(`Extension successful. New due date: ${newDueDate}`);
      setExtendOpen(false);
      onDone();
    } catch (e) {
      const err = e as Error & { status?: number };
      if (err.status === 401) {
        clearSession();
        window.location.href = "/login?message=" + encodeURIComponent("Please log in to continue.");
        return;
      }
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function ret() {
    const token = getToken();
    if (!token) {
      window.location.href = "/login?message=" + encodeURIComponent("Please log in to borrow books.");
      return;
    }

    const ok = window.confirm("Return this book now?");
    if (!ok) return;

    setLoading(true);
    setMsg("");
    try {
      const res = await apiFetch(`/borrow-records/${record.id}/return`, { method: "POST" }, token);
      const data = res.data;
      onReturnSummary({
        title: data.book.title,
        dueDate: data.dueDate,
        returnDate: data.returnDate,
        overdueDays: data.overdueDays,
        fineAmount: data.fineAmount,
      });
      onDone();
    } catch (e) {
      const err = e as Error & { status?: number };
      if (err.status === 401) {
        clearSession();
        window.location.href = "/login?message=" + encodeURIComponent("Please log in to continue.");
        return;
      }
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="glass" style={{ padding: "1rem" }}>
      <h4 style={{ marginTop: 0 }}>{record.book.title}</h4>
      <p style={{ margin: "0.35rem 0", color: "var(--muted)" }}>Author: {record.book.author}</p>
      <p style={{ color: "var(--muted)", margin: "0.35rem 0" }}>Borrowed: {new Date(record.borrowDate).toLocaleDateString()}</p>
      <p style={{ color: "var(--muted)", margin: "0.35rem 0" }}>Due: {new Date(record.dueDate).toLocaleDateString()}</p>
      <p style={{ color: "var(--muted)", margin: "0.35rem 0" }}>Returned: {record.returnDate ? new Date(record.returnDate).toLocaleDateString() : "-"}</p>
      <p style={{ margin: "0.35rem 0" }}>Status: <b>{record.status}</b></p>
      <p style={{ margin: "0.35rem 0" }}>Overdue days: {record.overdueDaysLive}</p>
      <p style={{ margin: "0.35rem 0" }}>Fine: {record.fineAmountLive} MMK</p>

      {isBorrowed && (
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "0.6rem" }}>
          <button
            disabled={loading || record.extendedCount >= 1}
            onClick={() => {
              setMemberId(getUser()?.memberId || "");
              setExtendOpen(true);
            }}
            style={{ background: "var(--gold)", color: "#1f2937" }}
          >
            {record.extendedCount >= 1 ? "Extension Used" : "Extend one week"}
          </button>
          <button disabled={loading} onClick={ret} style={{ background: "var(--success)", color: "#052e16" }}>
            Return book
          </button>
        </div>
      )}

      {msg && <p style={{ color: "var(--muted)", marginBottom: 0 }}>{msg}</p>}

      <ExtendModal
        open={extendOpen}
        loading={loading}
        message={msg}
        memberId={memberId}
        onMemberIdChange={setMemberId}
        onSubmit={extend}
        onClose={() => setExtendOpen(false)}
      />
    </div>
  );
}
