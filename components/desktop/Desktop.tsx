"use client";

import { useEffect } from "react";
import { useWindowManager } from "@/lib/store/windowManager";
import { useSettings } from "@/lib/store/settings";
import { WindowLayer } from "@/components/window/WindowLayer";
import { MenuBar } from "./MenuBar";
import { Dock } from "./Dock";
import { DesktopIcons } from "./DesktopIcons";
import { wallpaperById, wallpaperStyleFor } from "@/lib/wallpaper";

export function Desktop() {
  const { focusedId, close } = useWindowManager();
  const { wallpaper } = useSettings();

  // Esc closes the focused window (mac-like ⌘W shortcut feel).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && focusedId) close(focusedId);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusedId, close]);

  const rootStyle = wallpaperStyleFor(wallpaperById(wallpaper).photo);

  return (
    <div className="relative h-full w-full overflow-hidden" style={rootStyle}>
      <MenuBar />
      <DesktopIcons />
      <WindowLayer />
      <Dock />
    </div>
  );
}
