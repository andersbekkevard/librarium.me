import { EditorialNavbar } from "@/components/landing/editorial/editorial-navbar";
import { ThemeProvider } from "@/components/theme-provider";

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
      <EditorialNavbar />
      {children}
    </ThemeProvider>
  );
}
