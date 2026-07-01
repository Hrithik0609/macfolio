"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { profile } from "@/lib/data/profile";
import { wallpaperStyle } from "@/lib/wallpaper";

export function LoginScreen({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [shake, setShake] = useState(false);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setNow(new Date()));
    const t = setInterval(() => setNow(new Date()), 1000 * 20);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(t);
    };
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Mock auth: any input unlocks; empty triggers a hint shake.
    if (password.trim().length === 0) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    onUnlock();
  }

  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .join("");

  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center"
      style={wallpaperStyle}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Clock */}
      <div className="relative mb-auto mt-[12vh] text-center text-white drop-shadow-lg">
        <p className="text-lg font-medium">
          {now?.toLocaleDateString(undefined, {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
        <p className="text-7xl font-semibold tabular-nums" suppressHydrationWarning>
          {now?.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Login card */}
      <motion.div
        className="relative mb-[18vh] flex flex-col items-center gap-4"
        animate={shake ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-linear-to-br from-mac-accent to-purple-500 text-3xl font-semibold text-white shadow-xl ring-2 ring-white/20">
          {initials}
        </div>
        <p className="text-xl font-medium text-white drop-shadow">
          {profile.name}
        </p>

        <form onSubmit={submit} className="flex flex-col items-center gap-2">
          <div className="flex items-center overflow-hidden rounded-full bg-white/15 backdrop-blur ring-1 ring-white/25">
            <input
              type="password"
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-56 bg-transparent px-4 py-2 text-center text-sm text-white placeholder:text-white/55 outline-none"
            />
            <button
              type="submit"
              aria-label="Unlock"
              className="px-3 py-2 text-white/80 hover:text-white"
            >
              →
            </button>
          </div>
          <p className="text-xs text-white/70">
            Hint: type anything and press Enter
          </p>
        </form>
      </motion.div>
    </div>
  );
}
