"use client";

import { Header } from "@/components/ui/Header";
import { AuthForm } from "@/components/auth/AuthForm";
import { apiFetch } from "@/lib/api";
import { setSession } from "@/lib/auth";
import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "", phone: "" });
  const [error, setError] = useState("");
  const [memberId, setMemberId] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password || !form.confirmPassword || !form.phone) {
      setError("Please complete all fields.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await apiFetch("/auth/register", { method: "POST", body: JSON.stringify(form) });
      setMemberId(res.data.user.memberId);
      setSession(res.data.token, res.data.user);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  if (memberId) {
    return (
      <main className="container">
        <Header />
        <section className="glass" style={{ maxWidth: 650, margin: "0 auto", padding: "1.4rem", textAlign: "center" }}>
          <h1>Registration Successful</h1>
          <p style={{ color: "var(--muted)" }}>Your member ID has been generated. Save it carefully.</p>
          <p style={{ color: "var(--gold)", fontSize: "1.3rem", fontWeight: 800 }}>Member ID: {memberId}</p>
          <p style={{ color: "var(--danger)", fontWeight: 600 }}>
            Please save this Member ID. It is required to extend borrowed books.
          </p>
          <button onClick={() => (window.location.href = "/dashboard")} style={{ background: "var(--accent)", color: "#0e1330" }}>
            Continue to Dashboard
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="container">
      <Header />
      <AuthForm
        title="Create Account"
        fields={[
          { name: "name", placeholder: "Name", value: form.name, onChange: (v) => setForm({ ...form, name: v }) },
          { name: "email", type: "email", placeholder: "Email", value: form.email, onChange: (v) => setForm({ ...form, email: v }) },
          { name: "password", type: "password", placeholder: "Password", value: form.password, onChange: (v) => setForm({ ...form, password: v }) },
          { name: "confirmPassword", type: "password", placeholder: "Confirm Password", value: form.confirmPassword, onChange: (v) => setForm({ ...form, confirmPassword: v }) },
          { name: "phone", placeholder: "Phone Number", value: form.phone, onChange: (v) => setForm({ ...form, phone: v }) },
        ]}
        submitLabel="Register"
        loadingLabel="Creating..."
        loading={loading}
        error={error}
        onSubmit={onSubmit}
      />
    </main>
  );
}
