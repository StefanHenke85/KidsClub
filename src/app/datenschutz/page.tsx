import Link from "next/link";

export const metadata = {
  title: "Datenschutz – KidsClub",
};

export default function DatenschutzPage() {
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
            <span className="text-5xl animate-float sticker leading-none">🔒</span>
            <h1 className="text-kids-xl font-black text-white drop-shadow-md">Datenschutz</h1>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-5">

        <section className="bg-white dark:bg-slate-800 rounded-kids-xl p-5 shadow-[0_4px_0_rgba(167,139,250,0.2)] border-2 border-purple-100 dark:border-slate-700">
          <h2 className="text-kids-sm font-black text-gray-700 dark:text-gray-100 mb-2">1. Verantwortlicher</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Stefan Henke<br />
            Rheinstraße 40, 47495 Rheinberg<br />
            E-Mail: <a href="mailto:henke.stefan1985@gmail.com" className="text-kidsPurple underline underline-offset-2">henke.stefan1985@gmail.com</a>
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-kids-xl p-5 shadow-[0_4px_0_rgba(167,139,250,0.2)] border-2 border-purple-100 dark:border-slate-700">
          <h2 className="text-kids-sm font-black text-gray-700 dark:text-gray-100 mb-2">2. Erhobene Daten</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
            Wir erheben und verarbeiten folgende personenbezogene Daten:
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
            <li><strong>Eltern:</strong> E-Mail-Adresse, verschlüsseltes Passwort, PIN-Hash</li>
            <li><strong>Kinder:</strong> Vorname, Alter, Klasse, Avatar-Emoji, Lernfortschritt</li>
            <li><strong>Nutzungslog:</strong> Bildschirmzeit, XP-Punkte, gespielte Lernspiele</li>
            <li><strong>Chat:</strong> Nachrichten zwischen befreundeten Kindern (elternüberwacht)</li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mt-2">
            Es werden <strong>keine</strong> Echtname, Fotos, Standortdaten oder sensible Kategorien erhoben.
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-kids-xl p-5 shadow-[0_4px_0_rgba(167,139,250,0.2)] border-2 border-purple-100 dark:border-slate-700">
          <h2 className="text-kids-sm font-black text-gray-700 dark:text-gray-100 mb-2">3. Zweck der Verarbeitung</h2>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
            <li>Bereitstellung der kindgerechten Lernplattform</li>
            <li>Elterliche Kontrolle und Überwachung der Nutzung</li>
            <li>Sicherer Freunde-Chat mit elterlicher Genehmigung</li>
            <li>Lernfortschritt und Gamification (XP, Level, Abzeichen)</li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) sowie Art. 8 DSGVO
            (Einwilligung der Eltern für Kinder unter 16 Jahren).
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-kids-xl p-5 shadow-[0_4px_0_rgba(167,139,250,0.2)] border-2 border-purple-100 dark:border-slate-700">
          <h2 className="text-kids-sm font-black text-gray-700 dark:text-gray-100 mb-2">4. Datenspeicherung & Hosting</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Die Anwendung wird gehostet bei <strong>Vercel Inc.</strong> (USA) unter Nutzung der
            EU-Standardvertragsklauseln. Die Datenbank läuft bei <strong>Turso</strong> (SQLite,
            Edge-Infrastruktur). Passwörter und PINs werden ausschließlich als bcrypt-Hash
            gespeichert – niemals im Klartext. Authentifizierungs-Tokens (JWTs) werden als
            HttpOnly-Cookies gespeichert und sind für JavaScript nicht zugänglich.
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-kids-xl p-5 shadow-[0_4px_0_rgba(167,139,250,0.2)] border-2 border-purple-100 dark:border-slate-700">
          <h2 className="text-kids-sm font-black text-gray-700 dark:text-gray-100 mb-2">5. Bundesland & Lehrplan-Anpassung</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Bei der Erstellung eines Kindprofils wird das <strong>Bundesland</strong> gespeichert und im
            Login-Token hinterlegt. Es dient ausschließlich dazu, die Hausaufgaben-KI (Kiko) an den
            jeweiligen Landeslehrplan anzupassen – z.B. Englisch ab Klasse 1 in NRW vs. ab Klasse 3 in Bayern.
            Grundlage sind die <strong>KMK-Bildungsstandards</strong> (Kultusministerkonferenz).
            Da Bildung in Deutschland Ländersache ist, können Inhalte je nach Bundesland abweichen.
            KI-Antworten sind Lernhilfen und ersetzen keine Lehrkraft.
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-kids-xl p-5 shadow-[0_4px_0_rgba(167,139,250,0.2)] border-2 border-purple-100 dark:border-slate-700">
          <h2 className="text-kids-sm font-black text-gray-700 dark:text-gray-100 mb-2">7. KI-Dienste (Hausaufgaben-Hilfe)</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Die Hausaufgaben-Hilfe nutzt die KI-API von <strong>Groq Inc.</strong> (USA). Dabei
            werden die eingegebenen Fragen des Kindes an die API übermittelt. Es werden keine
            personenbezogenen Daten (Name, Alter etc.) an Groq übertragen. Groq verarbeitet
            Anfragen gemäß ihrer Datenschutzrichtlinie und speichert keine Anfragen dauerhaft.
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-kids-xl p-5 shadow-[0_4px_0_rgba(167,139,250,0.2)] border-2 border-purple-100 dark:border-slate-700">
          <h2 className="text-kids-sm font-black text-gray-700 dark:text-gray-100 mb-2">8. Cookies</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Wir verwenden ausschließlich <strong>technisch notwendige Cookies</strong>:
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside mt-2">
            <li><code className="bg-purple-50 dark:bg-slate-700 px-1 rounded text-xs">child_session</code> – Kind-Login, 30 Tage, HttpOnly</li>
            <li><code className="bg-purple-50 dark:bg-slate-700 px-1 rounded text-xs">parent_session</code> – Eltern-Login, 7 Tage, HttpOnly</li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Es werden <strong>keine</strong> Tracking-, Werbe- oder Analyse-Cookies verwendet.
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-kids-xl p-5 shadow-[0_4px_0_rgba(167,139,250,0.2)] border-2 border-purple-100 dark:border-slate-700">
          <h2 className="text-kids-sm font-black text-gray-700 dark:text-gray-100 mb-2">9. Rechte der Betroffenen</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-2">
            Sie haben gemäß DSGVO folgende Rechte:
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside">
            <li>Auskunft (Art. 15 DSGVO)</li>
            <li>Berichtigung (Art. 16 DSGVO)</li>
            <li>Löschung / &bdquo;Recht auf Vergessenwerden&ldquo; (Art. 17 DSGVO)</li>
            <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
            <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
            <li>Widerspruch (Art. 21 DSGVO)</li>
          </ul>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Zur Ausübung Ihrer Rechte wenden Sie sich an:{" "}
            <a href="mailto:henke.stefan1985@gmail.com" className="text-kidsPurple underline underline-offset-2">
              henke.stefan1985@gmail.com
            </a>
          </p>
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-kids-xl p-5 shadow-[0_4px_0_rgba(167,139,250,0.2)] border-2 border-purple-100 dark:border-slate-700">
          <h2 className="text-kids-sm font-black text-gray-700 dark:text-gray-100 mb-2">10. Beschwerderecht</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
            Zuständig ist die Landesbeauftragte für Datenschutz und Informationsfreiheit
            Nordrhein-Westfalen (LDI NRW), Kavalleriestr. 2–4, 40213 Düsseldorf.
          </p>
        </section>

        <p className="text-xs text-gray-400 dark:text-gray-500 text-center pb-4">
          Stand: Februar 2026
        </p>

        <div className="text-center pt-2">
          <Link href="/impressum" className="text-sm text-kidsPurple font-bold underline underline-offset-2">
            → Zum Impressum
          </Link>
        </div>

      </div>
    </main>
  );
}
