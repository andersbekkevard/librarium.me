import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/toast";
import { LibraryProvider } from "@/lib/store";
import "./globals.css";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const serif = Playfair_Display({ variable: "--font-serif-display", subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Librarium - Your Personal Book Collection",
  description: "Track your reading progress and organize your personal library with Librarium",
  verification: { google: "VUAQN43dnQdrEpyAgK0L9-GeyQHXydSUfI2Zmw9nD1Q" },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${serif.variable} min-h-screen font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LibraryProvider>
            {children}
            <Toaster />
          </LibraryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
