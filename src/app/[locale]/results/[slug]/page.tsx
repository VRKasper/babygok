"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Navbar } from "@/components/landing/Navbar";

// Demo data — in production loaded from DB
const demoResults = {
  babyName: "Baby Van Rossum",
  totalGuesses: 24,
  gender: [
    { name: "Jongen", value: 14, color: "#A8D4E6" },
    { name: "Meisje", value: 10, color: "#F2C4CE" },
  ],
  weight: [
    { range: "2500-3000", count: 3 },
    { range: "3000-3250", count: 5 },
    { range: "3250-3500", count: 8 },
    { range: "3500-3750", count: 5 },
    { range: "3750-4000", count: 2 },
    { range: "4000+", count: 1 },
  ],
  eyeColor: [
    { name: "Blauw", value: 9, color: "#A8D4E6" },
    { name: "Bruin", value: 8, color: "#C4956A" },
    { name: "Groen", value: 4, color: "#A8C5A0" },
    { name: "Hazelnoot", value: 2, color: "#C5B3D9" },
    { name: "Grijs", value: 1, color: "#B0B0B0" },
  ],
  hairColor: [
    { name: "Blond", value: 11, color: "#E8D5A0" },
    { name: "Bruin", value: 8, color: "#8B6F47" },
    { name: "Zwart", value: 3, color: "#2D2D2D" },
    { name: "Rood", value: 2, color: "#C45A3C" },
  ],
  topNames: [
    { name: "Emma", count: 4 },
    { name: "Liam", count: 3 },
    { name: "Sophie", count: 3 },
    { name: "Noah", count: 2 },
    { name: "Mila", count: 2 },
  ],
};

function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string | number;
  icon: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl border border-charcoal/5 ${color} p-6 shadow-sm`}
    >
      <div className="mb-2 text-3xl">{icon}</div>
      <p className="text-sm font-medium text-charcoal-light/60">{label}</p>
      <p className="mt-1 font-display text-2xl font-bold text-charcoal">
        {value}
      </p>
    </motion.div>
  );
}

function ChartCard({
  title,
  children,
  delay = 0,
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-2xl border border-charcoal/5 bg-warm-white p-6 shadow-sm"
    >
      <h3 className="mb-6 font-display text-xl font-semibold text-charcoal">
        {title}
      </h3>
      {children}
    </motion.div>
  );
}

export default function ResultsPage() {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-warm-white to-warm-white">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-lavender/20 text-3xl">
            📊
          </div>
          <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
            {t("results.title")} — {demoResults.babyName}
          </h1>
        </motion.div>

        {/* Stats row */}
        <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            label={t("results.totalGuesses")}
            value={demoResults.totalGuesses}
            icon="👥"
            color="bg-warm-white"
          />
          <StatCard
            label={t("results.popularChoice")}
            value="Jongen"
            icon="👶"
            color="bg-sky/10"
          />
          <StatCard
            label={t("results.averageWeight")}
            value="3.350g"
            icon="⚖️"
            color="bg-sage/10"
          />
          <StatCard
            label={t("results.averageLength")}
            value="51cm"
            icon="📏"
            color="bg-peach/10"
          />
        </div>

        {/* Charts grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Gender pie chart */}
          <ChartCard title={t("questions.gender")} delay={0.1}>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={demoResults.gender}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {demoResults.gender.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid rgba(0,0,0,0.05)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex justify-center gap-6">
              {demoResults.gender.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-charcoal-light">
                    {entry.name} ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Eye color pie chart */}
          <ChartCard title={t("questions.eyeColor")} delay={0.2}>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={demoResults.eyeColor}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {demoResults.eyeColor.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid rgba(0,0,0,0.05)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              {demoResults.eyeColor.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-charcoal-light">
                    {entry.name} ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Weight bar chart */}
          <ChartCard title={t("questions.weight")} delay={0.3}>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={demoResults.weight}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                <XAxis
                  dataKey="range"
                  tick={{ fontSize: 11, fill: "#4A4A4A" }}
                  tickLine={false}
                  axisLine={{ stroke: "rgba(0,0,0,0.1)" }}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#4A4A4A" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid rgba(0,0,0,0.05)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#A8C5A0"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Hair color pie chart */}
          <ChartCard title={t("questions.hairColor")} delay={0.4}>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={demoResults.hairColor}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {demoResults.hairColor.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid rgba(0,0,0,0.05)",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-2 flex flex-wrap justify-center gap-4">
              {demoResults.hairColor.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-sm text-charcoal-light">
                    {entry.name} ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          </ChartCard>

          {/* Top name suggestions */}
          <ChartCard title={t("questions.name")} delay={0.5}>
            <div className="space-y-3">
              {demoResults.topNames.map((entry, i) => (
                <div key={entry.name} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lavender/20 text-xs font-bold text-lavender-dark">
                    {i + 1}
                  </span>
                  <span className="flex-1 font-medium text-charcoal">
                    {entry.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="h-2 rounded-full bg-lavender/40" style={{ width: `${(entry.count / demoResults.topNames[0].count) * 80}px` }} />
                    <span className="text-sm text-charcoal-light/60 font-variant-numeric:tabular-nums">
                      {entry.count}x
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
