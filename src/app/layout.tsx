import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { cn } from "@/lib/utils/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fraunces — warm, expressive variable serif for display headlines
// Variable weight 300-800, with optical sizing
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: "Librarium — Your Reading Story, Beautifully Told",
  description:
    "Track your reading journey, connect with fellow readers, and celebrate every page. The social reading tracker for book lovers.",
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
          "antialiased",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
