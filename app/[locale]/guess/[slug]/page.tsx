"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/landing/Navbar";
import {
  questionConfigs,
  type QuestionType,
  type QuestionConfig,
} from "@/lib/questions";

// Demo data — in production this comes from DB lookup by slug
const demoBaby = {
  name: "Baby Van Rossum",
  dueDate: "2026-06-15",
  questions: [
    "gender",
    "weight",
    "length",
    "eyeColor",
    "hairColor",
    "birthDate",
    "name",
  ] as QuestionType[],
};

function QuestionInput({
  config,
  value,
  onChange,
}: {
  config: QuestionConfig;
  value: string;
  onChange: (val: string) => void;
}) {
  const t = useTranslations("guess.options");

  switch (config.inputType) {
    case "select":
      return (
        <div className="flex flex-wrap gap-2">
          {config.options?.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                value === opt
                  ? "bg-sage text-charcoal shadow-md shadow-sage/20 scale-105"
                  : "bg-cream text-charcoal-light hover:bg-cream-dark"
              }`}
            >
              {t(opt)}
            </button>
          ))}
        </div>
      );
    case "number":
      return (
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            min={config.min}
            max={config.max}
            step={config.step}
            className="w-32 rounded-lg border border-charcoal/10 bg-cream px-4 py-2.5 text-charcoal font-variant-numeric:tabular-nums focus:border-sage focus:ring-2 focus:ring-sage/20"
            autoComplete="off"
          />
          <span className="text-sm text-charcoal-light/60">{config.unit}</span>
        </div>
      );
    case "date":
      return (
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full max-w-xs rounded-lg border border-charcoal/10 bg-cream px-4 py-2.5 text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/20"
        />
      );
    case "time":
      return (
        <input
          type="time"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full max-w-xs rounded-lg border border-charcoal/10 bg-cream px-4 py-2.5 text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/20"
        />
      );
    case "text":
      return (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full max-w-sm rounded-lg border border-charcoal/10 bg-cream px-4 py-2.5 text-charcoal placeholder:text-charcoal/30 focus:border-sage focus:ring-2 focus:ring-sage/20"
          autoComplete="off"
        />
      );
  }
}

const questionIcons: Record<QuestionType, string> = {
  gender: "👶",
  weight: "⚖️",
  length: "📏",
  eyeColor: "👁️",
  hairColor: "💇",
  birthDate: "📅",
  birthTime: "🕐",
  name: "✏️",
  looksLike: "👨‍👩‍👧",
};

export default function GuessPage() {
  const t = useTranslations();
  const [submitted, setSubmitted] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const activeQuestions = questionConfigs.filter((q) =>
    demoBaby.questions.includes(q.key)
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // In production: server action to save guess
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream via-warm-white to-warm-white">
      <Navbar />
      <div className="mx-auto max-w-2xl px-6 pb-16 pt-28">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="thanks"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-sage/20 bg-warm-white p-16 text-center shadow-lg"
            >
              <div className="mb-6 text-7xl">🎉</div>
              <h2 className="font-display text-3xl font-bold text-charcoal">
                {t("guess.thankYou")}
              </h2>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Header */}
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blush/20 text-4xl"
                >
                  🔮
                </motion.div>
                <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
                  {t("guess.title")}
                </h1>
                <p className="mt-2 text-lg text-charcoal-light/70">
                  {t("guess.subtitle")}{" "}
                  <span className="font-semibold text-charcoal">
                    {demoBaby.name}
                  </span>
                </p>
              </div>

              {/* Guest info */}
              <div className="rounded-2xl border border-charcoal/5 bg-warm-white p-6 shadow-sm">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="guestName"
                      className="mb-1.5 block text-sm font-medium text-charcoal"
                    >
                      {t("guess.yourName")}
                    </label>
                    <input
                      id="guestName"
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full rounded-lg border border-charcoal/10 bg-cream px-4 py-2.5 text-charcoal placeholder:text-charcoal/30 focus:border-sage focus:ring-2 focus:ring-sage/20"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="guestEmail"
                      className="mb-1.5 block text-sm font-medium text-charcoal"
                    >
                      {t("guess.yourEmail")}
                    </label>
                    <input
                      id="guestEmail"
                      type="email"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full rounded-lg border border-charcoal/10 bg-cream px-4 py-2.5 text-charcoal placeholder:text-charcoal/30 focus:border-sage focus:ring-2 focus:ring-sage/20"
                      autoComplete="email"
                    />
                  </div>
                </div>
              </div>

              {/* Questions */}
              {activeQuestions.map((q, i) => (
                <motion.div
                  key={q.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * i }}
                  className="rounded-2xl border border-charcoal/5 bg-warm-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-2xl">{questionIcons[q.key]}</span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-charcoal">
                        {t(`questions.${q.key}`)}
                      </h3>
                      <p className="text-sm text-charcoal-light/60">
                        {t(`questions.${q.key}Desc`)}
                      </p>
                    </div>
                  </div>
                  <QuestionInput
                    config={q}
                    value={answers[q.key] || ""}
                    onChange={(val) =>
                      setAnswers({ ...answers, [q.key]: val })
                    }
                  />
                </motion.div>
              ))}

              {/* Submit */}
              <div className="pt-4 text-center">
                <Button type="submit" size="lg" disabled={!guestName}>
                  {t("guess.submitGuess")}
                </Button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
