import { LandingNavbar } from "@/components/landing/navbar";
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
      defaultTheme="system"
      enableSystem
    >
      <AuthProvider>
        <div className="landing-grain bg-landing-canvas transition-colors duration-500">
          <LandingNavbar />
          {children}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
