"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/Button";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-warm-white via-cream to-cream-dark px-6 py-24">
      {/* Background decorations */}
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-charcoal/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-charcoal sm:text-4xl md:text-5xl">
            {t("landing.social.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-charcoal-light/70">
            {t("landing.social.description")}
          </p>
          <div className="mt-8">
            <Link href="/sign-up">
              <Button size="lg" variant="primary">
                {t("landing.hero.cta")}
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="mt-16 flex items-center justify-center gap-6 text-sm text-charcoal-light/50">
          <span className="font-display text-lg font-bold text-charcoal/70">
            {t("common.appName")}
          </span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}
