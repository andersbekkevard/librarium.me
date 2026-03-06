import { ObsidianNav } from "@/components/landing/obsidian/obsidian-nav";
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
        <ObsidianNav />
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
