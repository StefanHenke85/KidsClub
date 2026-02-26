import Link from "next/link";

export const metadata = {
  title: "Impressum – KidsClub",
};

export default function ImpressumPage() {
  return (
    <main className="min-h-screen font-kids pb-32 bg-kidsBg dark:bg-[#0f0c1a] transition-colors duration-300">
      {/* Header */}
      <header className="relative overflow-hidden hero-gradient px-4 pt-10 pb-14">
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1200 56" preserveAspectRatio="none" className="w-full h-10 fill-kidsBg dark:fill-[#0f0c1a]">
            <path d="M0,28 C150,56 350,0 600,28 C850,56 1050,0 1200,28 L1200,56 L0,56 Z" />
          </svg>
        </div>
        <div className="max-w-lg mx-auto relative z-10">
          <Link href="/" className="inline-flex items-center gap-1.5 bg-white/30 hover:bg-white/45 transition-all rounded-full px-3 py-1.5 text-white font-bold text-sm mb-4">
            <span className="text-lg leading-none">‹</span> Zurück
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-5xl animate-float sticker leading-none">📄</span>
            <h1 className="text-kids-xl font-black text-white drop-shadow-md">Impressum</h1>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-6">

        <section className="bg-white dark:bg-slate-800 rounded-kids-xl p-5 shadow-[0_4px_0_rgba(167,139,250,0.2)] border-2 border-purple-100 dark:border-slate-700">
          <h2 className="text-kids-sm font-black text-gray-700 dark:text-gray-100 mb-3">
            Angaben gemäß § 5 TMG
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            <strong>Stefan Henke</strong><br />
            Rheinstraße 40<br />
            47495 Rheinberg<br />
            Deutschland
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-kids-xl p-5 shadow-[0_4px_0_rgba(167,139,250,0.2)] border-2 border-purple-100 dark:border-slate-700">
          <h2 className="text-kids-sm font-black text-gray-700 dark:text-gray-100 mb-3">
            Kontakt
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            E-Mail:{" "}
            <a href="mailto:henke.stefan1985@gmail.com" className="text-kidsPurple underline underline-offset-2">
              henke.stefan1985@gmail.com
            </a>
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-kids-xl p-5 shadow-[0_4px_0_rgba(167,139,250,0.2)] border-2 border-purple-100 dark:border-slate-700">
          <h2 className="text-kids-sm font-black text-gray-700 dark:text-gray-100 mb-3">
            Verantwortlich für den Inhalt (§ 55 Abs. 2 RStV)
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Stefan Henke<br />
            Rheinstraße 40<br />
            47495 Rheinberg
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-kids-xl p-5 shadow-[0_4px_0_rgba(167,139,250,0.2)] border-2 border-purple-100 dark:border-slate-700">
          <h2 className="text-kids-sm font-black text-gray-700 dark:text-gray-100 mb-3">
            Haftungsausschluss
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
            nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
            Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
            Informationen zu überwachen.
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-kids-xl p-5 shadow-[0_4px_0_rgba(167,139,250,0.2)] border-2 border-purple-100 dark:border-slate-700">
          <h2 className="text-kids-sm font-black text-gray-700 dark:text-gray-100 mb-3">
            Urheberrecht
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
            dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
            der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen
            Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-kids-xl p-5 shadow-[0_4px_0_rgba(167,139,250,0.2)] border-2 border-purple-100 dark:border-slate-700">
          <h2 className="text-kids-sm font-black text-gray-700 dark:text-gray-100 mb-3">
            Quellen der Lerninhalte
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
            Die Lerninhalte und Aufgaben in KidsClub basieren auf:
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
            <li>
              <strong>KMK-Bildungsstandards</strong> – Gemeinsame Bildungsstandards der Kultusministerkonferenz für Deutsch, Mathematik, Englisch und weitere Fächer (Klasse 1–13)
            </li>
            <li>
              <strong>Länderspezifische Lehrpläne</strong> – Die KI-Hausaufgabenhilfe (Kiko) orientiert sich am Lehrplan des bei der Anmeldung gewählten Bundeslands. Da Bildung in Deutschland Ländersache ist, können Inhalte, Reihenfolge und Schwerpunkte je nach Bundesland abweichen.
            </li>
            <li>
              <strong>KI-generierte Inhalte</strong> – Kiko nutzt das Sprachmodell <em>Llama 3.1</em> (via Groq API). Die Antworten sind KI-generiert und dienen als Lernhilfe – sie ersetzen keine Lehrperson und erheben keinen Anspruch auf Vollständigkeit.
            </li>
          </ul>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 italic">
            Hinweis: Trotz sorgfältiger Entwicklung können KI-generierte Antworten Fehler enthalten. Bei Unsicherheiten empfehlen wir, die Schulbücher oder Lehrkräfte zu Rate zu ziehen.
          </p>
        </section>

        <div className="text-center pt-2">
          <Link href="/datenschutz" className="text-sm text-kidsPurple font-bold underline underline-offset-2">
            → Zur Datenschutzerklärung
          </Link>
        </div>

      </div>
    </main>
  );
}
