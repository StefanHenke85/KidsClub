"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function useParentAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function register(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/parent-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return false; }
      router.push("/eltern");
      return true;
    } catch {
      setError("Netzwerkfehler");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/parent-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return false; }
      router.push("/eltern");
      return true;
    } catch {
      setError("Netzwerkfehler");
      return false;
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/auth/parent-login", { method: "DELETE" });
    router.push("/login");
  }

  return { register, login, logout, loading, error, clearError: () => setError(null) };
}
