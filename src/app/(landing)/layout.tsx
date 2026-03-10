import { Navbar } from "@/components/landing/navbar";
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
      disableTransitionOnChange
    >
      <AuthProvider>
        <div className="landing-page">
          <Navbar />
          {children}
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
