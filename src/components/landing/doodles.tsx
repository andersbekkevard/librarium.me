import React from "react";

interface DoodleProps {
  className?: string;
  color?: string;
}

export const BookDoodle = ({ className = "", color = "currentColor" }: DoodleProps) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M14 8c-1 0-2 1-2 2v44c0 1 1 2 2 2h36c1 0 2-1 2-2V10c0-1-1-2-2-2H14z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M22 8v48"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M30 20h14M30 28h10M30 36h12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const BookmarkDoodle = ({ className = "", color = "currentColor" }: DoodleProps) => (
  <svg
    viewBox="0 0 40 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4 4c0-1 1-2 2-2h28c1 0 2 1 2 2v48l-16-10-16 10V4z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M12 16h16M12 24h10"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const CoffeeDoodle = ({ className = "", color = "currentColor" }: DoodleProps) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M8 24h36v20c0 6-5 12-12 12H20c-7 0-12-6-12-12V24z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path
      d="M44 28c4 0 8 3 8 8s-4 8-8 8"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M18 8c0-4 2-6 2-6M26 10c0-4 2-6 2-6M34 8c0-4 2-6 2-6"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

export const StarDoodle = ({ className = "", color = "currentColor" }: DoodleProps) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M24 4l6 12 14 2-10 10 2 14-12-6-12 6 2-14L4 18l14-2 6-12z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const HeartDoodle = ({ className = "", color = "currentColor" }: DoodleProps) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M24 42S4 28 4 16c0-6 5-12 12-12 4 0 6 2 8 4 2-2 4-4 8-4 7 0 12 6 12 12 0 12-20 26-20 26z"
      stroke={color}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const SparklesDoodle = ({ className = "", color = "currentColor" }: DoodleProps) => (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16 2v6M16 24v6M2 16h6M24 16h6M6 6l4 4M22 22l4 4M26 6l-4 4M10 22l-4 4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const BookStackDoodle = ({ className = "", color = "currentColor" }: DoodleProps) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* Bottom book */}
    <rect
      x="10" y="52" width="60" height="12" rx="3"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
    />
    {/* Middle book */}
    <rect
      x="14" y="38" width="52" height="12" rx="3"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
      transform="rotate(-3 40 44)"
    />
    {/* Top book */}
    <rect
      x="16" y="24" width="48" height="12" rx="3"
      stroke={color}
      strokeWidth="2.5"
      fill="none"
      transform="rotate(2 40 30)"
    />
    {/* Spines */}
    <line x1="22" y1="52" x2="22" y2="64" stroke={color} strokeWidth="1.5" />
    <line x1="26" y1="38" x2="24" y2="50" stroke={color} strokeWidth="1.5" />
    <line x1="28" y1="24" x2="29" y2="36" stroke={color} strokeWidth="1.5" />
  </svg>
);

export const ReadingGlassesDoodle = ({ className = "", color = "currentColor" }: DoodleProps) => (
  <svg
    viewBox="0 0 64 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="18" cy="18" r="10" stroke={color} strokeWidth="2.5" fill="none" />
    <circle cx="46" cy="18" r="10" stroke={color} strokeWidth="2.5" fill="none" />
    <path d="M28 18c2-3 6-3 8 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M8 14c-3-2-5-4-5-4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M56 14c3-2 5-4 5-4" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </svg>
);
