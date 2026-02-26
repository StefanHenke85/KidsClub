# KidsClub 🎓

Eine kindgerechte Lernplattform für Grundschüler und Schüler bis Klasse 13 – mit Hausaufgaben-Hilfe, Lernspielen, Freundschaftssystem und Elternbereich.

🌐 **Live:** [kidsclub-app.vercel.app](https://kidsclub-app.vercel.app)

---

## Features

### Für Kinder
- **Dashboard** – persönliche Begrüßung mit Maskottchen, XP & Level-System
- **Hausaufgaben-Hilfe** – KI-gestützte Hilfe, angepasst ans Bundesland & Klassenstufe
- **Lernspiele** – Mathe, Deutsch & Logik (Klassen 1–13, XP-Belohnungen)
- **Freunde & Chat** – sicheres Freundschaftssystem mit elterlicher Genehmigung
- **Kindersichere Suche** – über fragFINN
- **Maskottchen** – 11 wählbare Tiere mit eigenem Namen (Fuchs, Bär, Eule u.v.m.)

### Für Eltern
- **Elternbereich** – PIN-geschützt, Übersicht über alle Kinder
- **Kinder verwalten** – anlegen, bearbeiten (Klasse, Maskottchen, Bundesland, Zeitlimit)
- **Freunde genehmigen** – Freundschaftsanfragen per Code bestätigen oder ablehnen
- **Fortschritt einsehen** – XP, Level, Aktivitäten
- **Tägliches Zeitlimit** – einstellbar pro Kind (15–180 Minuten)

### Bundesland-Anpassung
Kiko (der KI-Assistent) berücksichtigt den jeweiligen Lehrplan des Bundeslandes – alle 16 Bundesländer werden unterstützt.

---

## Tech-Stack

| Bereich | Technologie |
|---|---|
| Framework | Next.js 14 (App Router) |
| Sprache | TypeScript |
| Styling | Tailwind CSS |
| Datenbank | Turso (SQLite, HTTP REST) |
| Auth | jose (JWT), bcryptjs |
| KI | Groq API (Llama 3.1 8B) |
| State | Zustand, TanStack Query |
| Deployment | Vercel |

---

## Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Öffne [http://localhost:3000](http://localhost:3000) im Browser.

### Umgebungsvariablen

Erstelle eine `.env.local` Datei:

```env
TURSO_DATABASE_URL=
TURSO_AUTH_TOKEN=
JWT_SECRET=
GROQ_API_KEY=
```

---

## Projektstruktur

```
src/
├── app/                  # Next.js App Router Pages & API Routes
│   ├── api/              # Backend API Routes
│   ├── eltern/           # Elternbereich
│   ├── spiele/           # Lernspiele
│   ├── hausaufgaben/     # Hausaufgaben-Hilfe
│   └── chat/             # Freundschafts-Chat
├── components/           # Wiederverwendbare Komponenten
├── lib/                  # Hilfsfunktionen, DB-Client, Auth
├── store/                # Zustand Stores
└── types/                # TypeScript Typen
```

---

## Datenschutz & Impressum

Dieses Projekt richtet sich an Kinder und Eltern in Deutschland.
Alle Informationen unter: [kidsclub-app.vercel.app/impressum](https://kidsclub-app.vercel.app/impressum) & [kidsclub-app.vercel.app/datenschutz](https://kidsclub-app.vercel.app/datenschutz)

---

## Mitmachen

Das Projekt wird aktiv weiterentwickelt. Verbesserungsvorschläge und Feedback sind sehr willkommen!

- Issues öffnen: [github.com/StefanHenke85/KidsClub/issues](https://github.com/StefanHenke85/KidsClub/issues)
- Kontakt: henke.stefan1985@gmail.com

---

## Lizenz

Privates Projekt – alle Rechte vorbehalten. © Stefan Henke
