"use client";

import { useState, useEffect } from "react";
import { useParentStore } from "@/store/useParentStore";
import BigButton from "@/components/ui/BigButton";

const LOCKOUT_DURATION = 5 * 60 * 1000; // 5 Minuten

interface PinGateProps {
  onSuccess: () => void;
}

export default function PinGate({ onSuccess }: PinGateProps) {
  const { settings, incrementFailedAttempts, resetFailedAttempts, setLockout, setPinHash, setParentMode } =
    useParentStore();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [isSetup, setIsSetup] = useState(false);
  const [confirmPin, setConfirmPin] = useState("");
  const [step, setStep] = useState<"enter" | "confirm">("enter");
  const [lockRemaining, setLockRemaining] = useState(0);

  const isLocked = settings.lockoutUntil && Date.now() < settings.lockoutUntil;
  const noPin = !settings.pinHash;

  // Sperr-Countdown
  useEffect(() => {
    if (!isLocked) return;
    const interval = setInterval(() => {
      const remaining = Math.ceil((settings.lockoutUntil! - Date.now()) / 1000);
      setLockRemaining(remaining);
      if (remaining <= 0) resetFailedAttempts();
    }, 1000);
    return () => clearInterval(interval);
  }, [isLocked, settings.lockoutUntil, resetFailedAttempts]);

  const handleDigit = (d: string) => {
    if (isSetup) {
      if (step === "enter" && input.length < 4) setInput((p) => p + d);
      else if (step === "confirm" && confirmPin.length < 4) setConfirmPin((p) => p + d);
    } else {
      if (input.length < 4) setInput((p) => p + d);
    }
  };

  const handleDelete = () => {
    if (isSetup && step === "confirm") setConfirmPin((p) => p.slice(0, -1));
    else setInput((p) => p.slice(0, -1));
  };

  const handleSubmit = async () => {
    setError("");

    // PIN einrichten
    if (noPin || isSetup) {
      if (step === "enter") {
        if (input.length !== 4) return;
        setStep("confirm");
        setConfirmPin("");
        return;
      }
      if (confirmPin !== input) {
        setError("Die PINs stimmen nicht überein!");
        setConfirmPin("");
        setStep("enter");
        setInput("");
        return;
      }
      const res = await fetch("/api/eltern/pin", {
        method: "POST",
        body: JSON.stringify({ action: "set", pin: input }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setPinHash(data.hash);
      setParentMode(true);
      onSuccess();
      return;
    }

    // PIN prüfen
    const res = await fetch("/api/eltern/pin", {
      method: "POST",
      body: JSON.stringify({ action: "verify", pin: input, hash: settings.pinHash }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.valid) {
      resetFailedAttempts();
      setParentMode(true);
      onSuccess();
    } else {
      incrementFailedAttempts();
      const newFails = settings.failedAttempts + 1;
      if (newFails >= 3) {
        setLockout(Date.now() + LOCKOUT_DURATION);
        setError("Zu viele Versuche! 5 Minuten gesperrt.");
      } else {
        setError(`Falsche PIN! Noch ${3 - newFails} Versuch(e).`);
      }
      setInput("");
    }
  };

  // Auto-submit wenn 4 Ziffern eingegeben
  useEffect(() => {
    if (!isSetup && input.length === 4) handleSubmit();
    if (isSetup && step === "confirm" && confirmPin.length === 4) handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, confirmPin]);

  const displayDots = (val: string) =>
    Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className={`w-5 h-5 rounded-full border-4 transition-all ${
          i < val.length ? "bg-kidsPurple border-kidsPurple" : "border-gray-300"
        }`}
      />
    ));

  const currentVal = isSetup && step === "confirm" ? confirmPin : input;

  return (
    <div className="fixed inset-0 bg-kidsBg flex flex-col items-center justify-center z-50 font-kids px-6">
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="text-kids-lg font-black text-gray-800 mb-1">Elternbereich</h2>

      {isLocked ? (
        <div className="text-center mt-4">
          <p className="text-kids-md font-bold text-red-500">Gesperrt!</p>
          <p className="text-kids-sm text-gray-600">Noch {lockRemaining} Sekunden warten.</p>
        </div>
      ) : (
        <>
          <p className="text-kids-sm text-gray-500 mb-6 text-center">
            {noPin
              ? isSetup
                ? step === "enter"
                  ? "Neue 4-stellige PIN eingeben"
                  : "PIN nochmal eingeben"
                : "Bitte zuerst eine PIN festlegen"
              : "Eltern-PIN eingeben"}
          </p>

          {/* PIN Punkte */}
          <div className="flex gap-4 mb-6">{displayDots(currentVal)}</div>

          {error && (
            <p className="text-red-500 font-bold text-kids-sm mb-4 text-center">{error}</p>
          )}

          {/* Nummernblock */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
              <button
                key={d}
                onClick={() => handleDigit(String(d))}
                className="w-16 h-16 text-kids-lg font-black bg-white rounded-kids shadow-kids hover:bg-gray-50 active:translate-y-1 transition-transform"
              >
                {d}
              </button>
            ))}
            <button
              onClick={handleDelete}
              className="w-16 h-16 text-kids-md font-black bg-gray-200 rounded-kids shadow-kids hover:bg-gray-300 active:translate-y-1 transition-transform"
            >
              ←
            </button>
            <button
              onClick={() => handleDigit("0")}
              className="w-16 h-16 text-kids-lg font-black bg-white rounded-kids shadow-kids hover:bg-gray-50 active:translate-y-1 transition-transform"
            >
              0
            </button>
            <button
              onClick={handleSubmit}
              className="w-16 h-16 text-kids-lg font-black bg-kidsGreen rounded-kids shadow-[0_5px_0_#2daa7a] hover:brightness-95 active:translate-y-1 transition-transform"
            >
              ✓
            </button>
          </div>

          {noPin && !isSetup && (
            <BigButton color="purple" size="sm" onClick={() => setIsSetup(true)}>
              PIN einrichten
            </BigButton>
          )}
        </>
      )}
    </div>
  );
}
