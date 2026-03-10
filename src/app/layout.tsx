import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { cn } from "@/lib/utils/utils";
import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Bold Shelf — Fraunces: heavy editorial serif for GIANT display headlines
const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Librarium — Read More. Together.",
  description:
    "Track your reading, discover through friends, and build your shelf. The social reading tracker.",
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
