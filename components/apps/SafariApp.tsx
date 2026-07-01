"use client";

import { useState } from "react";
import { profile } from "@/lib/data/profile";

const SITE = profile.portfolio;

export function SafariApp() {
  const [blocked, setBlocked] = useState(false);

  return (
    <div className="flex h-full min-h-0 flex-col bg-[#1e1e22]">
      {/* Safari toolbar */}
      <div className="flex shrink-0 items-center gap-3 border-b border-[var(--hairline)] bg-black/25 px-4 py-2.5">
        <div className="flex gap-1.5 text-white/30">
          <span>‹</span>
          <span>›</span>
        </div>
        <div className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/[0.08] px-3 py-1.5 text-[13px] text-white/70">
          <span className="text-mac-max">🔒</span>
          <span className="truncate">{SITE.replace("https://", "")}</span>
        </div>
        <a
          href={SITE}
          target="_blank"
          rel="noreferrer"
          className="text-[13px] text-mac-accent hover:underline"
        >
          Open ↗
        </a>
      </div>

      {/* Viewport */}
      <div className="relative flex-1 bg-white">
        {blocked ? (
          <div className="flex h-full flex-col items-center justify-center gap-3 bg-[#1e1e22] p-8 text-center">
            <p className="text-white/70">
              This site can’t be displayed in a frame.
            </p>
            <a
              href={SITE}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-mac-accent px-4 py-2 text-sm font-medium text-white hover:bg-[#0a74e0]"
            >
              Open {SITE.replace("https://", "")} in a new tab ↗
            </a>
          </div>
        ) : (
          <iframe
            src={SITE}
            title="Portfolio"
            className="h-full w-full border-0"
            onError={() => setBlocked(true)}
          />
        )}
      </div>
    </div>
  );
}
