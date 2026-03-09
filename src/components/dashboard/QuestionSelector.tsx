"use client";

import { useTranslations } from "next-intl";
import { Switch } from "@headlessui/react";
import { questionConfigs, type QuestionType } from "@/lib/questions";

interface QuestionSelectorProps {
  selected: QuestionType[];
  onChange: (questions: QuestionType[]) => void;
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

const questionColors: Record<QuestionType, string> = {
  gender: "bg-blush/10 border-blush/20",
  weight: "bg-sage/10 border-sage/20",
  length: "bg-sky/10 border-sky/20",
  eyeColor: "bg-lavender/10 border-lavender/20",
  hairColor: "bg-peach/10 border-peach/20",
  birthDate: "bg-blush/10 border-blush/20",
  birthTime: "bg-sage/10 border-sage/20",
  name: "bg-sky/10 border-sky/20",
  looksLike: "bg-lavender/10 border-lavender/20",
};

export function QuestionSelector({ selected, onChange }: QuestionSelectorProps) {
  const t = useTranslations("questions");

  function toggleQuestion(key: QuestionType) {
    if (selected.includes(key)) {
      onChange(selected.filter((q) => q !== key));
    } else {
      onChange([...selected, key]);
    }
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {questionConfigs.map((q) => {
        const isSelected = selected.includes(q.key);
        return (
          <div
            key={q.key}
            className={`relative flex items-center gap-4 rounded-xl border p-4 transition-all duration-200 ${
              isSelected
                ? `${questionColors[q.key]} shadow-sm`
                : "border-charcoal/5 bg-warm-white hover:border-charcoal/10"
            }`}
          >
            <span className="text-2xl">{questionIcons[q.key]}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-charcoal">{t(q.key)}</p>
              <p className="text-xs text-charcoal-light/60 truncate">
                {t(`${q.key}Desc`)}
              </p>
            </div>
            <Switch
              checked={isSelected}
              onChange={() => toggleQuestion(q.key)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                isSelected ? "bg-sage" : "bg-charcoal/15"
              }`}
            >
              <span className="sr-only">{t(q.key)}</span>
              <span
                className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-warm-white shadow-sm ring-0 transition-transform duration-200 ${
                  isSelected ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </Switch>
          </div>
        );
      })}
    </div>
  );
}
