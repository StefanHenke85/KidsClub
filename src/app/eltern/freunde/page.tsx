"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import KidsCard from "@/components/ui/KidsCard";
import BigButton from "@/components/ui/BigButton";

interface Child {
  id: string;
  name: string;
  avatar_emoji: string;
  friend_code: string | null;
}

interface PendingRequest {
  id: string;
  from_id: string;
  from_name: string;
  from_avatar: string;
  from_code: string;
  to_id: string;
  to_name: string;
  to_avatar: string;
  created_at: string;
}

interface FriendEntry {
  my_child_id: string;
  friend_id: string;
  friend_name: string;
  friend_avatar: string;
}

interface FreundeData {
  children: Child[];
  pendingRequests: PendingRequest[];
  sentRequests: PendingRequest[];
  friendships: FriendEntry[];
}

export default function FreundePage() {
  const qc = useQueryClient();
  const [selectedChildId, setSelectedChildId] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [sendError, setSendError] = useState("");
  const [sendSuccess, setSendSuccess] = useState("");

  const { data, isLoading } = useQuery<FreundeData>({
    queryKey: ["freunde"],
    queryFn: async () => {
      const res = await fetch("/api/freunde");
      if (!res.ok) throw new Error("Fehler beim Laden");
      return res.json();
    },
  });

  const sendRequest = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/freunde", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ friendCode: codeInput.toUpperCase(), myChildId: selectedChildId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Fehler");
      return json;
    },
    onSuccess: (json) => {
      setSendSuccess(`Anfrage an ${json.toChildName} gesendet! ✓`);
      setSendError("");
      setCodeInput("");
      qc.invalidateQueries({ queryKey: ["freunde"] });
    },
    onError: (e: Error) => {
      setSendError(e.message);
      setSendSuccess("");
    },
  });

  const handleRequest = useMutation({
    mutationFn: async ({ requestId, action }: { requestId: string; action: "approve" | "reject" }) => {
      const res = await fetch(`/api/freunde/${requestId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      if (!res.ok) throw new Error("Fehler");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["freunde"] }),
  });

  const children: Child[] = data?.children ?? [];
  const pending: PendingRequest[] = data?.pendingRequests ?? [];
  const friendships: FriendEntry[] = data?.friendships ?? [];

  const selectedChild = children.find((c) => c.id === selectedChildId);

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-5">
      {/* Freundschaftscode anzeigen */}
      <KidsCard>
        <h2 className="text-kids-md font-black text-gray-800 dark:text-white mb-3">
          👫 Freundschaftscode
        </h2>
        <p className="text-kids-sm text-gray-500 dark:text-gray-400 mb-3">
          Teile diesen Code mit anderen Eltern – sie können damit eine Freundschaftsanfrage senden.
        </p>
        <div className="flex gap-2 items-center mb-2">
          <select
            value={selectedChildId}
            onChange={(e) => { setSelectedChildId(e.target.value); setSendError(""); setSendSuccess(""); }}
            aria-label="Kind auswählen"
            className="flex-1 border-2 border-gray-300 dark:border-gray-600 rounded-kids px-3 py-2 text-kids-sm bg-white dark:bg-slate-700 dark:text-white"
          >
            <option value="">Kind wählen...</option>
            {children.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        {selectedChild && (
          <div className="bg-yellow-50 dark:bg-slate-700 border-2 border-kidsYellow dark:border-yellow-600 rounded-kids p-3 flex items-center justify-between">
            <span className="text-kids-md font-black text-gray-800 dark:text-white tracking-widest">
              {selectedChild.friend_code ?? "—"}
            </span>
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(selectedChild.friend_code ?? "")}
              className="text-xl hover:scale-110 transition-transform"
              title="Kopieren"
            >
              📋
            </button>
          </div>
        )}
      </KidsCard>

      {/* Anfrage senden */}
      <KidsCard>
        <h2 className="text-kids-md font-black text-gray-800 dark:text-white mb-3">
          📨 Freund hinzufügen
        </h2>
        <p className="text-kids-sm text-gray-500 dark:text-gray-400 mb-3">
          Gib den Code des anderen Kindes ein (z.B. FUCHS-4829).
        </p>
        <div className="flex gap-2 mb-2">
          <input
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value.toUpperCase())}
            placeholder="TIER-NNNN"
            maxLength={10}
            className="flex-1 border-2 border-gray-300 dark:border-gray-600 rounded-kids px-3 py-2 text-kids-sm font-mono uppercase bg-white dark:bg-slate-700 dark:text-white"
          />
          <BigButton
            color="blue"
            size="sm"
            onClick={() => {
              if (!selectedChildId) { setSendError("Bitte zuerst ein Kind wählen"); return; }
              if (!codeInput.trim()) { setSendError("Bitte einen Code eingeben"); return; }
              sendRequest.mutate();
            }}
            disabled={sendRequest.isPending}
          >
            {sendRequest.isPending ? "..." : "Anfrage"}
          </BigButton>
        </div>
        {sendError && <p className="text-sm text-red-500 font-semibold">{sendError}</p>}
        {sendSuccess && <p className="text-sm text-green-600 font-semibold">{sendSuccess}</p>}
      </KidsCard>

      {/* Eingehende Anfragen */}
      <div>
        <h2 className="text-kids-md font-black text-gray-800 dark:text-white mb-2">
          ⏳ Offene Anfragen {pending.length > 0 && <span className="text-kidsOrange">({pending.length})</span>}
        </h2>
        {isLoading ? (
          <KidsCard><p className="text-center text-gray-400 py-4">Lädt...</p></KidsCard>
        ) : pending.length === 0 ? (
          <KidsCard>
            <p className="text-kids-sm text-gray-500 dark:text-gray-400 text-center py-4">
              Keine neuen Anfragen 😊
            </p>
          </KidsCard>
        ) : (
          <div className="flex flex-col gap-2">
            {pending.map((r) => (
              <KidsCard key={r.id} className="flex items-center gap-3">
                <span className="text-3xl">{r.from_avatar}</span>
                <div className="flex-1">
                  <p className="text-kids-sm font-black text-gray-800 dark:text-white">
                    {r.from_name} <span className="text-xs font-normal text-gray-400 ml-1">({r.from_code})</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    möchte mit <strong>{r.to_name}</strong> befreundet sein
                  </p>
                </div>
                <div className="flex gap-2">
                  <BigButton
                    color="green"
                    size="sm"
                    onClick={() => handleRequest.mutate({ requestId: r.id, action: "approve" })}
                    disabled={handleRequest.isPending}
                  >✓</BigButton>
                  <BigButton
                    color="pink"
                    size="sm"
                    onClick={() => handleRequest.mutate({ requestId: r.id, action: "reject" })}
                    disabled={handleRequest.isPending}
                  >✕</BigButton>
                </div>
              </KidsCard>
            ))}
          </div>
        )}
      </div>

      {/* Bestätigte Freunde */}
      <div>
        <h2 className="text-kids-md font-black text-gray-800 dark:text-white mb-2">
          ✅ Befreundete Kinder
        </h2>
        {friendships.length === 0 ? (
          <KidsCard>
            <p className="text-kids-sm text-gray-500 dark:text-gray-400 text-center py-4">
              Noch keine Freunde – sende oder genehmige eine Anfrage!
            </p>
          </KidsCard>
        ) : (
          <div className="flex flex-col gap-2">
            {friendships.map((f) => (
              <KidsCard key={`${f.my_child_id}-${f.friend_id}`} className="flex items-center gap-3">
                <span className="text-3xl">{f.friend_avatar}</span>
                <div className="flex-1">
                  <p className="text-kids-sm font-bold text-gray-800 dark:text-white">{f.friend_name}</p>
                  <p className="text-xs text-gray-400">Freund von {children.find((c) => c.id === f.my_child_id)?.name ?? ""}</p>
                </div>
                <span className="text-green-500 font-bold text-sm">✓ Befreundet</span>
              </KidsCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
