"use client";
const TOKEN_KEY = "library_token"; const USER_KEY = "library_user";
export const setSession = (token: string, user: unknown) => { localStorage.setItem(TOKEN_KEY, token); localStorage.setItem(USER_KEY, JSON.stringify(user)); };
export const getToken = () => (typeof window === "undefined" ? null : localStorage.getItem(TOKEN_KEY));
export const getUser = () => { if (typeof window === "undefined") return null; const raw = localStorage.getItem(USER_KEY); if (!raw) return null; try { return JSON.parse(raw); } catch { return null; } };
export const clearSession = () => { localStorage.removeItem(TOKEN_KEY); localStorage.removeItem(USER_KEY); };
