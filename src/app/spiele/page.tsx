import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";

const GAMES = [
  { href: "/spiele/mathe",   emoji: "🔢", label: "Mathe",   desc: "Rechnen lernen",       bg: "bg-kidsBlue dark:bg-blue-700",   shadow: "shadow-[0_6px_0_#3a9fc9] dark:shadow-[0_6px_0_#1d4ed8]" },
  { href: "/spiele/deutsch", emoji: "📝", label: "Deutsch", desc: "Wörter buchstabieren",  bg: "bg-kidsGreen dark:bg-emerald-700", shadow: "shadow-[0_6px_0_#2daa7a] dark:shadow-[0_6px_0_#065f46]" },
  { href: "/spiele/logik",   emoji: "🧩", label: "Logik",   desc: "Muster erkennen",       bg: "bg-kidsPurple dark:bg-purple-700", shadow: "shadow-[0_6px_0_#8b36d4] dark:shadow-[0_6px_0_#581c87]" },
];

export default function SpielePage() {
  return (
    <PageWrapper emoji="🎮" title="Spielen" color="bg-green-50 dark:bg-slate-900">
      <p className="text-kids-sm text-gray-500 dark:text-gray-400 font-semibold mb-5">
        Welches Spiel möchtest du spielen?
      </p>
      <div className="flex flex-col gap-4">
        {GAMES.map(({ href, emoji, label, desc, bg, shadow }) => (
          <Link key={href} href={href}>
            <div className={`${bg} ${shadow} rounded-kids-lg p-6 flex items-center gap-5 active:translate-y-1 transition-all`}>
              <span className="text-5xl">{emoji}</span>
              <div>
                <p className="text-kids-lg font-black text-gray-800 dark:text-white">{label}</p>
                <p className="text-kids-sm text-gray-700 dark:text-gray-200">{desc}</p>
              </div>
              <span className="ml-auto text-3xl text-gray-700 dark:text-gray-200">›</span>
            </div>
          </Link>
        ))}
      </div>
    </PageWrapper>
  );
}
