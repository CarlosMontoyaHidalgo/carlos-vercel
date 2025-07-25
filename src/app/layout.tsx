import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { NavigationProvider } from "@/providers/NavigationProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import AdminFloatingButton from "@/components/AdminFloatingButton";
import SmartChatbot from "@/components/features/SmartChatbot";
import SecretAdminAccess from "@/components/ui/SecretAdminAccess";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Carlos Montoya - Desarrollador Full Stack",
  description: "Portfolio personal de Carlos Montoya Hidalgo, desarrollador full stack especializado en React, Next.js, TypeScript y tecnologías web modernas.",
  keywords: "desarrollador, full stack, React, Next.js, TypeScript, portfolio",
  authors: [{ name: "Carlos Montoya Hidalgo" }],
  creator: "Carlos Montoya Hidalgo",
  openGraph: {
    type: "website",
    title: "Carlos Montoya - Desarrollador Full Stack",
    description: "Portfolio personal de Carlos Montoya Hidalgo",
    siteName: "Carlos Montoya Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carlos Montoya - Desarrollador Full Stack",
    description: "Portfolio personal de Carlos Montoya Hidalgo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <LanguageProvider>
            <NavigationProvider>
              {children}
              <AdminFloatingButton />
              <SecretAdminAccess />
            </NavigationProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
