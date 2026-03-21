"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/Button";
import { QuestionSelector } from "@/components/dashboard/QuestionSelector";
import { ShareLink } from "@/components/dashboard/ShareLink";
import { type QuestionType } from "@/lib/questions";
import { Link } from "@/i18n/routing";

// Demo state — in production this would come from the database via server actions
export default function DashboardPage() {
  const t = useTranslations();
  const { user } = useUser();
  const [baby, setBaby] = useState<{
    name: string;
    dueDate: string;
    slug: string;
    questions: QuestionType[];
  } | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: "", dueDate: "" });
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionType[]>([
    "gender",
    "weight",
    "eyeColor",
    "birthDate",
    "name",
  ]);

  function handleCreateBaby() {
    // In production: server action to create baby in DB
    const slug = Math.random().toString(36).substring(2, 12);
    setBaby({
      name: formData.name,
      dueDate: formData.dueDate,
      slug,
      questions: selectedQuestions,
    });
    setIsCreating(false);
  }

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="font-display text-3xl font-bold text-charcoal sm:text-4xl">
          {t("dashboard.welcome")}, {user?.firstName || ""}
        </h1>
      </motion.div>

      {!baby && !isCreating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-charcoal/10 bg-warm-white p-16 text-center"
        >
          <div className="mb-4 text-6xl">🍼</div>
          <p className="mb-6 text-lg text-charcoal-light/70">
            {t("dashboard.noBaby")}
          </p>
          <Button onClick={() => setIsCreating(true)} size="lg">
            {t("dashboard.createBaby")}
          </Button>
        </motion.div>
      )}

      {isCreating && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Baby info form */}
          <div className="rounded-2xl border border-charcoal/5 bg-warm-white p-6 shadow-sm">
            <h2 className="mb-6 font-display text-2xl font-semibold text-charcoal">
              {t("dashboard.createBaby")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="babyName"
                  className="mb-1.5 block text-sm font-medium text-charcoal"
                >
                  {t("dashboard.babyName")}
                </label>
                <input
                  id="babyName"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-lg border border-charcoal/10 bg-cream px-4 py-2.5 text-charcoal placeholder:text-charcoal/30 focus:border-sage focus:ring-2 focus:ring-sage/20"
                  placeholder="Baby"
                  autoComplete="off"
                />
              </div>
              <div>
                <label
                  htmlFor="dueDate"
                  className="mb-1.5 block text-sm font-medium text-charcoal"
                >
                  {t("dashboard.dueDate")}
                </label>
                <input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="w-full rounded-lg border border-charcoal/10 bg-cream px-4 py-2.5 text-charcoal focus:border-sage focus:ring-2 focus:ring-sage/20"
                />
              </div>
            </div>
          </div>

          {/* Question selection */}
          <div className="rounded-2xl border border-charcoal/5 bg-warm-white p-6 shadow-sm">
            <h2 className="mb-6 font-display text-2xl font-semibold text-charcoal">
              {t("dashboard.selectQuestions")}
            </h2>
            <QuestionSelector
              selected={selectedQuestions}
              onChange={setSelectedQuestions}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handleCreateBaby}
              disabled={!formData.name || !formData.dueDate}
            >
              {t("common.save")}
            </Button>
            <Button variant="ghost" onClick={() => setIsCreating(false)}>
              {t("common.cancel")}
            </Button>
          </div>
        </motion.div>
      )}

      {baby && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Baby card */}
          <div className="rounded-2xl border border-charcoal/5 bg-warm-white p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blush/20 text-3xl">
                🍼
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-charcoal">
                  {baby.name}
                </h2>
                <p className="text-sm text-charcoal-light/60">
                  {t("dashboard.dueDate")}: {baby.dueDate}
                </p>
              </div>
            </div>
          </div>

          {/* Share link */}
          <div className="rounded-2xl border border-charcoal/5 bg-warm-white p-6 shadow-sm">
            <h3 className="mb-4 font-display text-lg font-semibold text-charcoal">
              {t("dashboard.shareLink")}
            </h3>
            <ShareLink slug={baby.slug} />
          </div>

          {/* Responses overview */}
          <div className="rounded-2xl border border-charcoal/5 bg-warm-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-charcoal">
                  {t("dashboard.responses")}
                </h3>
                <p className="mt-1 text-sm text-charcoal-light/60">
                  {t("dashboard.noResponses")}
                </p>
              </div>
              <Link href={`/results/${baby.slug}`}>
                <Button variant="secondary" size="sm">
                  {t("dashboard.viewResults")}
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
