"use client";

import Link from "next/link";
import { clearSession, getToken, getUser } from "@/lib/auth";
import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";

export function Navbar() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const user = getUser();
    setUserName(user?.name ?? null);
  }, []);

  async function logout() {
    const token = getToken();
    if (token) {
      try {
        await apiFetch("/auth/logout", { method: "POST" }, token);
      } catch {
        // ignore logout API failures and clear local session anyway
      }
    }
    clearSession();
    window.location.href = "/login";
  }

  return (
    <header className="glass" style={{ padding: "1rem 1.2rem", marginBottom: "1.3rem" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: "1.15rem" }}>Aurelia Library</Link>
        <nav style={{ display: "flex", gap: "0.7rem", alignItems: "center" }}>
          <Link href="/">Home</Link>
          <Link href="/books">Books</Link>
          <Link href="/dashboard">Dashboard</Link>
          {!userName ? (
            <>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          ) : (
            <button onClick={logout} style={{ background: "var(--danger)", color: "white" }}>
              Logout ({userName})
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
