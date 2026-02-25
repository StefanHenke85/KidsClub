import Link from "next/link";
import KidsCard from "@/components/ui/KidsCard";

const MENU = [
  { href: "/eltern/kinder",        emoji: "👧🧒", label: "Kinder verwalten",    desc: "Kinder hinzufügen und bearbeiten" },
  { href: "/eltern/fortschritt",   emoji: "📊",    label: "Lernfortschritt",     desc: "XP, Badges, Wochenübersicht" },
  { href: "/eltern/freunde",       emoji: "👫",    label: "Freunde genehmigen",  desc: "Freundschaftsanfragen verwalten" },
  { href: "/eltern/einstellungen", emoji: "⚙️",    label: "Einstellungen",       desc: "Zeitlimits und App-Einstellungen" },
  { href: "/eltern/verlauf",       emoji: "📋",    label: "Verlauf",             desc: "Such- und Chat-Verlauf" },
];

export default function ElternPage() {
  return (
    <div className="max-w-lg mx-auto py-4 flex flex-col gap-4">
      <p className="text-kids-sm text-gray-500 dark:text-gray-400 font-semibold mb-2">
        Willkommen im Elternbereich. Hier kannst du alles verwalten.
      </p>
      {MENU.map(({ href, emoji, label, desc }) => (
        <Link key={href} href={href}>
          <KidsCard className="flex items-center gap-4 hover:shadow-kids-hover transition-shadow active:scale-95 dark:bg-slate-800">
            <span className="text-4xl">{emoji}</span>
            <div>
              <p className="text-kids-md font-black text-gray-800 dark:text-white">{label}</p>
              <p className="text-kids-sm text-gray-500 dark:text-gray-400">{desc}</p>
            </div>
            <span className="ml-auto text-2xl text-gray-300 dark:text-gray-500">›</span>
          </KidsCard>
        </Link>
      ))}
      <Link href="/" className="text-center text-kids-sm text-gray-400 underline mt-4 block">
        ← Zurück zur Kinder-Seite
      </Link>
    </div>
  );
}
