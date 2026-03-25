"use client";

const challenges = [
  {
    title: "Spring Reading Sprint",
    desc: "Read 5 books this month",
    progress: 3,
    total: 5,
    participants: 2847,
    color: "bg-[#789D72]",
  },
  {
    title: "Genre Explorer",
    desc: "Read from 4 different genres",
    progress: 2,
    total: 4,
    participants: 1203,
    color: "bg-[#F5C54D]",
  },
];

const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

// Streak data: 0 = no reading, 1 = light, 2 = moderate, 3 = heavy
const streakWeeks = [
  [1, 2, 3, 2, 1, 0, 0],
  [0, 3, 3, 2, 3, 1, 0],
  [2, 3, 2, 3, 3, 2, 1],
  [3, 3, 2, 3, 2, 0, 0],
];

function streakColor(level: number) {
  if (level === 0) return "bg-landing-canvas";
  if (level === 1) return "bg-[#789D72]/30";
  if (level === 2) return "bg-[#789D72]/60";
  return "bg-[#789D72]";
}

export function ChallengesMockup() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="overflow-hidden rounded-2xl bg-landing-card shadow-[0_2px_40px_rgba(36,70,51,0.08)] dark:shadow-[0_2px_40px_rgba(0,0,0,0.3)]">
        {/* Streak header */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold text-landing-text">
              Reading Streak
            </h3>
            <div className="flex items-center gap-1.5">
              <span className="text-lg">🔥</span>
              <span className="font-display text-sm font-bold text-landing-amber">
                18 days
              </span>
            </div>
          </div>

          {/* Streak grid */}
          <div className="mt-3 space-y-1">
            <div className="flex gap-1 mb-1">
              {weekDays.map((d, i) => (
                <div
                  key={i}
                  className="flex-1 text-center text-[8px] text-landing-muted"
                >
                  {d}
                </div>
              ))}
            </div>
            {streakWeeks.map((week, wi) => (
              <div key={wi} className="flex gap-1">
                {week.map((level, di) => (
                  <div
                    key={di}
                    className={`flex-1 aspect-square rounded-[3px] ${streakColor(level)} transition-colors`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Active challenges */}
        <div className="px-5 pb-5 space-y-3">
          <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-landing-muted">
            Active Challenges
          </h4>

          {challenges.map((c, i) => (
            <div
              key={i}
              className="rounded-xl bg-landing-canvas/60 p-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-landing-text">
                    {c.title}
                  </p>
                  <p className="text-xs text-landing-muted">{c.desc}</p>
                </div>
                <span className="text-xs text-landing-muted">
                  {c.participants.toLocaleString()} joined
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-landing-canvas">
                  <div
                    className={`h-full rounded-full ${c.color} transition-all`}
                    style={{
                      width: `${(c.progress / c.total) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-landing-text">
                  {c.progress}/{c.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
