"use client";

import { useEffect, useState } from "react";
import { wallpaperById, wallpaperUrl } from "@/lib/wallpaper";
import { LOCK_WALLPAPER_KEY } from "@/lib/store/settings";

const FILL_MS = 2400; // bar animates 0 -> 100% over this
const HOLD_MS = 450; // brief hold on a full bar before advancing

function AppleLogo() {
  return (
    <svg viewBox="0 0 384 512" className="h-16 w-16 fill-white">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [fill, setFill] = useState(false);

  useEffect(() => {
    // Preload the chosen lock wallpaper so login shows the photo instantly.
    const lockId = localStorage.getItem(LOCK_WALLPAPER_KEY) ?? "";
    const img = new Image();
    img.src = wallpaperUrl(wallpaperById(lockId).photo);

    // Kick the CSS width transition on the next frame so it animates smoothly.
    const raf = requestAnimationFrame(() => setFill(true));
    // Advance only after the bar has fully filled (+ a short hold).
    const timer = setTimeout(onDone, FILL_MS + HOLD_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [onDone]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
      <AppleLogo />
      <div className="mt-12 h-1.5 w-56 overflow-hidden rounded-full bg-white/25">
        <div
          className="h-full rounded-full bg-white"
          style={{
            width: fill ? "100%" : "0%",
            transition: `width ${FILL_MS}ms linear`,
          }}
        />
      </div>
    </div>
  );
}
