"use client";

import { useState } from "react";
import { DOCK_SIZE_OPTIONS, useSettings } from "@/lib/store/settings";
import { WALLPAPERS, wallpaperUrl } from "@/lib/wallpaper";

type Tab = "desktop" | "lock" | "dock";

function Toggle({
  checked,
  onChange,
  title,
  subtitle,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-[var(--hairline)] bg-white/[0.03] p-4">
      <div className="pr-4">
        <p className="text-[13px] font-medium text-white/85">{title}</p>
        <p className="text-xs text-white/45">{subtitle}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-mac-accent" : "bg-white/20"
        }`}
      >
        <span
          className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

function WallpaperGrid({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {WALLPAPERS.map((w) => {
        const active = value === w.id;
        return (
          <button
            key={w.id}
            onClick={() => onSelect(w.id)}
            className="group flex flex-col items-center gap-2"
          >
            <span
              className={`relative block aspect-video w-full overflow-hidden rounded-lg border-2 transition ${
                active
                  ? "border-mac-accent"
                  : "border-white/10 group-hover:border-white/30"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={wallpaperUrl(w.photo, 480)}
                alt={w.name}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              {active && (
                <span className="absolute bottom-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-mac-accent text-[11px] text-white shadow">
                  ✓
                </span>
              )}
            </span>
            <span
              className={`text-[12.5px] ${
                active ? "text-white" : "text-white/60"
              }`}
            >
              {w.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export function SettingsApp() {
  const {
    wallpaper,
    setWallpaper,
    lockWallpaper,
    setLockWallpaper,
    dockSize,
    setDockSize,
    dockAutoHide,
    setDockAutoHide,
    dockMagnify,
    setDockMagnify,
  } = useSettings();
  const [tab, setTab] = useState<Tab>("desktop");

  const items: { key: Tab; label: string; icon: string }[] = [
    { key: "desktop", label: "Wallpaper", icon: "🖼️" },
    { key: "lock", label: "Lock Screen", icon: "🔒" },
    { key: "dock", label: "Dock", icon: "🧩" },
  ];

  return (
    <div className="flex h-full min-h-0 bg-[#1e1e22] text-white/90">
      {/* Sidebar */}
      <aside className="hidden w-52 shrink-0 flex-col gap-1 border-r border-[var(--hairline)] bg-black/20 p-3 text-[13px] sm:flex">
        <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-white/35">
          Settings
        </p>
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => setTab(it.key)}
            className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-left ${
              tab === it.key
                ? "bg-white/10 text-white/90"
                : "text-white/50 hover:bg-white/[0.06]"
            }`}
          >
            <span>{it.icon}</span> {it.label}
          </button>
        ))}
      </aside>

      {/* Main */}
      <div className="mac-scroll flex-1 overflow-auto p-7">
        {/* Mobile tab switch */}
        <div className="mb-5 flex gap-2 sm:hidden">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => setTab(it.key)}
              className={`rounded-full px-3 py-1.5 text-[13px] ${
                tab === it.key
                  ? "bg-mac-accent text-white"
                  : "bg-white/10 text-white/70"
              }`}
            >
              {it.label}
            </button>
          ))}
        </div>

        {tab === "desktop" && (
          <>
            <h1 className="text-xl font-semibold text-white">Wallpaper</h1>
            <p className="mt-1 text-sm text-white/50">
              Choose a background for your desktop.
            </p>
            <div className="mt-6">
              <WallpaperGrid value={wallpaper} onSelect={setWallpaper} />
            </div>
          </>
        )}

        {tab === "lock" && (
          <>
            <h1 className="text-xl font-semibold text-white">Lock Screen</h1>
            <p className="mt-1 text-sm text-white/50">
              Choose a background for the login screen.
            </p>
            <div className="mt-6">
              <WallpaperGrid value={lockWallpaper} onSelect={setLockWallpaper} />
            </div>
          </>
        )}

        {tab === "dock" && (
          <>
            <h1 className="text-xl font-semibold text-white">Dock</h1>
            <p className="mt-1 text-sm text-white/50">
              Adjust the dock size and hiding behavior.
            </p>

            {/* Size */}
            <div className="mt-6 rounded-xl border border-[var(--hairline)] bg-white/[0.03] p-4">
              <p className="mb-3 text-[13px] font-medium text-white/80">Size</p>
              <div className="grid grid-cols-3 gap-2">
                {DOCK_SIZE_OPTIONS.map((opt) => {
                  const active = dockSize === opt.key;
                  return (
                    <button
                      key={opt.key}
                      onClick={() => setDockSize(opt.key)}
                      className={`rounded-lg border py-2.5 text-[13px] transition ${
                        active
                          ? "border-mac-accent bg-mac-accent/15 text-white"
                          : "border-[var(--hairline)] bg-white/[0.03] text-white/70 hover:bg-white/[0.06]"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Magnification toggle */}
            <div className="mt-4">
              <Toggle
                checked={dockMagnify}
                onChange={setDockMagnify}
                title="Magnification"
                subtitle="Dock icons enlarge as you hover over them."
              />
            </div>

            {/* Auto-hide toggle */}
            <div className="mt-4">
              <Toggle
                checked={dockAutoHide}
                onChange={setDockAutoHide}
                title="Automatically hide and show the Dock"
                subtitle="The dock slides away and reappears when you move to the bottom edge."
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
