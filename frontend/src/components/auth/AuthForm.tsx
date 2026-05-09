"use client";

type Field = {
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export function AuthForm({
  title,
  fields,
  submitLabel,
  loadingLabel,
  loading,
  error,
  onSubmit,
}: {
  title: string;
  fields: Field[];
  submitLabel: string;
  loadingLabel: string;
  loading: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="glass" style={{ maxWidth: 560, margin: "0 auto", padding: "1.2rem", display: "grid", gap: "0.7rem" }}>
      <h1>{title}</h1>
      {fields.map((field) => (
        <input
          key={field.name}
          placeholder={field.placeholder}
          type={field.type || "text"}
          value={field.value}
          onChange={(e) => field.onChange(e.target.value)}
        />
      ))}
      <button style={{ background: "var(--gold)", color: "#2a1e0a", fontWeight: 800 }} disabled={loading}>
        {loading ? loadingLabel : submitLabel}
      </button>
      {error && <p style={{ color: "var(--danger)", margin: 0 }}>{error}</p>}
    </form>
  );
}
