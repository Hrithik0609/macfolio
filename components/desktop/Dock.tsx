"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useWindowManager, type AppId } from "@/lib/store/windowManager";
import { APPS, DOCK_ORDER } from "@/lib/apps";
import { useViewport } from "@/lib/useViewport";
import { DOCK_BASE, useSettings } from "@/lib/store/settings";

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
    <div className="group relative flex items-end justify-center">
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
      {/* Running indicator — absolute so it doesn't push the icon upward. */}
      <span
        className={`pointer-events-none absolute -bottom-1.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-white/80 transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export function Dock() {
  const mouseX = useMotionValue(Number.POSITIVE_INFINITY);
  const { w, h } = useViewport();
  const { dockSize, dockAutoHide, dockMagnify } = useSettings();
  const mobile = w < 480;

  const base = mobile ? Math.min(44, DOCK_BASE[dockSize]) : DOCK_BASE[dockSize];
  // When magnification is off, the magnified size equals the base (no zoom).
  const max = dockMagnify ? Math.round(base * 1.6) : base;

  // Auto-hide: dock slides below the screen and reveals when the pointer nears
  // the bottom edge (or while hovering it).
  const [revealed, setRevealed] = useState(false);
  const visible = !dockAutoHide || revealed;
  const hideOffset = base + 40;

  useEffect(() => {
    if (!dockAutoHide) return;
    const onMove = (e: PointerEvent) => {
      if (e.clientY >= h - (hideOffset + 24)) setRevealed(true);
      else if (e.clientY < h - (hideOffset + 90)) setRevealed(false);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [dockAutoHide, h, hideOffset]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-2 z-9000 flex justify-center px-2 transition-transform duration-300 ease-out"
      style={{ transform: visible ? "translateY(0)" : `translateY(${hideOffset}px)` }}
    >
      <motion.div
        onMouseEnter={() => dockAutoHide && setRevealed(true)}
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Number.POSITIVE_INFINITY)}
        // Fixed height so magnified icons overflow upward instead of resizing
        // the glass panel (which caused the hover glitch). Equal top/bottom
        // margin around the base icon (2 × pb).
        style={{ height: base + 16 }}
        className={`glass-dock pointer-events-auto flex max-w-[96vw] items-end rounded-2xl border border-white/15 pb-2 shadow-2xl shadow-black/40 ${
          mobile ? "gap-1.5 px-2" : "gap-2.5 px-3"
        }`}
      >
        {DOCK_ORDER.map((id) => (
          <DockItem key={id} appId={id} mouseX={mouseX} base={base} max={max} />
        ))}
      </motion.div>
    </div>
  );
}
