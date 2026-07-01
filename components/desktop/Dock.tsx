"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import { useWindowManager, type AppId } from "@/lib/store/windowManager";
import { APPS, DOCK_ORDER } from "@/lib/apps";
import { useViewport } from "@/lib/useViewport";

function DockItem({
  appId,
  mouseX,
  base,
  max,
}: {
  appId: AppId;
  mouseX: MotionValue<number>;
  base: number;
  max: number;
}) {
  const def = APPS[appId];
  const { open, windows, focusedId, restore, minimize } = useWindowManager();
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: base };
    return val - (rect.x + rect.width / 2);
  });

  const sizeRaw = useTransform(distance, [-140, 0, 140], [base, max, base]);
  const size = useSpring(sizeRaw, { stiffness: 320, damping: 22, mass: 0.4 });

  const instance = windows.find((w) => w.appId === appId);
  const isOpen = Boolean(instance);

  function onClick() {
    if (instance && !instance.minimized && focusedId === instance.id) {
      minimize(instance.id);
    } else if (instance && instance.minimized) {
      restore(instance.id);
    } else {
      open(appId, { title: def.title, w: def.w, h: def.h });
    }
  }

  return (
    <div className="group relative flex flex-col items-center">
      <span className="pointer-events-none absolute -top-9 hidden whitespace-nowrap rounded-md bg-black/75 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 sm:block">
        {def.title}
      </span>
      <motion.button
        ref={ref}
        onClick={onClick}
        style={{ width: size, height: size }}
        className="flex origin-bottom items-end justify-center"
        whileTap={{ scale: 0.9 }}
        aria-label={def.title}
      >
        {def.icon}
      </motion.button>
      <span
        className={`mt-1 h-1 w-1 rounded-full bg-white/80 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export function Dock() {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const { w } = useViewport();
  const mobile = w < 480;
  const base = mobile ? 42 : 56;
  const max = mobile ? 54 : 92;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-2 z-9000 flex justify-center px-2">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        className={`glass-dock pointer-events-auto flex max-w-[96vw] items-end rounded-2xl border border-white/15 shadow-2xl shadow-black/40 ${
          mobile ? "gap-1.5 px-2 pb-1.5 pt-2" : "gap-2.5 px-3 pb-2 pt-2.5"
        }`}
      >
        {DOCK_ORDER.map((id) => (
          <DockItem key={id} appId={id} mouseX={mouseX} base={base} max={max} />
        ))}
      </motion.div>
    </div>
  );
}
