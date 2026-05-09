"use client";

import { useState } from "react";

export function ExtendModal({
  open,
  loading,
  message,
  memberId,
  onMemberIdChange,
  onSubmit,
  onClose,
}: {
  open: boolean;
  loading: boolean;
  message: string;
  memberId: string;
  onMemberIdChange: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card glass">
        <h3 style={{ marginTop: 0 }}>Extend One Week</h3>
        <p style={{ color: "var(--muted)" }}>Enter your member ID to extend this borrowed book by 7 days.</p>
        <input
          value={memberId}
          onChange={(e) => onMemberIdChange(e.target.value)}
          placeholder="Member ID"
        />
        {message && <p style={{ color: "var(--muted)", marginBottom: 0 }}>{message}</p>}
        <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.8rem" }}>
          <button onClick={onSubmit} disabled={loading} style={{ background: "var(--gold)", color: "#261a09" }}>
            {loading ? "Extending..." : "Submit"}
          </button>
          <button onClick={onClose} disabled={loading} style={{ background: "#394263", color: "#f6efde" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
