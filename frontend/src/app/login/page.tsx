"use client";

import { Header } from "@/components/ui/Header";
import { AuthForm } from "@/components/auth/AuthForm";
import { apiFetch } from "@/lib/api";
import { setSession } from "@/lib/auth";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useSearchParams();
  const loginNotice = params.get("message") || "";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await apiFetch("/auth/login", { method: "POST", body: JSON.stringify(form) });
      setSession(res.data.token, res.data.user);
      window.location.href = "/dashboard";
    } catch (e) {
      setMessage((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <Header />
      {loginNotice && <p style={{ color: "var(--gold)", margin: "0 auto 0.8rem", maxWidth: 560 }}>{loginNotice}</p>}
      <AuthForm
        title="Login"
        fields={[
          { name: "email", type: "email", placeholder: "Email", value: form.email, onChange: (v) => setForm({ ...form, email: v }) },
          { name: "password", type: "password", placeholder: "Password", value: form.password, onChange: (v) => setForm({ ...form, password: v }) },
        ]}
        submitLabel="Login"
        loadingLabel="Signing in..."
        loading={loading}
        error={message}
        onSubmit={onSubmit}
      />
    </main>
  );
}
