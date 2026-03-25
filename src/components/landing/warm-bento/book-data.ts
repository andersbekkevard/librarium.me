export interface BookCover {
  id: string;
  title: string;
  author: string;
  color: string;
  accent: string;
  pattern?: "dots" | "lines" | "circles" | "grid" | "waves" | "diamond";
}

// Stylized book covers — rendered as CSS-only art, no images needed
export const BOOK_COVERS: BookCover[] = [
  { id: "1", title: "The Secret History", author: "Donna Tartt", color: "#2D4A3E", accent: "#C9A962", pattern: "lines" },
  { id: "2", title: "Normal People", author: "Sally Rooney", color: "#E8D5B7", accent: "#3A5F4B", pattern: "dots" },
  { id: "3", title: "Pachinko", author: "Min Jin Lee", color: "#B44444", accent: "#F5E6C8", pattern: "waves" },
  { id: "4", title: "Educated", author: "Tara Westover", color: "#4A6741", accent: "#FFFFFF", pattern: "grid" },
  { id: "5", title: "Klara and the Sun", author: "Kazuo Ishiguro", color: "#F5C54D", accent: "#244633", pattern: "circles" },
  { id: "6", title: "Tomorrow, and Tomorrow", author: "Gabrielle Zevin", color: "#6B4E71", accent: "#F0C987", pattern: "diamond" },
  { id: "7", title: "Piranesi", author: "Susanna Clarke", color: "#8FB4C9", accent: "#1A3A4A", pattern: "lines" },
  { id: "8", title: "Hamnet", author: "Maggie O'Farrell", color: "#3D2E1F", accent: "#D4A574", pattern: "dots" },
  { id: "9", title: "Circe", author: "Madeline Miller", color: "#1A4B5A", accent: "#E8B84B", pattern: "waves" },
  { id: "10", title: "Shuggie Bain", author: "Douglas Stuart", color: "#8B7355", accent: "#C5D4C0", pattern: "grid" },
  { id: "11", title: "Detransition, Baby", author: "Torrey Peters", color: "#E8B4C8", accent: "#2A4A3A", pattern: "circles" },
  { id: "12", title: "A Gentleman in Moscow", author: "Amor Towles", color: "#C4352A", accent: "#F5E6C8", pattern: "diamond" },
  { id: "13", title: "The Overstory", author: "Richard Powers", color: "#2E5A3E", accent: "#B8D4A8", pattern: "lines" },
  { id: "14", title: "Ninth House", author: "Leigh Bardugo", color: "#1A1A2E", accent: "#C0A060", pattern: "dots" },
  { id: "15", title: "The Vanishing Half", author: "Brit Bennett", color: "#D4956A", accent: "#2A3A2A", pattern: "waves" },
  { id: "16", title: "Sea of Tranquility", author: "Emily St. John Mandel", color: "#3A5070", accent: "#E0D4C0", pattern: "grid" },
];

export const TESTIMONIALS = [
  {
    name: "Sara K.",
    handle: "@sarakbooks",
    avatar: "SK",
    text: "Librarium turned my solo reading habit into something genuinely social. Seeing my friends\u2019 reading activity every morning is like a little dose of inspiration with my coffee.",
    booksRead: 47,
  },
  {
    name: "Marcus T.",
    handle: "@marcusreads",
    avatar: "MT",
    text: "I\u2019ve tried Goodreads, StoryGraph, even spreadsheets. Librarium is the first app that makes tracking feel effortless. The barcode scanner alone saved me hours.",
    booksRead: 82,
  },
  {
    name: "Priya N.",
    handle: "@priyanarratives",
    avatar: "PN",
    text: "The reading challenges brought our book club closer together. We went from meeting monthly to actually talking about books every single day. That\u2019s the magic.",
    booksRead: 34,
  },
];

export const SOCIAL_ACTIVITY = [
  { user: "Emma", avatar: "EM", book: "The Secret History", action: "started reading" },
  { user: "Alex", avatar: "AL", book: "Pachinko", action: "finished" },
  { user: "Jordan", avatar: "JO", book: "Klara and the Sun", action: "is on page 142 of" },
  { user: "Mia", avatar: "MI", book: "Circe", action: "rated 5 stars" },
  { user: "Noah", avatar: "NO", book: "Piranesi", action: "started reading" },
  { user: "Chloe", avatar: "CH", book: "Normal People", action: "added to shelf" },
];
