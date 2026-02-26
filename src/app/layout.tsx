import type { Metadata, Viewport } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import KidsNavbar from "@/components/layout/KidsNavbar";
import ThemeToggle from "@/components/layout/ThemeToggle";
import ScreenTimeTimer from "@/components/timer/ScreenTimeTimer";
import SessionHydrator from "@/components/auth/SessionHydrator";
import Providers from "./providers";
import CookieBanner from "@/components/legal/CookieBanner";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: "KidsClub 🦊",
  description: "Dein sicherer Bereich im Internet – für Kinder!",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#C084FC",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={nunito.variable}>
      <body className="font-kids bg-kidsBg dark:bg-slate-900 antialiased transition-colors duration-300">
        <Providers>
          <SessionHydrator />
          <ThemeToggle />
          <ScreenTimeTimer>
            {children}
          </ScreenTimeTimer>
          <KidsNavbar />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
