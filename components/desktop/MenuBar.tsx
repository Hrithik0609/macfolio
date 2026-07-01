"use client";

import { useEffect, useState } from "react";
import { useWindowManager } from "@/lib/store/windowManager";
import { APPS } from "@/lib/apps";

function AppleLogo() {
  return (
    <svg viewBox="0 0 384 512" className="h-3.5 w-3.5 fill-white/90">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg
      viewBox="0 0 28 14"
      className="h-3.5 w-7"
      fill="none"
      stroke="currentColor"
    >
      <rect
        x="1"
        y="1.5"
        width="22"
        height="11"
        rx="3"
        strokeWidth="1.2"
        opacity="0.7"
      />
      <rect x="3" y="3.5" width="12" height="7" rx="1.5" fill="currentColor" />
      <path
        d="M25 5v4c1.2-.4 1.2-3.6 0-4z"
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg
      viewBox="0 0 20 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
    >
      <path d="M2 5.5a12 12 0 0 1 16 0" />
      <path d="M4.5 8.5a8 8 0 0 1 11 0" />
      <path d="M7 11.4a4 4 0 0 1 6 0" />
      <circle cx="10" cy="13.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 18 18"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <circle cx="7.5" cy="7.5" r="5" />
      <path d="M11.5 11.5 16 16" />
    </svg>
  );
}

function ControlCenterIcon() {
  return (
    <svg
      viewBox="0 0 20 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M2 5h10M16 5h2M2 11h2M8 11h10" />
      <circle cx="14" cy="5" r="2" />
      <circle cx="6" cy="11" r="2" />
    </svg>
  );
}

export function MenuBar() {
  const { focusedId, windows } = useWindowManager();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setNow(new Date()));
    const t = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(t);
    };
  }, []);

  const focused = windows.find((w) => w.id === focusedId);
  const activeApp = focused ? APPS[focused.appId].title : "Finder";

  const menus = ["File", "Edit", "View", "Window", "Help"];

  const dateStr = now
    ? now.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";
  const timeStr = now
    ? now.toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="glass-bar fixed inset-x-0 top-0 z-9000 flex h-7 items-center justify-between border-b border-white/10 px-3 text-[13px] text-white/90">
      <div className="flex items-center gap-4">
        <button className="px-1 hover:opacity-70">
          <AppleLogo />
        </button>
        <span className="font-semibold">{activeApp}</span>
        <nav className="hidden items-center gap-4 text-white/75 sm:flex">
          {menus.map((m) => (
            <button key={m} className="hover:text-white">
              {m}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-3.5 text-white/90">
        <BatteryIcon />
        <WifiIcon />
        <SearchIcon />
        <ControlCenterIcon />
        <span
          className="tabular-nums"
          suppressHydrationWarning
        >{`${dateStr}  ${timeStr}`}</span>
      </div>
    </div>
  );
}
