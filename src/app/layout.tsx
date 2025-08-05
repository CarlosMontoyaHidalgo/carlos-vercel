import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { NavigationProvider } from "@/providers/NavigationProvider";
import { LanguageProvider } from "@/providers/LanguageProvider";
import AdminFloatingButton from "@/components/AdminFloatingButton";
import SmartChatbot from "@/components/features/SmartChatbot";
import SecretAdminAccess from "@/components/ui/SecretAdminAccess";
import StructuredData from "@/components/SEO/StructuredData";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { getLocalizedMetadata } from "@/lib/seo-localized";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Exportar metadata optimizada (español por defecto)
export const metadata: Metadata = getLocalizedMetadata('es');

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
              <SmartChatbot />
              <SecretAdminAccess />
            </NavigationProvider>
          </LanguageProvider>
        </ThemeProvider>
        
        {/* SEO: Structured Data para motores de búsqueda */}
        <StructuredData />
        
        {/* Analytics */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
