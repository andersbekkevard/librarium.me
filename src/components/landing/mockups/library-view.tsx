"use client";

const books = [
  { title: "Dune", author: "Frank Herbert", color: "bg-[#244633]", pages: "412 pages" },
  { title: "1984", author: "George Orwell", color: "bg-[#789D72]", pages: "328 pages" },
  { title: "Circe", author: "Madeline Miller", color: "bg-[#F5C54D]", pages: "400 pages" },
  { title: "Klara and the Sun", author: "Kazuo Ishiguro", color: "bg-[#9CA89A]", pages: "303 pages" },
  { title: "The Overstory", author: "Richard Powers", color: "bg-[#244633]", pages: "502 pages" },
  { title: "Pachinko", author: "Min Jin Lee", color: "bg-[#789D72]", pages: "490 pages" },
  { title: "Piranesi", author: "Susanna Clarke", color: "bg-[#F5C54D]", pages: "272 pages" },
  { title: "Hamnet", author: "Maggie O'Farrell", color: "bg-[#9CA89A]", pages: "320 pages" },
];

export function LibraryViewMockup() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="overflow-hidden rounded-2xl bg-landing-card shadow-[0_2px_40px_rgba(36,70,51,0.08)] dark:shadow-[0_2px_40px_rgba(0,0,0,0.3)]">
        {/* Header */}
        <div className="px-5 pt-5 pb-1">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold text-landing-text">
              My Library
            </h3>
            <span className="rounded-full bg-landing-amber/20 px-2.5 py-0.5 text-xs font-semibold text-landing-amber">
              24 books
            </span>
          </div>

          {/* Search bar */}
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-landing-canvas/80 px-3 py-2">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-landing-muted"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <span className="text-xs text-landing-muted">Search your books...</span>
          </div>

          {/* Shelf tabs */}
          <div className="mt-3 flex gap-2">
            {["All", "Reading", "Finished", "Want to Read"].map((tab, i) => (
              <span
                key={tab}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  i === 0
                    ? "bg-[#244633] text-white dark:bg-[#789D72]"
                    : "text-landing-muted hover:text-landing-text"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>

        {/* Book grid */}
        <div className="grid grid-cols-4 gap-2 p-5">
          {books.map((book, i) => (
            <div key={i} className="space-y-1">
              <div
                className={`${book.color} flex aspect-[2/3] items-end rounded-lg p-2`}
              >
                <span className="text-[9px] font-semibold leading-tight text-white/90">
                  {book.title}
                </span>
              </div>
              <p className="truncate text-[9px] font-medium text-landing-text">
                {book.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
