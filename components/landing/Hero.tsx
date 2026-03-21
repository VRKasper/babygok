"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";

const floatingShapes = [
  { color: "bg-blush/40", size: "w-72 h-72", position: "top-20 -left-20", delay: 0 },
  { color: "bg-lavender/30", size: "w-96 h-96", position: "top-40 -right-32", delay: 1 },
  { color: "bg-sky/25", size: "w-64 h-64", position: "bottom-20 left-1/4", delay: 2 },
  { color: "bg-peach/30", size: "w-80 h-80", position: "-bottom-20 right-1/4", delay: 0.5 },
  { color: "bg-sage/20", size: "w-56 h-56", position: "top-1/3 left-1/3", delay: 1.5 },
];

export function Hero() {
  const t = useTranslations("landing.hero");

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-cream via-warm-white to-warm-white px-6">
      {/* Floating background shapes */}
      {floatingShapes.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute ${shape.position} ${shape.size} ${shape.color} rounded-full blur-3xl`}
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Decorative dots pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #2D2D2D 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Small stork / baby icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-sage/30 bg-warm-white/80 px-4 py-2 text-sm font-medium text-sage-dark backdrop-blur-sm"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 12h.01M15 12h.01M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
            <path d="M12 2a8 8 0 0 0-8 8c0 2.8 1.5 5.2 3.7 6.6L6 22h12l-1.7-5.4C18.5 15.2 20 12.8 20 10a8 8 0 0 0-8-8z" />
          </svg>
          Baby Gok
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl font-bold leading-tight tracking-tight text-charcoal sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {t("title")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-charcoal-light/80 sm:text-xl md:text-2xl"
          style={{ textWrap: "balance" }}
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link href="/sign-up">
            <Button size="lg" variant="primary" className="text-lg">
              {t("cta")}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          </Link>
          <Button size="lg" variant="ghost" className="text-lg">
            {t("secondaryCta")}
          </Button>
        </motion.div>

        {/* Preview cards floating */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-20"
        >
          <div className="mx-auto flex max-w-lg justify-center gap-4">
            {/* Mini preview cards */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl border border-blush/20 bg-warm-white/90 p-4 shadow-xl shadow-blush/10 backdrop-blur-sm"
            >
              <div className="mb-2 text-3xl">👶</div>
              <div className="h-2 w-16 rounded-full bg-blush/60" />
              <div className="mt-1.5 h-2 w-12 rounded-full bg-blush/30" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="rounded-2xl border border-sage/20 bg-warm-white/90 p-4 shadow-xl shadow-sage/10 backdrop-blur-sm"
            >
              <div className="mb-2 text-3xl">⚖️</div>
              <div className="h-2 w-20 rounded-full bg-sage/60" />
              <div className="mt-1.5 h-2 w-14 rounded-full bg-sage/30" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="rounded-2xl border border-lavender/20 bg-warm-white/90 p-4 shadow-xl shadow-lavender/10 backdrop-blur-sm"
            >
              <div className="mb-2 text-3xl">👁️</div>
              <div className="h-2 w-14 rounded-full bg-lavender/60" />
              <div className="mt-1.5 h-2 w-10 rounded-full bg-lavender/30" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-warm-white to-transparent" />
    </section>
  );
}
