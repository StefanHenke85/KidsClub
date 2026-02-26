import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";

const GAMES = [
  {
    href: "/spiele/mathe",
    emoji: "🔢",
    label: "Mathe",
    desc: "Addition, Mal, Geteilt, Brüche, Gleichungen",
    sub: "Kl. 1–13 · mit Timer",
    bg: "bg-kidsBlue dark:bg-blue-800",
    shadow: "shadow-[0_6px_0_#3a9fc9] dark:shadow-[0_6px_0_#1d4ed8]",
  },
  {
    href: "/spiele/deutsch",
    emoji: "📝",
    label: "Deutsch",
    desc: "Wörter buchstabieren – 200+ Vokabeln",
    sub: "Kl. 1–13 · keine Wiederholungen",
    bg: "bg-kidsGreen dark:bg-emerald-800",
    shadow: "shadow-[0_6px_0_#2daa7a] dark:shadow-[0_6px_0_#065f46]",
  },
  {
    href: "/spiele/englisch",
    emoji: "🇬🇧",
    label: "Englisch",
    desc: "Vokabeln übersetzen – Englisch ↔ Deutsch",
    sub: "Kl. 3–13 · 2 Richtungen",
    bg: "bg-kidsOrange dark:bg-orange-800",
    shadow: "shadow-[0_6px_0_#d97706] dark:shadow-[0_6px_0_#92400e]",
  },
  {
    href: "/spiele/sachkunde",
    emoji: "🌍",
    label: "Sachkunde",
    desc: "Natur · Geografie · Geschichte · Politik",
    sub: "Kl. 1–13 · Quiz-Format",
    bg: "bg-teal-500 dark:bg-teal-800",
    shadow: "shadow-[0_6px_0_#0d9488] dark:shadow-[0_6px_0_#134e4a]",
  },
  {
    href: "/spiele/logik",
    emoji: "🧩",
    label: "Logik",
    desc: "Muster erkennen und vervollständigen",
    sub: "Alle Klassen · Denksport",
    bg: "bg-kidsPurple dark:bg-purple-800",
    shadow: "shadow-[0_6px_0_#8b36d4] dark:shadow-[0_6px_0_#581c87]",
  },
];

export default function SpielePage() {
  return (
    <PageWrapper emoji="🎮" title="Lernspiele" color="bg-green-50 dark:bg-slate-900" backHref="/">
      <p className="text-kids-sm text-gray-500 dark:text-gray-400 font-semibold mb-5">
        5 Fächer · passend zu deiner Klasse (1–13) · XP sammeln!
      </p>
      <div className="flex flex-col gap-4">
        {GAMES.map(({ href, emoji, label, desc, sub, bg, shadow }) => (
          <Link
            key={href}
            href={href}
            aria-label={`${label} spielen – ${sub}`}
            className={`${bg} ${shadow} rounded-kids-lg p-5 flex items-start gap-4 active:translate-y-1 transition-all focus-visible:outline-4 focus-visible:outline-white focus-visible:outline-offset-2`}
          >
            <span aria-hidden="true" className="text-5xl flex-shrink-0">{emoji}</span>
            <div className="flex-1">
              <p className="text-kids-md font-black text-gray-800 dark:text-white">{label}</p>
              <p className="text-xs font-bold text-gray-700 dark:text-gray-200 mt-0.5">{sub}</p>
              <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{desc}</p>
            </div>
            <span aria-hidden="true" className="text-3xl text-gray-700 dark:text-gray-200 flex-shrink-0 mt-1">›</span>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
