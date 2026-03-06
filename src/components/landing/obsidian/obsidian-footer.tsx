import { BookIcon, GithubLogoIcon } from "@phosphor-icons/react";
import Link from "next/link";

export function ObsidianFooter() {
  return (
    <footer className="relative border-t border-[#1A1A18]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#C4A265] to-[#8B7035] flex items-center justify-center">
              <BookIcon className="h-3.5 w-3.5 text-[#0A0A08]" weight="fill" />
            </div>
            <span className="text-sm tracking-[0.15em] uppercase text-[#8A8478]">
              Librarium
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link
              href="https://github.com/andersbekkevard/librarium-app"
              target="_blank"
              className="text-[#8A8478]/60 hover:text-[#C4A265] transition-colors"
              aria-label="View on GitHub"
            >
              <GithubLogoIcon className="h-4 w-4" />
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-[11px] tracking-[0.1em] text-[#8A8478]/30">
            &copy; {new Date().getFullYear()} Librarium. Built for readers.
          </p>
        </div>
      </div>
    </footer>
  );
}
