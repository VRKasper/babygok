"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

interface ShareLinkProps {
  slug: string;
}

export function ShareLink({ slug }: ShareLinkProps) {
  const t = useTranslations("common");
  const [copied, setCopied] = useState(false);

  const url = `${typeof window !== "undefined" ? window.location.origin : ""}/guess/${slug}`;

  async function copyToClipboard() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 rounded-lg border border-charcoal/10 bg-cream px-4 py-2.5 text-sm text-charcoal-light font-mono truncate">
        {url}
      </div>
      <Button
        variant={copied ? "secondary" : "primary"}
        size="sm"
        onClick={copyToClipboard}
      >
        {copied ? t("linkCopied") : t("copyLink")}
      </Button>
    </div>
  );
}
