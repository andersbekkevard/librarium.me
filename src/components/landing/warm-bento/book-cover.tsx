"use client";

import type { BookCover } from "./book-data";

function PatternSVG({ pattern, accent }: { pattern: string; accent: string }) {
  switch (pattern) {
    case "dots":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <pattern id={`dots-${accent}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="1.5" fill={accent} />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#dots-${accent})`} />
        </svg>
      );
    case "lines":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <pattern id={`lines-${accent}`} x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="12" stroke={accent} strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#lines-${accent})`} />
        </svg>
      );
    case "circles":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-12" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="35%" r="30%" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.3" />
          <circle cx="50%" cy="35%" r="20%" fill="none" stroke={accent} strokeWidth="0.5" opacity="0.2" />
        </svg>
      );
    case "grid":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <pattern id={`grid-${accent}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect width="20" height="20" fill="none" stroke={accent} strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#grid-${accent})`} />
        </svg>
      );
    case "waves":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,60 Q30,40 60,60 T120,60" fill="none" stroke={accent} strokeWidth="1" opacity="0.4" />
          <path d="M0,80 Q30,60 60,80 T120,80" fill="none" stroke={accent} strokeWidth="1" opacity="0.3" />
          <path d="M0,100 Q30,80 60,100 T120,100" fill="none" stroke={accent} strokeWidth="1" opacity="0.2" />
        </svg>
      );
    case "diamond":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-12" xmlns="http://www.w3.org/2000/svg">
          <pattern id={`diamond-${accent}`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <polygon points="12,2 22,12 12,22 2,12" fill="none" stroke={accent} strokeWidth="0.6" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#diamond-${accent})`} />
        </svg>
      );
    default:
      return null;
  }
}

export function StylizedBookCover({
  book,
  size = "md",
  className = "",
}: {
  book: BookCover;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-[72px] h-[108px]",
    md: "w-[100px] h-[150px]",
    lg: "w-[130px] h-[195px]",
  };

  const titleSize = {
    sm: "text-[9px] leading-tight",
    md: "text-[11px] leading-tight",
    lg: "text-[13px] leading-tight",
  };

  const authorSize = {
    sm: "text-[7px]",
    md: "text-[8px]",
    lg: "text-[10px]",
  };

  return (
    <div
      className={`${sizeClasses[size]} relative rounded-sm overflow-hidden shadow-md book-tilt flex-shrink-0 ${className}`}
      style={{ backgroundColor: book.color }}
    >
      {book.pattern && <PatternSVG pattern={book.pattern} accent={book.accent} />}

      {/* Spine shadow */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[6%]"
        style={{
          background: `linear-gradient(to right, rgba(0,0,0,0.15), transparent)`,
        }}
      />

      {/* Title block */}
      <div className="absolute inset-0 flex flex-col justify-end p-2.5 pb-3">
        <p
          className={`${titleSize[size]} font-bold leading-snug`}
          style={{ color: book.accent }}
        >
          {book.title}
        </p>
        <p
          className={`${authorSize[size]} mt-0.5 opacity-70`}
          style={{ color: book.accent }}
        >
          {book.author}
        </p>
      </div>
    </div>
  );
}
