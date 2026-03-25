"use client";

export function Footer() {
  return (
    <footer className="py-10 border-t border-border">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-forest dark:bg-sage flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-cream dark:text-background">
              <path d="M4 4.5C4 3.67 4.67 3 5.5 3H9.5C10.33 3 11 3.67 11 4.5V19.5C11 20.33 10.33 21 9.5 21H5.5C4.67 21 4 20.33 4 19.5V4.5Z" fill="currentColor" opacity="0.9" />
              <path d="M13 4.5C13 3.67 13.67 3 14.5 3H18.5C19.33 3 20 3.67 20 4.5V19.5C20 20.33 19.33 21 18.5 21H14.5C13.67 21 13 20.33 13 19.5V4.5Z" fill="currentColor" opacity="0.6" />
            </svg>
          </div>
          <span className="font-heading text-sm font-bold text-foreground">Librarium</span>
        </div>

        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
        </div>

        <p className="text-xs text-muted-foreground">
          &copy; 2026 Librarium. Made for readers, by readers.
        </p>
      </div>
    </footer>
  );
}
