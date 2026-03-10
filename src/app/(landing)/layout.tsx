import { AuthProvider } from "@/lib/providers/AuthProvider";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="bg-[#0f1f15] min-h-screen">
        {/* Minimal top bar */}
        <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 py-5 flex items-center justify-between bg-[#0f1f15]/90 backdrop-blur-sm">
          <span
            className="text-[#f5f0e8] text-lg tracking-tight"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Librarium
          </span>
          <nav
            className="hidden md:flex items-center gap-8 text-sm text-[#526D5E] tracking-wide"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            <a href="#features" className="hover:text-[#f5f0e8] transition-colors duration-300">
              Features
            </a>
            <a href="#about" className="hover:text-[#f5f0e8] transition-colors duration-300">
              About
            </a>
          </nav>
        </header>
        {children}
      </div>
    </AuthProvider>
  );
}
