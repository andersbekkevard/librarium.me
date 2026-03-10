import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { cn } from "@/lib/utils/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fraunces — editorial display serif for the Literary Magazine landing variant
// Heavy weight, tight leading, magazine masthead feel
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

// Playfair Display — used in the app UI headings
const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Librarium - Your Personal Book Collection",
  description:
    "Track your reading progress and organize your personal library with Librarium",
  verification: {
    google: "VUAQN43dnQdrEpyAgK0L9-GeyQHXydSUfI2Zmw9nD1Q",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans",
          geistSans.variable,
          geistMono.variable,
          fraunces.variable,
          playfairDisplay.variable,
          "antialiased",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary
            context={{
              component: "RootLayout",
              action: "render",
            }}
          >
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
