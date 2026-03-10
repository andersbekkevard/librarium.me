import { ChapterNavbar } from "@/components/landing/ChapterNavbar";
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
      defaultTheme="light"
      disableTransitionOnChange
    >
      <AuthProvider>
        <ChapterNavbar />
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
