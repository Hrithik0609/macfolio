"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { DEFAULT_WALLPAPER } from "@/lib/wallpaper";

export const DESKTOP_WALLPAPER_KEY = "macfolio-wallpaper";
export const LOCK_WALLPAPER_KEY = "macfolio-lock-wallpaper";
export const DOCK_SIZE_KEY = "macfolio-dock-size";
export const DOCK_AUTOHIDE_KEY = "macfolio-dock-autohide";
export const DOCK_MAGNIFY_KEY = "macfolio-dock-magnify";

export type DockSize = "small" | "medium" | "large";

export const DOCK_SIZE_OPTIONS: { key: DockSize; label: string }[] = [
  { key: "small", label: "Small" },
  { key: "medium", label: "Medium" },
  { key: "large", label: "Large" },
];

// Base icon size (px) for each dock size; magnified size scales from this.
export const DOCK_BASE: Record<DockSize, number> = {
  small: 44,
  medium: 56,
  large: 70,
};

type Settings = {
  wallpaper: string;
  setWallpaper: (id: string) => void;
  lockWallpaper: string;
  setLockWallpaper: (id: string) => void;
  dockSize: DockSize;
  setDockSize: (s: DockSize) => void;
  dockAutoHide: boolean;
  setDockAutoHide: (v: boolean) => void;
  dockMagnify: boolean;
  setDockMagnify: (v: boolean) => void;
};

const Ctx = createContext<Settings | null>(null);

function readStored(key: string) {
  if (typeof window === "undefined") return DEFAULT_WALLPAPER;
  return localStorage.getItem(key) || DEFAULT_WALLPAPER;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [wallpaper, setWallpaperState] = useState<string>(() =>
    readStored(DESKTOP_WALLPAPER_KEY)
  );
  const [lockWallpaper, setLockWallpaperState] = useState<string>(() =>
    readStored(LOCK_WALLPAPER_KEY)
  );
  const [dockSize, setDockSizeState] = useState<DockSize>(() => {
    if (typeof window === "undefined") return "medium";
    return (localStorage.getItem(DOCK_SIZE_KEY) as DockSize) || "medium";
  });
  const [dockAutoHide, setDockAutoHideState] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(DOCK_AUTOHIDE_KEY) === "1";
  });
  const [dockMagnify, setDockMagnifyState] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    // Default on unless explicitly disabled.
    return localStorage.getItem(DOCK_MAGNIFY_KEY) !== "0";
  });

  const setWallpaper = useCallback((id: string) => {
    setWallpaperState(id);
    if (typeof window !== "undefined")
      localStorage.setItem(DESKTOP_WALLPAPER_KEY, id);
  }, []);

  const setLockWallpaper = useCallback((id: string) => {
    setLockWallpaperState(id);
    if (typeof window !== "undefined")
      localStorage.setItem(LOCK_WALLPAPER_KEY, id);
  }, []);

  const setDockSize = useCallback((s: DockSize) => {
    setDockSizeState(s);
    if (typeof window !== "undefined") localStorage.setItem(DOCK_SIZE_KEY, s);
  }, []);

  const setDockAutoHide = useCallback((v: boolean) => {
    setDockAutoHideState(v);
    if (typeof window !== "undefined")
      localStorage.setItem(DOCK_AUTOHIDE_KEY, v ? "1" : "0");
  }, []);

  const setDockMagnify = useCallback((v: boolean) => {
    setDockMagnifyState(v);
    if (typeof window !== "undefined")
      localStorage.setItem(DOCK_MAGNIFY_KEY, v ? "1" : "0");
  }, []);

  const value = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSettings() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
