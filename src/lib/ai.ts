import { isSameDay } from "date-fns";
import { getAI, getGenerativeModel, GoogleAIBackend, type GenerativeModel } from "firebase/ai";
import { progressPercent } from "./domain";
import { app } from "./firebase";
import type { Activity, Book, UserProfile } from "./types";

export interface MessageInput {
  profile: UserProfile;
  books: Book[];
  activity: Activity[];
  stats: { totalBooks: number; finishedBooks: number; currentlyReading: number; readingStreak: number; totalPagesRead: number };
}

let model: GenerativeModel | undefined;

export async function generateMessage(prompt: string): Promise<string> {
  model ??= getGenerativeModel(getAI(app, { backend: new GoogleAIBackend() }), { model: "gemini-2.5-flash-lite" });
  return (await model.generateContent(prompt)).response.text().trim();
}

const list = (lines: string[], empty: string) => (lines.length ? lines.join("\n") : empty);

export function buildPrompt({ profile, books, stats, activity }: MessageInput, now = new Date()): string {
  const name = profile.displayName;
  if (isSameDay(profile.createdAt.toDate(), now)) {
    return `You are Librarium's AI reading companion. Librarium is an app for tracking your books and reading progress.

Generate a warm and encouraging first-time welcome message for ${name}, who is new to Librarium and hasn't added any books yet. Focus on:
1. Welcoming them to Librarium in a friendly, inviting tone
2. Encouraging them to add their first book
3. Librarium's brand tone: warm, thoughtful, patient

The message should be 50-80 words, in the second person ("your reading journey"), conversational and free of jargon.`;
  }
  const reading = books.filter((b) => b.state === "in_progress").map((b) => `- "${b.title}" by ${b.author} (${progressPercent(b)}% complete)`);
  const finished = books
    .filter((b) => b.state === "finished")
    .sort((a, b) => (b.finishedAt?.toMillis() || 0) - (a.finishedAt?.toMillis() || 0))
    .slice(0, 3)
    .map((b) => `- "${b.title}" by ${b.author}${b.rating ? ` (rated ${b.rating}/5 stars)` : ""}`);
  const genres = [...new Set(books.map((b) => b.genre).filter(Boolean))].slice(0, 5);
  return `You are Librarium's AI reading companion. Generate a personalized, encouraging message for ${name} based on their reading data.

Reading statistics:
- Total books in library: ${stats.totalBooks}
- Books finished: ${stats.finishedBooks}
- Currently reading: ${stats.currentlyReading}
- Reading streak: ${stats.readingStreak} days
- Total pages read: ${stats.totalPagesRead}

Currently reading:
${list(reading, "No books currently being read")}

Recently finished:
${list(finished, "No books finished recently")}

Favorite genres: ${genres.join(", ") || "Not yet determined"}
Recent activity: ${activity.slice(0, 3).map((a) => a.type).join(", ") || "No recent activity"}

Write a warm, encouraging message (50-80 words) that acknowledges their progress or achievements, gently motivates them to keep reading, references specific aspects of their reading habits when relevant, and feels personal. Keep it conversational and inspiring; avoid generic advice.`;
}

const CANNED = [
  "Keep up the great reading! Every page brings new discoveries.",
  "Your reading journey is inspiring. What story will you dive into next?",
  "Books are the gateway to endless worlds. Happy reading!",
  "Each book you read adds to your incredible literary adventure.",
  "Reading is not just a hobby, it's a superpower. Keep going!",
];

const plural = (n: number) => (n > 1 ? "s" : "");

export function fallbackMessage(stats: MessageInput["stats"]): string {
  if (stats.readingStreak > 7)
    return `Amazing ${stats.readingStreak}-day reading streak! Your dedication to reading is truly inspiring. Keep up this fantastic momentum!`;
  if (stats.currentlyReading > 0)
    return `You're currently reading ${stats.currentlyReading} book${plural(stats.currentlyReading)}! That's wonderful progress. Every page brings new discoveries.`;
  if (stats.finishedBooks > 0)
    return `Congratulations on finishing ${stats.finishedBooks} book${plural(stats.finishedBooks)}! Your reading journey is building something beautiful.`;
  return CANNED[Math.floor(Math.random() * CANNED.length)];
}
