"use client";

import { BookOpenIcon, BooksIcon, FlameIcon, SparkleIcon, TrendUpIcon, type Icon } from "@phosphor-icons/react";
import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardHeader, EmptyState, PageHeader } from "@/components/ui";
import { dailyPace, genreColors, genreDistribution, pagesByMonth } from "@/lib/insights";
import { useLibrary, useStats } from "@/lib/store";

const stagger = (i: number) => ({ "--i": i }) as React.CSSProperties;
const tooltipBox = "rounded-xl border border-border bg-popover p-3 text-sm shadow-xl";

export default function StatisticsPage() {
  const { books, events, ready } = useLibrary();
  const stats = useStats();
  const months = useMemo(() => pagesByMonth(events, books), [events, books]);
  const genres = useMemo(() => genreDistribution(books), [books]);
  const colors = useMemo(() => genreColors([...new Set([...months.genres, ...genres.map((g) => g.name)])]), [months.genres, genres]);
  const pace = useMemo(() => dailyPace(events), [events]);

  if (!ready)
    return (
      <div className="space-y-6">
        <div className="skeleton h-10 w-64" />
        <div className="skeleton h-28" />
        <div className="skeleton h-80" />
      </div>
    );

  const metrics: [Icon, string, number | string, string, string][] = [
    [BookOpenIcon, "Books finished", stats.totalBooksRead, `${stats.booksReadThisYear} this year`, "text-brand-primary bg-brand-primary/10"],
    [TrendUpIcon, "This month", (months.data.at(-1)?.total ?? 0).toLocaleString(), "pages read", "text-brand-accent bg-brand-accent/15"],
    [FlameIcon, "Reading streak", stats.readingStreak, "consecutive days", "text-status-warning bg-status-warning/15"],
    [SparkleIcon, "Daily pace", pace, "pages per day", "text-status-info bg-status-info/12"],
  ];
  const summary: [string, string | number, string?][] = [
    ["Currently reading", stats.currentlyReading],
    ["In library", stats.booksInLibrary],
    ["This month", stats.booksReadThisMonth, "books"],
    ["Avg rating", stats.averageRating ? stats.averageRating.toFixed(1) : "—", "of 5"],
  ];

  return (
    <>
      <PageHeader title="Reading Analytics" subtitle="Your reading habits, patterns, and achievements over time." />
      <Card className="mb-6 grid grid-cols-2 gap-6 p-6 animate-rise lg:grid-cols-4" style={stagger(1)}>
        {metrics.map(([I, label, value, note, tone], i) => (
          <div key={label} className="flex items-start gap-4 lg:border-l lg:border-border lg:pl-6 lg:first:border-0 lg:first:pl-0" style={stagger(i)}>
            <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${tone}`}><I className="size-5" weight="duotone" /></span>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="font-serif text-3xl tabular-nums lg:text-4xl">{value}</p>
              <p className="text-sm text-muted-foreground">{note}</p>
            </div>
          </div>
        ))}
      </Card>

      <Card className="mb-6 animate-rise" style={stagger(2)}>
        <CardHeader title={<span>Reading activity <span className="ml-1 font-sans text-sm text-muted-foreground">pages read over the past 12 months</span></span>} />
        {months.data.length ? (
          <div className="px-3 pb-5 sm:px-5">
            <div className="h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={months.data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    {months.genres.map((g, i) => (
                      <linearGradient key={g} id={`fill-${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={colors[g]} stopOpacity={0.45} />
                        <stop offset="100%" stopColor={colors[g]} stopOpacity={0.04} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} tickLine={false} axisLine={false} width={40} />
                  <Tooltip
                    cursor={{ stroke: "var(--border)" }}
                    content={({ active, payload }) => {
                      const point = payload?.[0]?.payload;
                      if (!active || !point) return null;
                      return (
                        <div className={tooltipBox}>
                          <p className="font-serif text-base">{point.fullMonth}</p>
                          <p className="mb-2 text-muted-foreground">{point.total.toLocaleString()} pages total</p>
                          {payload.filter((p) => Number(p.value) > 0).sort((a, b) => Number(b.value) - Number(a.value)).slice(0, 5).map((p) => (
                            <p key={String(p.dataKey)} className="flex items-center justify-between gap-6">
                              <span className="flex items-center gap-2"><span className="size-2.5 rounded-full" style={{ background: p.color }} />{String(p.dataKey)}</span>
                              <span className="tabular-nums">{Number(p.value).toLocaleString()}</span>
                            </p>
                          ))}
                        </div>
                      );
                    }}
                  />
                  {months.genres.map((g, i) => (
                    <Area key={g} type="monotone" dataKey={g} stackId="genres" stroke={colors[g]} strokeWidth={1.5} fill={`url(#fill-${i})`} animationDuration={900} />
                  ))}
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <Legend items={months.genres.map((g) => [g, colors[g]])} />
          </div>
        ) : (
          <EmptyState icon={TrendUpIcon} title="Start your journey">Begin reading and tracking your progress to see your activity visualized here.</EmptyState>
        )}
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="animate-rise" style={stagger(3)}>
          <CardHeader icon={BooksIcon} title="Library composition" />
          {genres.length ? (
            <div className="flex flex-col items-center gap-6 px-5 pb-5 sm:flex-row">
              <div className="size-44 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={genres} dataKey="value" innerRadius={48} outerRadius={72} paddingAngle={2} strokeWidth={0} animationDuration={900}>
                      {genres.map((g) => <Cell key={g.name} fill={colors[g.name]} />)}
                    </Pie>
                    <Tooltip content={({ active, payload }) => active && payload?.[0] ? <div className={tooltipBox}><p className="font-medium">{payload[0].payload.name}</p><p className="text-muted-foreground">{payload[0].payload.value} books · {payload[0].payload.percentage}%</p></div> : null} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="w-full space-y-2">
                {genres.slice(0, 6).map((g) => (
                  <li key={g.name} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-3"><span className="size-3 rounded-full" style={{ background: colors[g.name] }} />{g.name}</span>
                    <span className="flex gap-3 tabular-nums"><span className="font-medium">{g.value}</span><span className="w-10 text-right text-xs text-muted-foreground">{g.percentage}%</span></span>
                  </li>
                ))}
                {genres.length > 6 && <li className="border-t border-border pt-2 text-xs text-muted-foreground">+{genres.length - 6} more genres</li>}
              </ul>
            </div>
          ) : (
            <EmptyState icon={BookOpenIcon} title="No books yet">Add books to see your genre distribution.</EmptyState>
          )}
        </Card>

        <Card className="animate-rise" style={stagger(4)}>
          <CardHeader title="Reading summary" />
          <div className="space-y-4 px-5 pb-5">
            <div className="border-b border-border pb-4">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Lifetime pages</p>
              <p className="font-serif text-3xl tabular-nums">{stats.totalPagesRead.toLocaleString()}</p>
            </div>
            <dl className="grid grid-cols-2 gap-4">
              {summary.map(([label, value, unit]) => (
                <div key={label}>
                  <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</dt>
                  <dd className="font-serif text-xl tabular-nums">{value} {unit && <span className="font-sans text-xs text-muted-foreground">{unit}</span>}</dd>
                </div>
              ))}
            </dl>
            {stats.favoriteGenres[0] && (
              <div className="border-t border-border pt-4">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Top genre</p>
                <p className="font-medium text-brand-primary">{stats.favoriteGenres[0]}</p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </>
  );
}

function Legend({ items }: { items: [string, string][] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-4 border-t border-border pt-4">
      {items.slice(0, 6).map(([name, color]) => (
        <span key={name} className="flex items-center gap-2 text-xs text-muted-foreground"><span className="size-2.5 rounded-full" style={{ background: color }} />{name}</span>
      ))}
      {items.length > 6 && <span className="text-xs text-muted-foreground">+{items.length - 6} more</span>}
    </div>
  );
}
