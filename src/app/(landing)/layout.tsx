import { Navbar } from "@/components/landing/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/providers/AuthProvider";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";

const landingSerif = Cormorant_Garamond({
  variable: "--font-landing-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
});

const landingSans = Plus_Jakarta_Sans({
  variable: "--font-landing-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <div className={`${landingSerif.variable} ${landingSans.variable}`}>
          <Navbar />
          {children}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
