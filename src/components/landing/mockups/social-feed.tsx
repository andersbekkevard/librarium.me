"use client";

const activities = [
  {
    name: "Sarah K.",
    initials: "SK",
    color: "bg-[#789D72]",
    action: "finished reading",
    book: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    progress: 100,
    time: "2h ago",
  },
  {
    name: "James O.",
    initials: "JO",
    color: "bg-[#F5C54D]",
    action: "is reading",
    book: "Project Hail Mary",
    author: "Andy Weir",
    progress: 67,
    time: "4h ago",
  },
  {
    name: "Maya C.",
    initials: "MC",
    color: "bg-[#244633]",
    action: "added to library",
    book: "Sapiens",
    author: "Yuval Noah Harari",
    progress: 0,
    time: "6h ago",
  },
  {
    name: "Liam T.",
    initials: "LT",
    color: "bg-[#789D72]",
    action: "started reading",
    book: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    progress: 8,
    time: "8h ago",
  },
];

export function SocialFeedMockup() {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="overflow-hidden rounded-2xl bg-landing-card shadow-[0_2px_40px_rgba(36,70,51,0.08)] dark:shadow-[0_2px_40px_rgba(0,0,0,0.3)]">
        {/* Header */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-sm font-semibold text-landing-text">
              Activity Feed
            </h3>
            <span className="text-xs text-landing-muted">Today</span>
          </div>
        </div>

        {/* Activity items */}
        <div className="px-5 pb-5 space-y-3">
          {activities.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-xl bg-landing-canvas/60 p-3"
            >
              <div
                className={`${item.color} flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white`}
              >
                {item.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-landing-text">
                  <span className="font-semibold">{item.name}</span>{" "}
                  <span className="text-landing-muted">{item.action}</span>
                </p>
                <p className="text-sm font-medium text-landing-text truncate">
                  {item.book}
                </p>
                <p className="text-xs text-landing-muted">{item.author}</p>
                {item.progress > 0 && (
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-landing-canvas">
                    <div
                      className={`h-full rounded-full transition-all ${
                        item.progress === 100
                          ? "bg-[#789D72]"
                          : "bg-[#244633] dark:bg-[#789D72]"
                      }`}
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                )}
              </div>
              <span className="shrink-0 text-xs text-landing-muted">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
