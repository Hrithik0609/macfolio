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

type Settings = {
  wallpaper: string;
  setWallpaper: (id: string) => void;
};

const Ctx = createContext<Settings | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [wallpaper, setWallpaperState] = useState<string>(() => {
    if (typeof window === "undefined") return DEFAULT_WALLPAPER;
    return localStorage.getItem("macfolio-wallpaper") || DEFAULT_WALLPAPER;
  });

  const setWallpaper = useCallback((id: string) => {
    setWallpaperState(id);
    if (typeof window !== "undefined")
      localStorage.setItem("macfolio-wallpaper", id);
  }, []);

  const value = useMemo(
    () => ({ wallpaper, setWallpaper }),
    [wallpaper, setWallpaper]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useSettings() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
