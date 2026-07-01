"use client";

import { useSettings } from "@/lib/store/settings";
import { WALLPAPERS, wallpaperUrl } from "@/lib/wallpaper";

export function SettingsApp() {
  const { wallpaper, setWallpaper } = useSettings();

  return (
    <div className="flex h-full min-h-0 bg-[#1e1e22] text-white/90">
      {/* Sidebar */}
      <aside className="hidden w-52 shrink-0 flex-col gap-1 border-r border-[var(--hairline)] bg-black/20 p-3 text-[13px] sm:flex">
        <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-white/35">
          Settings
        </p>
        <div className="flex items-center gap-2 rounded-md bg-white/10 px-2 py-1.5 text-white/90">
          <span>🖼️</span> Wallpaper
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-white/50">
          <span>🖥️</span> Desktop
        </div>
        <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-white/50">
          <span>ℹ️</span> About
        </div>
      </aside>

      {/* Main */}
      <div className="mac-scroll flex-1 overflow-auto p-7">
        <h1 className="text-xl font-semibold text-white">Wallpaper</h1>
        <p className="mt-1 text-sm text-white/50">
          Choose a background for your desktop.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {WALLPAPERS.map((w) => {
            const active = wallpaper === w.id;
            return (
              <button
                key={w.id}
                onClick={() => setWallpaper(w.id)}
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
      </div>
    </div>
  );
}
