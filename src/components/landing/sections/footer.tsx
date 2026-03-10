import Link from "next/link";

export function FooterSection() {
  return (
    <footer className="w-full bg-[#1a2e1f]">
      <div className="mx-auto max-w-[900px] px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-8">
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-medium text-white/90 mb-1">
              Product
            </p>
            <Link href="#" className="text-[13px] text-white/50 hover:text-white/80">
              Features
            </Link>
            <Link href="#" className="text-[13px] text-white/50 hover:text-white/80">
              Pricing
            </Link>
            <Link href="#" className="text-[13px] text-white/50 hover:text-white/80">
              Changelog
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-medium text-white/90 mb-1">
              Community
            </p>
            <Link href="#" className="text-[13px] text-white/50 hover:text-white/80">
              Book Clubs
            </Link>
            <Link href="#" className="text-[13px] text-white/50 hover:text-white/80">
              Discussions
            </Link>
            <Link href="#" className="text-[13px] text-white/50 hover:text-white/80">
              Reading Groups
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-medium text-white/90 mb-1">
              Resources
            </p>
            <Link href="#" className="text-[13px] text-white/50 hover:text-white/80">
              Help Center
            </Link>
            <Link href="#" className="text-[13px] text-white/50 hover:text-white/80">
              Privacy
            </Link>
            <Link href="#" className="text-[13px] text-white/50 hover:text-white/80">
              Terms
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-[13px] font-medium text-white/90 mb-1">
              Connect
            </p>
            <Link
              href="https://github.com/andersbekkevard/librarium-app"
              target="_blank"
              className="text-[13px] text-white/50 hover:text-white/80"
            >
              GitHub
            </Link>
            <Link href="#" className="text-[13px] text-white/50 hover:text-white/80">
              Twitter
            </Link>
            <Link href="#" className="text-[13px] text-white/50 hover:text-white/80">
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-[12px] text-white/30">© 2025 Librarium</p>
          <p className="text-[12px] text-white/30">
            Built by Anders Bekkevard
          </p>
        </div>
      </div>
    </footer>
  );
}
