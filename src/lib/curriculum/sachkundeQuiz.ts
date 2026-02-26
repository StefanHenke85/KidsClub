// ─────────────────────────────────────────────────────────────────────────────
// Sachkunde-Quiz nach KMK-Lehrplan / Bildungsstandards
// Kl.1-2: Heimat- und Sachkunde – Körper, Tiere, Pflanzen, Familie, Jahreszeiten
// Kl.3-4: Natur, Geografie Deutschlands, einfache Naturwissenschaft
// Kl.5-6: Biologie (Zelle, Organe), Geographie (Kontinente, Klima), Physik-Grundlagen
// Kl.7-8: Geschichte (Mittelalter–Neuzeit), Politik & Gesellschaft, Biologie
// Kl.9-10: Zeitgeschichte (WK1+2, BRD/DDR), Wirtschaft, Chemie/Physik Grundlagen
// Kl.11-13: Komplexe Themen – Globalisierung, Philosophie, moderne Naturwissenschaft
// ─────────────────────────────────────────────────────────────────────────────

export interface SachkundeQuestion {
  question: string;
  emoji: string;
  choices: string[];
  correct: string;
  grade: number;
}

export const SACHKUNDE_QUESTIONS: SachkundeQuestion[] = [

  // ══ Klasse 1: Heimat- & Sachkunde – Körper, Familie, Tiere ══════════════
  { question: "Wie viele Finger hat eine Hand?",
    emoji: "✋", choices: ["5","4","6","3"], correct: "5", grade: 1 },
  { question: "Womit siehst du?",
    emoji: "👁️", choices: ["Mit den Augen","Mit den Ohren","Mit der Nase","Mit dem Mund"], correct: "Mit den Augen", grade: 1 },
  { question: "Womit hörst du?",
    emoji: "👂", choices: ["Mit den Ohren","Mit den Augen","Mit der Haut","Mit dem Mund"], correct: "Mit den Ohren", grade: 1 },
  { question: "Was fressen Kühe hauptsächlich?",
    emoji: "🐄", choices: ["Gras","Fisch","Fleisch","Brot"], correct: "Gras", grade: 1 },
  { question: "Wo leben Fische?",
    emoji: "🐟", choices: ["Im Wasser","In der Luft","Unter der Erde","Im Sand"], correct: "Im Wasser", grade: 1 },
  { question: "Was macht eine Biene?",
    emoji: "🐝", choices: ["Honig sammeln","Milch geben","Wolle spinnen","Eier legen"], correct: "Honig sammeln", grade: 1 },
  { question: "Woher kommt die Milch?",
    emoji: "🥛", choices: ["Von der Kuh","Vom Baum","Aus dem Meer","Vom Schaf"], correct: "Von der Kuh", grade: 1 },
  { question: "Welches Tier kann fliegen?",
    emoji: "🐦", choices: ["Vogel","Hund","Katze","Pferd"], correct: "Vogel", grade: 1 },
  { question: "Wie viele Beine hat ein Hund?",
    emoji: "🐶", choices: ["4","2","6","8"], correct: "4", grade: 1 },
  { question: "Welche Farbe hat reifes Gras?",
    emoji: "🌿", choices: ["Grün","Rot","Blau","Gelb"], correct: "Grün", grade: 1 },
  { question: "Wie viele Jahreszeiten gibt es?",
    emoji: "🌸", choices: ["4","2","6","12"], correct: "4", grade: 1 },
  { question: "Welche Jahreszeit kommt nach dem Winter?",
    emoji: "🌱", choices: ["Frühling","Herbst","Sommer","Regen"], correct: "Frühling", grade: 1 },
  { question: "Was brauchen Pflanzen zum Wachsen?",
    emoji: "🌱", choices: ["Wasser und Licht","Eis und Schnee","Sand und Steine","Öl und Salz"], correct: "Wasser und Licht", grade: 1 },
  { question: "Wie viele Beine hat eine Spinne?",
    emoji: "🕷️", choices: ["8","4","6","2"], correct: "8", grade: 1 },
  { question: "Welcher Körperteil pumpt das Blut?",
    emoji: "❤️", choices: ["Herz","Lunge","Niere","Magen"], correct: "Herz", grade: 1 },

  // ══ Klasse 2: Natur, Jahreszeiten, einfache Naturgesetze ════════════════
  { question: "Was fressen Pflanzenfresser (Herbivoren)?",
    emoji: "🦌", choices: ["Pflanzen","Tiere","Beides","Steine"], correct: "Pflanzen", grade: 2 },
  { question: "Welcher Planet ist der größte in unserem Sonnensystem?",
    emoji: "🪐", choices: ["Jupiter","Erde","Mars","Saturn"], correct: "Jupiter", grade: 2 },
  { question: "Was erzeugt die Sonne für die Erde?",
    emoji: "☀️", choices: ["Licht und Wärme","Regen und Wind","Schnee und Eis","Schatten"], correct: "Licht und Wärme", grade: 2 },
  { question: "Was ist Tau?",
    emoji: "💧", choices: ["Wassertropfen am Morgen","Regen im Frühling","Schnee im Winter","Eis im Herbst"], correct: "Wassertropfen am Morgen", grade: 2 },
  { question: "Was ist ein Amphibium?",
    emoji: "🐸", choices: ["Lebt in Wasser und auf Land","Nur im Meer","Nur an Land","Nur in der Luft"], correct: "Lebt in Wasser und auf Land", grade: 2 },
  { question: "Was sammeln Vögel, die im Herbst wegfliegen?",
    emoji: "🐦", choices: ["Sie sind Zugvögel","Sie sind Winterschläfer","Sie verstecken Futter","Sie bauen Nester"], correct: "Sie sind Zugvögel", grade: 2 },
  { question: "Woher kommt unser Trinkwasser?",
    emoji: "💧", choices: ["Aus Grundwasser und Flüssen","Nur aus Regen","Aus dem Meer","Aus der Luft"], correct: "Aus Grundwasser und Flüssen", grade: 2 },
  { question: "Was ist Kompost?",
    emoji: "🌱", choices: ["Aus Abfällen gewonnener Dünger","Eine Pflanzenkrankheit","Ein Tier im Boden","Eine Bodenart"], correct: "Aus Abfällen gewonnener Dünger", grade: 2 },
  { question: "Welches Tier hält Winterschlaf?",
    emoji: "🐻", choices: ["Bär","Hund","Pferd","Vogel"], correct: "Bär", grade: 2 },
  { question: "Was ist der Kreislauf des Wassers?",
    emoji: "🌧️", choices: ["Verdunstung → Wolken → Regen","Fluss → Meer → Fisch","Schnee → Sand → Wind","Regen → Stein → Lava"], correct: "Verdunstung → Wolken → Regen", grade: 2 },

  // ══ Klasse 3: Geografie Deutschlands, Natur, einfache Wissenschaft ════════
  { question: "Was ist die Hauptstadt von Deutschland?",
    emoji: "🇩🇪", choices: ["Berlin","München","Hamburg","Frankfurt"], correct: "Berlin", grade: 3 },
  { question: "Welcher Fluss fließt durch Köln?",
    emoji: "🌊", choices: ["Rhein","Donau","Elbe","Weser"], correct: "Rhein", grade: 3 },
  { question: "Wie viele Bundesländer hat Deutschland?",
    emoji: "🗺️", choices: ["16","12","20","9"], correct: "16", grade: 3 },
  { question: "Was ist der höchste Berg Deutschlands?",
    emoji: "⛰️", choices: ["Zugspitze","Feldberg","Brocken","Watzmann"], correct: "Zugspitze", grade: 3 },
  { question: "Womit atmen Fische?",
    emoji: "🐟", choices: ["Kiemen","Lungen","Haut","Mund"], correct: "Kiemen", grade: 3 },
  { question: "Wo liegt die Sahara-Wüste?",
    emoji: "🏜️", choices: ["Afrika","Asien","Amerika","Europa"], correct: "Afrika", grade: 3 },
  { question: "Wie viele Kontinente gibt es?",
    emoji: "🌍", choices: ["7","5","6","4"], correct: "7", grade: 3 },
  { question: "Was ist der größte Ozean der Erde?",
    emoji: "🌊", choices: ["Pazifik","Atlantik","Indischer Ozean","Arktischer Ozean"], correct: "Pazifik", grade: 3 },
  { question: "Was ist eine Metamorphose in der Natur?",
    emoji: "🦋", choices: ["Verwandlung eines Tieres (z.B. Raupe→Falter)","Vulkanausbruch","Tierwanderung","Jahreszeiten-Wechsel"], correct: "Verwandlung eines Tieres (z.B. Raupe→Falter)", grade: 3 },
  { question: "Was ist Photosynthese?",
    emoji: "🌿", choices: ["Pflanzen erzeugen Zucker aus Licht","Tiere verdauen Nahrung","Wasser verdunstet","Erde dreht sich"], correct: "Pflanzen erzeugen Zucker aus Licht", grade: 3 },
  { question: "Welche Himmelsrichtung zeigt der Kompass an?",
    emoji: "🧭", choices: ["Norden","Osten","Westen","Süden"], correct: "Norden", grade: 3 },
  { question: "Wie nennt man die Hauptstadt von Österreich?",
    emoji: "🇦🇹", choices: ["Wien","Salzburg","Innsbruck","Graz"], correct: "Wien", grade: 3 },
  { question: "Was ist der längste Fluss der Welt?",
    emoji: "🌊", choices: ["Nil","Amazonas","Yangtze","Donau"], correct: "Nil", grade: 3 },
  { question: "Wie nennt man Tiere, die Pflanzen und Fleisch fressen?",
    emoji: "🐷", choices: ["Allesfresser","Pflanzenfresser","Fleischfresser","Pilzfresser"], correct: "Allesfresser", grade: 3 },

  // ══ Klasse 4: Naturwissenschaft, Geschichte der Region, Gesellschaft ══════
  { question: "Was ist Chlorophyll?",
    emoji: "🍃", choices: ["Grüner Farbstoff in Pflanzen","Tier im Boden","Bodenart","Pilzspore"], correct: "Grüner Farbstoff in Pflanzen", grade: 4 },
  { question: "Welche Ressource ist endlich (nicht erneuerbar)?",
    emoji: "⛽", choices: ["Erdöl","Sonnenenergie","Wind","Wasser"], correct: "Erdöl", grade: 4 },
  { question: "Was ist ein Fossil?",
    emoji: "🦴", choices: ["Versteinerter Organismus","Flüssiges Gestein","Meerwasser","Bergkristall"], correct: "Versteinerter Organismus", grade: 4 },
  { question: "Welcher Planet ist am nächsten zur Sonne?",
    emoji: "☀️", choices: ["Merkur","Venus","Erde","Mars"], correct: "Merkur", grade: 4 },
  { question: "Wie viele Planeten hat unser Sonnensystem?",
    emoji: "🪐", choices: ["8","9","7","10"], correct: "8", grade: 4 },
  { question: "Was ist ein Ökosystem?",
    emoji: "🌱", choices: ["Lebensraum mit Tieren und Pflanzen","Ein Planet","Meeresströmung","Klimazone"], correct: "Lebensraum mit Tieren und Pflanzen", grade: 4 },
  { question: "Was schützt den Körper vor Krankheitserregern?",
    emoji: "🛡️", choices: ["Immunsystem","Skelett","Muskeln","Haut allein"], correct: "Immunsystem", grade: 4 },
  { question: "Was ist Erosion?",
    emoji: "🏔️", choices: ["Abbau von Gestein durch Wasser/Wind","Vulkanausbruch","Erdbeben","Flutkatastrophe"], correct: "Abbau von Gestein durch Wasser/Wind", grade: 4 },

  // ══ Klasse 5: Biologie (Zelle, Tiere), Geografie (Klima), Physik ════════
  { question: "Woraus besteht Luft hauptsächlich?",
    emoji: "💨", choices: ["Stickstoff (78%)","Sauerstoff (78%)","CO₂ (78%)","Wasserdampf (78%)"], correct: "Stickstoff (78%)", grade: 5 },
  { question: "Was ist die Atmosphäre der Erde?",
    emoji: "🌍", choices: ["Lufthülle der Erde","Ozeane","Erdkern","Gebirge"], correct: "Lufthülle der Erde", grade: 5 },
  { question: "Welche Kraft hält uns auf der Erde?",
    emoji: "🍎", choices: ["Gravitation","Magnetismus","Elektrizität","Zentrifugalkraft"], correct: "Gravitation", grade: 5 },
  { question: "Wie entsteht ein Erdbeben?",
    emoji: "🏔️", choices: ["Bewegung der Erdplatten","Windströmung","Mondanziehung","Sonnenhitze"], correct: "Bewegung der Erdplatten", grade: 5 },
  { question: "Was ist ein Kompass?",
    emoji: "🧭", choices: ["Zeigt Himmelsrichtungen","Misst Temperatur","Misst Höhe","Zeigt Uhrzeit"], correct: "Zeigt Himmelsrichtungen", grade: 5 },
  { question: "Was untersucht die Biologie?",
    emoji: "🔬", choices: ["Lebewesen","Gesteine","Planeten","Atome"], correct: "Lebewesen", grade: 5 },
  { question: "Was ist die Zellteilung?",
    emoji: "🦠", choices: ["Aus einer Zelle entstehen zwei","Zelltod","Zellwachstum","Zellschrumpfung"], correct: "Aus einer Zelle entstehen zwei", grade: 5 },
  { question: "Was ist der Unterschied zwischen Klimazone und Klimawandel?",
    emoji: "🌍", choices: ["Klimazone = dauerhaft, Klimawandel = Veränderung","Klimazone = Veränderung, Klimawandel = dauerhaft","Beides ist gleich","Beides beschreibt Wetter"], correct: "Klimazone = dauerhaft, Klimawandel = Veränderung", grade: 5 },
  { question: "Was ist der Aggregatzustand von Eis?",
    emoji: "❄️", choices: ["Fest","Flüssig","Gasförmig","Plasma"], correct: "Fest", grade: 5 },
  { question: "Was ist ein Ökosystem-Gleichgewicht?",
    emoji: "⚖️", choices: ["Alle Arten halten sich gegenseitig in Balance","Nur Pflanzen leben","Nur Tiere leben","Mensch greift nicht ein"], correct: "Alle Arten halten sich gegenseitig in Balance", grade: 5 },

  // ══ Klasse 6: Biologie (Organe, Sinne), Geografie (Europa) ═══════════════
  { question: "Was ist die Aufgabe der Lunge?",
    emoji: "🫁", choices: ["Sauerstoff aufnehmen, CO₂ abgeben","Blut pumpen","Nahrung verdauen","Hormone produzieren"], correct: "Sauerstoff aufnehmen, CO₂ abgeben", grade: 6 },
  { question: "Was ist die Aufgabe des Herzens?",
    emoji: "❤️", choices: ["Blut durch den Körper pumpen","Nahrung verdauen","Luft atmen","Nerven steuern"], correct: "Blut durch den Körper pumpen", grade: 6 },
  { question: "Wie nennt man die Wissenschaft von Gesteinen?",
    emoji: "🪨", choices: ["Geologie","Biologie","Chemie","Astronomie"], correct: "Geologie", grade: 6 },
  { question: "Was ist die EU?",
    emoji: "🇪🇺", choices: ["Europäische Union – Zusammenschluss europ. Staaten","Militärbündnis","Währungsunion allein","Handelspakt mit USA"], correct: "Europäische Union – Zusammenschluss europ. Staaten", grade: 6 },
  { question: "Was ist die Hauptstadt von Frankreich?",
    emoji: "🇫🇷", choices: ["Paris","Lyon","Marseille","Bordeaux"], correct: "Paris", grade: 6 },
  { question: "Welcher Fluss ist der längste Europas?",
    emoji: "🌊", choices: ["Wolga","Rhein","Donau","Elbe"], correct: "Wolga", grade: 6 },
  { question: "Was ist ein Kontrast in der Geografie?",
    emoji: "🏔️", choices: ["Gegensatz z.B. Wüste vs. Regenwald","Eine Bergkette","Eine Klimazone","Eine Bodenart"], correct: "Gegensatz z.B. Wüste vs. Regenwald", grade: 6 },

  // ══ Klasse 7: Geschichte (Mittelalter, Neuzeit), Politik, Biologie ════════
  { question: "Wann wurde das Grundgesetz der BRD verabschiedet?",
    emoji: "📜", choices: ["1949","1945","1933","1990"], correct: "1949", grade: 7 },
  { question: "Was bedeutet Demokratie?",
    emoji: "🗳️", choices: ["Volksherrschaft","Königsherrschaft","Militärregierung","Diktatur"], correct: "Volksherrschaft", grade: 7 },
  { question: "Was ist die Magna Carta?",
    emoji: "📜", choices: ["Englisches Freiheitsdokument von 1215","Deutsches Grundgesetz","Amerikanische Unabhängigkeitserklärung","Französische Menschenrechte"], correct: "Englisches Freiheitsdokument von 1215", grade: 7 },
  { question: "Was war die Reformation?",
    emoji: "⛪", choices: ["Kirchenspaltung durch Martin Luther 1517","Mittelalterliche Revolution","Entdeckung Amerikas","Industrialisierung Deutschlands"], correct: "Kirchenspaltung durch Martin Luther 1517", grade: 7 },
  { question: "Was ist der Absolutismus?",
    emoji: "👑", choices: ["Alleinherrschaft eines Monarchen (17./18. Jh.)","Volksabstimmung","Föderalismus","Republik"], correct: "Alleinherrschaft eines Monarchen (17./18. Jh.)", grade: 7 },
  { question: "Was ist der Bundestag?",
    emoji: "🏛️", choices: ["Deutsches Parlament","Bundesregierung","Bundesrat","Bundesgericht"], correct: "Deutsches Parlament", grade: 7 },
  { question: "Was ist Chromosom?",
    emoji: "🧬", choices: ["Träger der Erbinformation","Organ im Gehirn","Art von Protein","Zellteilungsprodukt"], correct: "Träger der Erbinformation", grade: 7 },
  { question: "Was ist der Unterschied zwischen Erbanlage (Gen) und Chromosom?",
    emoji: "🧬", choices: ["Gen = Einzelinformation, Chromosom = Träger vieler Gene","Beides ist dasselbe","Gen = Chromosom × 2","Chromosom = DNA allein"], correct: "Gen = Einzelinformation, Chromosom = Träger vieler Gene", grade: 7 },
  { question: "Was ist Fotosynthese kurz erklärt?",
    emoji: "🌿", choices: ["Licht + CO₂ + Wasser → Zucker + Sauerstoff","Nahrung → Energie","Zellteilung","Wachstum"], correct: "Licht + CO₂ + Wasser → Zucker + Sauerstoff", grade: 7 },
  { question: "Wer regiert Deutschland (Bundesebene)?",
    emoji: "🏛️", choices: ["Bundesregierung mit Kanzler/in","Bundespräsident allein","Bundestag allein","Bundesrat allein"], correct: "Bundesregierung mit Kanzler/in", grade: 7 },

  // ══ Klasse 8: Geschichte (Neuzeit, Industrialisierung), Wirtschaft ════════
  { question: "Wann begann die Industrielle Revolution in Deutschland?",
    emoji: "🏭", choices: ["19. Jahrhundert","17. Jahrhundert","15. Jahrhundert","20. Jahrhundert"], correct: "19. Jahrhundert", grade: 8 },
  { question: "Was ist Imperialismus?",
    emoji: "🌍", choices: ["Großmächte errichten Kolonien und Einflusssphären","Volksherrschaft","Bündnis kleiner Staaten","Abschaffung der Monarchie"], correct: "Großmächte errichten Kolonien und Einflusssphären", grade: 8 },
  { question: "Was ist das BIP (Bruttoinlandsprodukt)?",
    emoji: "📈", choices: ["Gesamtwert aller Waren/Dienstleistungen eines Landes","Staatsverschuldung","Inflationsrate","Exportwert"], correct: "Gesamtwert aller Waren/Dienstleistungen eines Landes", grade: 8 },
  { question: "Was ist Inflation?",
    emoji: "💰", choices: ["Allgemeiner Preisanstieg der Güter","Wirtschaftswachstum","Handelsdefizit","Steuersenkung"], correct: "Allgemeiner Preisanstieg der Güter", grade: 8 },
  { question: "Welcher Wissenschaftler entwickelte die Evolutionstheorie?",
    emoji: "🐒", choices: ["Charles Darwin","Isaac Newton","Albert Einstein","Gregor Mendel"], correct: "Charles Darwin", grade: 8 },
  { question: "Was ist Meiose?",
    emoji: "🧬", choices: ["Zellteilung zur Bildung von Keimzellen","Normale Zellteilung","Tod einer Zelle","Wachstum eines Organs"], correct: "Zellteilung zur Bildung von Keimzellen", grade: 8 },
  { question: "Was ist der Unterschied zwischen Bakterien und Viren?",
    emoji: "🦠", choices: ["Bakterien sind Lebewesen, Viren nicht vollständig","Beide sind dasselbe","Viren sind größer","Bakterien haben kein Erbgut"], correct: "Bakterien sind Lebewesen, Viren nicht vollständig", grade: 8 },
  { question: "Wann wurde Deutschland wiedervereinigt?",
    emoji: "🇩🇪", choices: ["1990","1989","1945","1949"], correct: "1990", grade: 8 },

  // ══ Klasse 9: Zeitgeschichte (WK1+2, BRD/DDR), Physik, Chemie ════════════
  { question: "Wann begann der Erste Weltkrieg?",
    emoji: "⚔️", choices: ["1914","1939","1918","1871"], correct: "1914", grade: 9 },
  { question: "Wann endete der Zweite Weltkrieg?",
    emoji: "🕊️", choices: ["1945","1944","1918","1939"], correct: "1945", grade: 9 },
  { question: "Was war die DDR?",
    emoji: "🧱", choices: ["Kommunistischer Staat in Ostdeutschland 1949–1990","Westdeutschland","Teil der NATO","Freistaat Bayern"], correct: "Kommunistischer Staat in Ostdeutschland 1949–1990", grade: 9 },
  { question: "Was fiel am 9. November 1989?",
    emoji: "🧱", choices: ["Die Berliner Mauer","Das Grundgesetz","Die Weimarer Republik","Das Kaiserreich"], correct: "Die Berliner Mauer", grade: 9 },
  { question: "Was ist Radioaktivität?",
    emoji: "☢️", choices: ["Zerfall instabiler Atomkerne mit Strahlung","Lichtbrechung","Schallwellen","Magnetismus"], correct: "Zerfall instabiler Atomkerne mit Strahlung", grade: 9 },
  { question: "Was ist eine chemische Reaktion?",
    emoji: "⚗️", choices: ["Stoffe verändern ihre Zusammensetzung","Physikalische Formveränderung","Temperaturmessung","Lösungsvorgang"], correct: "Stoffe verändern ihre Zusammensetzung", grade: 9 },
  { question: "Was ist der Unterschied zwischen Elementen und Verbindungen?",
    emoji: "⚗️", choices: ["Elemente = reine Stoffe, Verbindungen = aus mehreren Elementen","Beides ist gleich","Verbindungen = reine Stoffe","Elemente = komplexer"], correct: "Elemente = reine Stoffe, Verbindungen = aus mehreren Elementen", grade: 9 },
  { question: "Was ist die Atommasse?",
    emoji: "⚛️", choices: ["Gewicht eines Atoms (Protonen + Neutronen)","Anzahl der Elektronen","Kernladungszahl","Isotopenzahl"], correct: "Gewicht eines Atoms (Protonen + Neutronen)", grade: 9 },

  // ══ Klasse 10: Moderne Geschichte, Globalisierung, Naturwissenschaft ═══════
  { question: "Was ist Globalisierung?",
    emoji: "🌐", choices: ["Weltweite Vernetzung von Wirtschaft und Gesellschaft","Klimawandel","EU-Erweiterung","Migrationskrise"], correct: "Weltweite Vernetzung von Wirtschaft und Gesellschaft", grade: 10 },
  { question: "Was ist die Relativitätstheorie?",
    emoji: "⚛️", choices: ["Einsteins Theorie: Raum, Zeit und Energie sind relativ","Darwins Evolutionstheorie","Newtons Gravitationsgesetz","Quantenmechanik"], correct: "Einsteins Theorie: Raum, Zeit und Energie sind relativ", grade: 10 },
  { question: "Was ist der Klimawandel?",
    emoji: "🌡️", choices: ["Erderwärmung durch Treibhausgase (CO₂, Methan)","Normaler Wetterwechsel","Eiszeit","Vulkanismus"], correct: "Erderwärmung durch Treibhausgase (CO₂, Methan)", grade: 10 },
  { question: "Was ist Biodiversität?",
    emoji: "🌿", choices: ["Vielfalt der Lebewesen auf der Erde","Menge der Pflanzen","Tierartenzahl im Meer","Zahl der Ökosysteme"], correct: "Vielfalt der Lebewesen auf der Erde", grade: 10 },
  { question: "Was ist das Ozon-Loch?",
    emoji: "☀️", choices: ["Dünnung der Ozonschicht durch FCKWs","Schwarzes Loch in der Erde","Klimazone ohne Ozon","Verschmutzter Ozean"], correct: "Dünnung der Ozonschicht durch FCKWs", grade: 10 },
  { question: "Was ist der Unterschied zwischen Kernfusion und Kernspaltung?",
    emoji: "⚛️", choices: ["Fusion = Kerne verschmelzen (Sonne), Spaltung = Kerne teilen sich (AKW)","Beides ist gleich","Fusion = im AKW","Spaltung = in der Sonne"], correct: "Fusion = Kerne verschmelzen (Sonne), Spaltung = Kerne teilen sich (AKW)", grade: 10 },

  // ══ Klasse 11-13: Komplexe Themen – Philosophie, Quantenmechanik ══════════
  { question: "Was ist Kants kategorischer Imperativ?",
    emoji: "⚖️", choices: ["Handle so, dass die Maxime deines Handelns Allgemeingesetz werden kann","Tue, was dir nützt","Folge den Gesetzen des Staates","Lebe nach der Natur"], correct: "Handle so, dass die Maxime deines Handelns Allgemeingesetz werden kann", grade: 11 },
  { question: "Was ist Quantenmechanik?",
    emoji: "⚛️", choices: ["Physik der kleinsten Teilchen (Atome, Elektronen)","Physik großer Massen","Astronomie","Klassische Mechanik"], correct: "Physik der kleinsten Teilchen (Atome, Elektronen)", grade: 11 },
  { question: "Was beschreibt die DNA-Doppelhelix?",
    emoji: "🧬", choices: ["Struktur des Erbguts (Desoxyribonucleinsäure)","Proteinstruktur","Zellfunktion","Chromosomenaufbau"], correct: "Struktur des Erbguts (Desoxyribonucleinsäure)", grade: 11 },
  { question: "Was ist CRISPR-Cas9?",
    emoji: "🔬", choices: ["Methode zur gezielten Gen-Editierung","Krebstherapie","Impftechnik","Computerchip"], correct: "Methode zur gezielten Gen-Editierung", grade: 12 },
  { question: "Was ist der Satz des Pythagoras in der Trigonometrie?",
    emoji: "📐", choices: ["sin²α + cos²α = 1","a² + b² = c²","e = mc²","F = ma"], correct: "sin²α + cos²α = 1", grade: 12 },
  { question: "Was ist Epigenetik?",
    emoji: "🧬", choices: ["Veränderung der Genexpression ohne DNA-Veränderung","Neue Gene durch Mutation","Horizontaler Gentransfer","Erbkrankheit"], correct: "Veränderung der Genexpression ohne DNA-Veränderung", grade: 13 },
  { question: "Was ist der Unterschied zwischen Induktion und Deduktion?",
    emoji: "🔍", choices: ["Induktion: vom Einzelfall zum Allgemeinen; Deduktion: umgekehrt","Beides ist gleich","Induktion = logischer Schluss","Deduktion = Experiment"], correct: "Induktion: vom Einzelfall zum Allgemeinen; Deduktion: umgekehrt", grade: 13 },
];

const usedSachkunde: Set<string> = new Set();

export function getSachkundeForGrade(grade: number): SachkundeQuestion[] {
  return SACHKUNDE_QUESTIONS.filter((q) => q.grade <= grade);
}

export function getRandomSachkundeQuestion(grade: number): SachkundeQuestion {
  const pool = getSachkundeForGrade(grade);
  let available = pool.filter((q) => !usedSachkunde.has(q.question));
  if (available.length === 0) {
    usedSachkunde.clear();
    available = pool;
  }
  const q = available[Math.floor(Math.random() * available.length)];
  usedSachkunde.add(q.question);
  return q;
}
