"use client";

import { motion } from "motion/react";
import { useRef } from "react";
import { useWindowManager, type AppId } from "@/lib/store/windowManager";
import { APPS } from "@/lib/apps";

const SHORTCUTS: AppId[] = ["projects", "resume"];

export function DesktopIcons() {
  const { open } = useWindowManager();
  const boundsRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={boundsRef} className="absolute inset-0 z-0 overflow-hidden">
      {SHORTCUTS.map((id, i) => {
        const def = APPS[id];
        const openApp = () =>
          open(id, { title: def.title, w: def.w, h: def.h });
        return (
          <motion.button
            key={id}
            drag
            dragConstraints={boundsRef}
            dragMomentum={false}
            dragElastic={0}
            whileDrag={{ scale: 1.08 }}
            // Start stacked in the top-right; draggable anywhere afterwards.
            style={{ top: 44 + i * 104, right: 16, position: "absolute" }}
            onDoubleClick={openApp}
            onClick={(e) => {
              if (window.matchMedia("(pointer: coarse)").matches) openApp();
              e.currentTarget.focus();
            }}
            className="flex w-20 cursor-grab flex-col items-center gap-1 rounded-lg p-2 text-center active:cursor-grabbing focus:bg-white/10"
          >
            <span className="pointer-events-none h-12 w-12">{def.icon}</span>
            <span className="pointer-events-none rounded px-1 text-[12px] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {def.title}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
