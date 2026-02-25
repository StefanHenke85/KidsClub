"use client";

import { useState } from "react";
import { useParentStore } from "@/store/useParentStore";
import KidsCard from "@/components/ui/KidsCard";
import BigButton from "@/components/ui/BigButton";

export default function EinstellungenPage() {
  const { settings, setChildName, setPinHash } = useParentStore();
  const [name, setName] = useState(settings.childName);
  const [saved, setSaved] = useState(false);
  const [newPin, setNewPin] = useState("");
  const [pinMsg, setPinMsg] = useState("");

  const saveName = () => {
    setChildName(name);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const changePin = async () => {
    if (!/^\d{4}$/.test(newPin)) {
      setPinMsg("Bitte genau 4 Ziffern eingeben!");
      return;
    }
    const res = await fetch("/api/eltern/pin", {
      method: "POST",
      body: JSON.stringify({ action: "set", pin: newPin }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setPinHash(data.hash);
    setNewPin("");
    setPinMsg("PIN erfolgreich geändert! ✓");
    setTimeout(() => setPinMsg(""), 3000);
  };

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-5">
      <KidsCard>
        <h3 className="text-kids-md font-black mb-3">Name des Kindes</h3>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border-2 border-gray-200 rounded-kids px-4 py-3 text-kids-sm font-semibold focus:border-kidsPurple outline-none mb-3"
        />
        <BigButton color="purple" size="sm" onClick={saveName}>
          {saved ? "Gespeichert ✓" : "Speichern"}
        </BigButton>
      </KidsCard>

      <KidsCard>
        <h3 className="text-kids-md font-black mb-3">PIN ändern</h3>
        <input
          type="password"
          inputMode="numeric"
          maxLength={4}
          value={newPin}
          onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ""))}
          placeholder="Neue 4-stellige PIN"
          className="w-full border-2 border-gray-200 rounded-kids px-4 py-3 text-kids-sm font-semibold focus:border-kidsPurple outline-none mb-3"
        />
        {pinMsg && <p className="text-sm font-bold text-green-600 mb-2">{pinMsg}</p>}
        <BigButton color="orange" size="sm" onClick={changePin}>
          PIN ändern
        </BigButton>
      </KidsCard>
    </div>
  );
}
