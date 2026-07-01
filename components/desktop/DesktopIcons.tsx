"use client";

import { useWindowManager, type AppId } from "@/lib/store/windowManager";
import { APPS } from "@/lib/apps";

const SHORTCUTS: AppId[] = ["projects", "resume"];

export function DesktopIcons() {
  const { open } = useWindowManager();

  return (
    <div className="absolute right-3 top-10 z-0 flex flex-col gap-4">
      {SHORTCUTS.map((id) => {
        const def = APPS[id];
        return (
          <button
            key={id}
            onDoubleClick={() =>
              open(id, { title: def.title, w: def.w, h: def.h })
            }
            onClick={(e) => {
              // Single click selects; double opens. On touch, open on click.
              if (window.matchMedia("(pointer: coarse)").matches) {
                open(id, { title: def.title, w: def.w, h: def.h });
              }
              e.currentTarget.focus();
            }}
            className="flex w-20 flex-col items-center gap-1 rounded-lg p-2 text-center focus:bg-white/10"
          >
            <span className="h-12 w-12">{def.icon}</span>
            <span className="rounded px-1 text-[12px] text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              {def.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
