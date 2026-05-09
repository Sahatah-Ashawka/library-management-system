"use client";

type ReturnSummary = {
  title: string;
  dueDate: string;
  returnDate: string;
  overdueDays: number;
  fineAmount: number;
};

export function ReturnSummaryModal({
  summary,
  onClose,
}: {
  summary: ReturnSummary | null;
  onClose: () => void;
}) {
  if (!summary) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card glass">
        <h3 style={{ marginTop: 0 }}>Return Summary</h3>
        <p style={{ margin: "0.35rem 0" }}>Book: <b>{summary.title}</b></p>
        <p style={{ margin: "0.35rem 0" }}>Due date: <b>{new Date(summary.dueDate).toLocaleDateString()}</b></p>
        <p style={{ margin: "0.35rem 0" }}>Return date: <b>{new Date(summary.returnDate).toLocaleDateString()}</b></p>
        <p style={{ margin: "0.35rem 0" }}>Overdue days: <b>{summary.overdueDays}</b></p>
        <p style={{ margin: "0.35rem 0" }}>Fine amount: <b>{summary.fineAmount} MMK</b></p>
        <button onClick={onClose} style={{ background: "var(--accent)", color: "#101530", marginTop: "0.8rem" }}>Close</button>
      </div>
    </div>
  );
}
