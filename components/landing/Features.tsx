"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

const steps = [
  {
    key: "create",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 5v14M5 12h14" />
        <rect x="3" y="3" width="18" height="18" rx="4" />
      </svg>
    ),
    color: "bg-blush/20 text-blush-dark border-blush/30",
    accent: "bg-blush",
  },
  {
    key: "share",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
      </svg>
    ),
    color: "bg-sage/20 text-sage-dark border-sage/30",
    accent: "bg-sage",
  },
  {
    key: "guess",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 10h.01M12 10h.01M16 10h.01" />
      </svg>
    ),
    color: "bg-lavender/20 text-lavender-dark border-lavender/30",
    accent: "bg-lavender",
  },
  {
    key: "results",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    color: "bg-sky/20 text-sky-dark border-sky/30",
    accent: "bg-sky",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

export function Features() {
  const t = useTranslations("landing.features");

  return (
    <section className="relative px-6 py-32">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-white via-cream/30 to-warm-white" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight text-charcoal sm:text-5xl">
            {t("title")}
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, i) => (
            <motion.div key={step.key} variants={itemVariants} className="group relative">
              {/* Connector line (not on last) */}
              {i < steps.length - 1 && (
                <div className="absolute right-0 top-12 hidden h-px w-8 translate-x-full bg-charcoal/10 lg:block" />
              )}

              <div className="relative rounded-2xl border border-charcoal/5 bg-warm-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                {/* Step number */}
                <div className="absolute -top-3 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-charcoal text-xs font-bold text-warm-white">
                  {i + 1}
                </div>

                {/* Icon */}
                <div className={`mb-4 inline-flex rounded-xl border p-3 ${step.color}`}>
                  {step.icon}
                </div>

                <h3 className="mb-2 font-display text-xl font-semibold text-charcoal">
                  {t(`${step.key}.title`)}
                </h3>
                <p className="text-sm leading-relaxed text-charcoal-light/70">
                  {t(`${step.key}.description`)}
                </p>

                {/* Decorative accent bar */}
                <div className={`mt-4 h-1 w-12 rounded-full ${step.accent} opacity-40 transition-all duration-300 group-hover:w-20 group-hover:opacity-70`} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
