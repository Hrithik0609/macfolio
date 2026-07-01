"use client";

import { useState } from "react";
import { WindowManagerProvider } from "@/lib/store/windowManager";
import { SettingsProvider } from "@/lib/store/settings";
import { BootScreen } from "@/components/boot/BootScreen";
import { LoginScreen } from "@/components/boot/LoginScreen";
import { Desktop } from "@/components/desktop/Desktop";

type Phase = "boot" | "login" | "desktop";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("boot");

  return (
    <main className="relative h-full w-full overflow-hidden">
      {phase === "boot" && <BootScreen onDone={() => setPhase("login")} />}
      {phase === "login" && (
        <LoginScreen onUnlock={() => setPhase("desktop")} />
      )}
      {phase === "desktop" && (
        <SettingsProvider>
          <WindowManagerProvider>
            <Desktop />
          </WindowManagerProvider>
        </SettingsProvider>
      )}
    </main>
  );
}
