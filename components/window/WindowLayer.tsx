"use client";

import { AnimatePresence } from "motion/react";
import { useWindowManager } from "@/lib/store/windowManager";
import { APPS } from "@/lib/apps";
import { Window } from "./Window";

export function WindowLayer() {
  const { windows, focusedId } = useWindowManager();

  return (
    <AnimatePresence>
      {windows
        .filter((w) => !w.minimized)
        .map((w) => {
          const App = APPS[w.appId].component;
          return (
            <Window key={w.id} instance={w} focused={focusedId === w.id}>
              <App />
            </Window>
          );
        })}
    </AnimatePresence>
  );
}
