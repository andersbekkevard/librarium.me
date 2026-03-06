"use client";

import Link from "next/link";

export const AuroraFooterSection = () => {
  return (
    <footer
      className="relative py-16 md:py-20 border-t border-[#1a3d28]/20"
      style={{ background: "#060c08" }}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="group flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#c4841d]/80 to-[#e8c066]/80 flex items-center justify-center">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#080f0b"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
              </div>
              <span
                className="text-base text-[#f5efe0]/60 tracking-[0.02em]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Librarium
              </span>
            </Link>
            <p className="text-[#f5efe0]/20 text-xs tracking-[0.05em] max-w-xs">
              A personal library for thoughtful readers.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-10 md:gap-14">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#c4841d]/30 mb-1">
                Product
              </span>
              <Link
                href="#experience"
                className="text-sm text-[#f5efe0]/25 hover:text-[#e8c066]/60 transition-colors duration-500"
              >
                Features
              </Link>
              <Link
                href="#philosophy"
                className="text-sm text-[#f5efe0]/25 hover:text-[#e8c066]/60 transition-colors duration-500"
              >
                Philosophy
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#c4841d]/30 mb-1">
                Community
              </span>
              <Link
                href="https://github.com/andersbekkevard/librarium-app"
                target="_blank"
                className="text-sm text-[#f5efe0]/25 hover:text-[#e8c066]/60 transition-colors duration-500"
              >
                GitHub
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-[#1a3d28]/15 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[11px] text-[#f5efe0]/15 tracking-[0.05em]">
            &copy; {new Date().getFullYear()} Librarium. Built with care.
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c4841d]/30" />
            <span className="text-[10px] text-[#f5efe0]/15 tracking-[0.1em] uppercase">
              Aurora Edition
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
