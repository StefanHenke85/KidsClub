"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LOCKOUT_DURATION = 5 * 60 * 1000;
const SESSION_KEY = "pin_verified_at";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 Minuten

interface PinGateProps {
  onSuccess: () => void;
}

export default function PinGate({ onSuccess }: PinGateProps) {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [lockRemaining, setLockRemaining] = useState(0);
  const [authState, setAuthState] = useState<"checking" | "noLogin" | "ready">("checking");
  const [setupMode, setSetupMode] = useState(false);
  const [setupStep, setSetupStep] = useState<"enter" | "confirm">("enter");
  const [setupFirst, setSetupFirst] = useState("");
  const [setupConfirm, setSetupConfirm] = useState("");

  useEffect(() => {
    const verifiedAt = sessionStorage.getItem(SESSION_KEY);
    if (verifiedAt && Date.now() - Number(verifiedAt) < SESSION_TIMEOUT) {
      onSuccess();
      return;
    }
    fetch("/api/kinder")
      .then((r) => {
        if (r.status === 401) setAuthState("noLogin");
        else setAuthState("ready");
      })
      .catch(() => setAuthState("noLogin"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!lockedUntil) return;
    const interval = setInterval(() => {
      const remaining = Math.ceil((lockedUntil - Date.now()) / 1000);
      if (remaining <= 0) { setLockedUntil(null); setFailedAttempts(0); setLockRemaining(0); }
      else setLockRemaining(remaining);
    }, 1000);
    return () => clearInterval(interval);
  }, [lockedUntil]);

  const isLocked = !!(lockedUntil && Date.now() < lockedUntil);

  const handleDigit = (d: string) => {
    if (isLocked) return;
    if (setupMode) {
      if (setupStep === "enter" && setupFirst.length < 4) setSetupFirst((p) => p + d);
      else if (setupStep === "confirm" && setupConfirm.length < 4) setSetupConfirm((p) => p + d);
    } else {
      if (input.length < 4) setInput((p) => p + d);
    }
  };

  const handleDelete = () => {
    if (setupMode) {
      if (setupStep === "confirm") setSetupConfirm((p) => p.slice(0, -1));
      else setSetupFirst((p) => p.slice(0, -1));
    } else {
      setInput((p) => p.slice(0, -1));
    }
  };

  const handleSetupSubmit = async () => {
    if (setupStep === "enter") {
      if (setupFirst.length !== 4) return;
      setSetupStep("confirm");
      return;
    }
    if (setupConfirm !== setupFirst) {
      setError("PINs stimmen nicht überein!");
      setSetupStep("enter"); setSetupFirst(""); setSetupConfirm("");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/eltern/pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "set", pin: setupFirst }),
    });
    setLoading(false);
    if (res.ok) { sessionStorage.setItem(SESSION_KEY, String(Date.now())); onSuccess(); }
    else setError("Fehler beim Speichern der PIN");
  };

  const handleVerify = async () => {
    if (input.length !== 4 || isLocked) return;
    setLoading(true); setError("");
    const res = await fetch("/api/eltern/pin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "verify", pin: input }),
    });
    const data = await res.json();
    setLoading(false);

    if (data.needsLogin) { setAuthState("noLogin"); return; }
    if (data.noPin) { setSetupMode(true); setSetupStep("enter"); setSetupFirst(""); setSetupConfirm(""); return; }

    if (data.valid) {
      sessionStorage.setItem(SESSION_KEY, String(Date.now()));
      setFailedAttempts(0);
      onSuccess();
    } else {
      const newFails = failedAttempts + 1;
      setFailedAttempts(newFails);
      if (newFails >= 3) { setLockedUntil(Date.now() + LOCKOUT_DURATION); setError("Zu viele Versuche! 5 Minuten gesperrt."); }
      else setError(`Falsche PIN! Noch ${3 - newFails} Versuch(e).`);
      setInput("");
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (!setupMode && input.length === 4) handleVerify(); }, [input]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (setupMode && setupStep === "confirm" && setupConfirm.length === 4) handleSetupSubmit(); }, [setupConfirm]);

  const dots = (val: string) =>
    Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className={`w-5 h-5 rounded-full border-4 transition-all ${
        i < val.length ? "bg-kidsPurple border-kidsPurple scale-110" : "border-gray-300 dark:border-slate-500"
      }`} />
    ));

  const currentVal = setupMode ? (setupStep === "confirm" ? setupConfirm : setupFirst) : input;

  if (authState === "checking") return (
    <div className="fixed inset-0 bg-kidsBg dark:bg-slate-900 flex items-center justify-center z-50">
      <div className="text-4xl animate-spin">⏳</div>
    </div>
  );

  if (authState === "noLogin") return (
    <div className="fixed inset-0 bg-kidsBg dark:bg-slate-900 flex flex-col items-center justify-center z-50 font-kids px-6">
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="text-kids-lg font-black text-gray-800 dark:text-white mb-2">Elternbereich</h2>
      <p className="text-kids-sm text-gray-500 dark:text-gray-400 text-center mb-8">
        Bitte zuerst als Elternteil anmelden.
      </p>
      <button type="button" onClick={() => router.push("/login")}
        className="bg-kidsPurple text-white rounded-kids px-8 py-4 text-kids-md font-black shadow-[0_5px_0_#8b36d4] active:translate-y-1 transition-all mb-4">
        Eltern anmelden 🔑
      </button>
      <button type="button" onClick={() => router.back()} className="text-xs text-gray-400 underline">← Zurück</button>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-kidsBg dark:bg-slate-900 flex flex-col items-center justify-center z-50 font-kids px-6">
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="text-kids-lg font-black text-gray-800 dark:text-white mb-1">Elternbereich</h2>
      {isLocked ? (
        <div className="text-center mt-4">
          <p className="text-kids-md font-bold text-red-500">Gesperrt! 🔒</p>
          <p className="text-kids-sm text-gray-600 dark:text-gray-400 mt-2">Noch {lockRemaining} Sekunden warten.</p>
        </div>
      ) : (
        <>
          <p className="text-kids-sm text-gray-500 dark:text-gray-400 mb-6 text-center">
            {setupMode
              ? setupStep === "enter" ? "Neue 4-stellige Eltern-PIN festlegen" : "PIN zur Bestätigung wiederholen"
              : "Eltern-PIN eingeben"}
          </p>
          <div className="flex gap-4 mb-6">{dots(currentVal)}</div>
          {error && <p className="text-red-500 font-bold text-kids-sm mb-4 text-center">{error}</p>}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[1,2,3,4,5,6,7,8,9].map((d) => (
              <button key={d} type="button" onClick={() => handleDigit(String(d))} disabled={loading}
                className="w-16 h-16 text-kids-lg font-black bg-white dark:bg-slate-700 dark:text-white rounded-kids shadow-kids hover:bg-gray-50 active:translate-y-1 transition-transform">
                {d}
              </button>
            ))}
            <button type="button" onClick={handleDelete}
              className="w-16 h-16 text-kids-md font-black bg-gray-200 dark:bg-slate-600 dark:text-white rounded-kids shadow-kids active:translate-y-1 transition-transform">←</button>
            <button type="button" onClick={() => handleDigit("0")}
              className="w-16 h-16 text-kids-lg font-black bg-white dark:bg-slate-700 dark:text-white rounded-kids shadow-kids active:translate-y-1 transition-transform">0</button>
            <button type="button" onClick={setupMode ? handleSetupSubmit : handleVerify} disabled={loading}
              className="w-16 h-16 text-kids-lg font-black bg-kidsGreen text-white rounded-kids shadow-[0_5px_0_#2daa7a] active:translate-y-1 transition-transform disabled:opacity-60">
              {loading ? "⏳" : "✓"}
            </button>
          </div>
          <button type="button" onClick={() => router.back()} className="text-xs text-gray-400 underline mt-2">← Zurück</button>
        </>
      )}
    </div>
  );
}
