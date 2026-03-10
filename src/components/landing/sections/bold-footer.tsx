import Link from "next/link";

export const BoldFooter = () => {
  return (
    <footer className="px-6 md:px-12 lg:px-20 py-12 md:py-16">
      {/* Top rule */}
      <div className="max-w-[1400px] mx-auto h-px bg-[#526D5E]/30 mb-12" />

      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Logo / brand */}
        <div>
          <span
            className="text-[#f5f0e8] text-lg tracking-tight"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Librarium
          </span>
        </div>

        {/* Links */}
        <nav
          className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#526D5E] tracking-wide"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          <Link href="#" className="hover:text-[#f5f0e8] transition-colors duration-300">
            Features
          </Link>
          <Link href="#" className="hover:text-[#f5f0e8] transition-colors duration-300">
            About
          </Link>
          <Link href="#" className="hover:text-[#f5f0e8] transition-colors duration-300">
            Privacy
          </Link>
          <Link
            href="https://github.com/andersbekkevard/librarium-app"
            target="_blank"
            className="hover:text-[#f5f0e8] transition-colors duration-300"
          >
            GitHub
          </Link>
        </nav>
      </div>

      {/* Copyright */}
      <div className="max-w-[1400px] mx-auto mt-10">
        <p
          className="text-xs text-[#526D5E]/60 tracking-wide"
          style={{ fontFamily: "var(--font-geist-sans)" }}
        >
          &copy; {new Date().getFullYear()} Librarium. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
