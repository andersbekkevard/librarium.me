import { AuroraNavbar } from "@/components/landing/aurora-navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/providers/AuthProvider";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      forcedTheme="dark"
      disableTransitionOnChange
    >
      <AuthProvider>
        <AuroraNavbar />
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
