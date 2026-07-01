"use client";

import {
  animate,
  motion,
  useDragControls,
  useMotionValue,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import {
  useWindowManager,
  type WindowInstance,
} from "@/lib/store/windowManager";
import { useViewport } from "@/lib/useViewport";

const MENUBAR_H = 28;
const MIN_W = 360;
const MIN_H = 240;

function TrafficLights({
  onClose,
  onMinimize,
  onMaximize,
  active,
}: {
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  active: boolean;
}) {
  const base =
    "group/light flex h-3 w-3 items-center justify-center rounded-full text-[8px] font-bold leading-none";
  const dim = active ? "" : "opacity-90";
  return (
    <div className="group/lights flex items-center gap-2">
      <button
        aria-label="Close"
        onClick={onClose}
        className={`${base} bg-mac-close ${dim} text-[#7d0000]`}
      >
        <span className="opacity-0 group-hover/lights:opacity-100">×</span>
      </button>
      <button
        aria-label="Minimize"
        onClick={onMinimize}
        className={`${base} bg-mac-min ${dim} text-[#915900]`}
      >
        <span className="opacity-0 group-hover/lights:opacity-100">–</span>
      </button>
      <button
        aria-label="Maximize"
        onClick={onMaximize}
        className={`${base} bg-mac-max ${dim} text-[#006400]`}
      >
        <span className="opacity-0 group-hover/lights:opacity-100">+</span>
      </button>
    </div>
  );
}

export function Window({
  instance,
  focused,
  children,
}: {
  instance: WindowInstance;
  focused: boolean;
  children: ReactNode;
}) {
  const { close, minimize, toggleMax, focus, move, resize } =
    useWindowManager();
  const controls = useDragControls();
  const x = useMotionValue(instance.x);
  const y = useMotionValue(instance.y);

  const viewport = useViewport();
  const isMobile = viewport.w < 768;

  // Animate to/from the maximized position.
  const maximized = instance.maximized || isMobile;
  useEffect(() => {
    if (maximized) {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 38 });
      animate(y, MENUBAR_H, { type: "spring", stiffness: 400, damping: 38 });
    } else {
      animate(x, instance.x, { type: "spring", stiffness: 400, damping: 38 });
      animate(y, instance.y, { type: "spring", stiffness: 400, damping: 38 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maximized]);

  // On phones, leave space for the dock so content isn't hidden behind it.
  const dockSpace = isMobile ? 78 : 0;
  const width = maximized ? viewport.w : instance.w;
  const height = maximized ? viewport.h - MENUBAR_H - dockSpace : instance.h;

  // Resize via bottom-right corner.
  const resizing = useRef(false);
  function startResize(e: React.PointerEvent) {
    if (maximized) return;
    e.preventDefault();
    e.stopPropagation();
    resizing.current = true;
    const startX = e.clientX;
    const startY = e.clientY;
    const startW = instance.w;
    const startH = instance.h;
    (e.target as Element).setPointerCapture(e.pointerId);

    function onMove(ev: PointerEvent) {
      if (!resizing.current) return;
      const w = Math.max(MIN_W, startW + (ev.clientX - startX));
      const h = Math.max(MIN_H, startH + (ev.clientY - startY));
      resize(instance.id, w, h);
    }
    function onUp() {
      resizing.current = false;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    }
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  return (
    <motion.div
      className="absolute left-0 top-0 flex flex-col overflow-hidden border border-[var(--hairline-strong)] glass-window shadow-2xl shadow-black/50 no-select"
      style={{
        x,
        y,
        width,
        height,
        zIndex: instance.z,
        borderRadius: maximized ? 0 : 12,
      }}
      drag={!maximized}
      dragListener={false}
      dragControls={controls}
      dragMomentum={false}
      onPointerDownCapture={() => focus(instance.id)}
      onDragEnd={() => move(instance.id, x.get(), y.get())}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 420, damping: 32 }}
    >
      {/* Title bar */}
      <div
        onPointerDown={(e) => {
          if (!maximized) controls.start(e);
        }}
        onDoubleClick={() => toggleMax(instance.id)}
        className={`flex h-9 shrink-0 items-center gap-3 border-b border-[var(--hairline)] px-3.5 ${
          maximized ? "" : "cursor-grab active:cursor-grabbing"
        }`}
        style={{ background: "var(--glass-window-head)" }}
      >
        <TrafficLights
          active={focused}
          onClose={() => close(instance.id)}
          onMinimize={() => minimize(instance.id)}
          onMaximize={() => toggleMax(instance.id)}
        />
        <span
          className={`pointer-events-none flex-1 truncate text-center text-[13px] font-medium ${
            focused ? "text-white/85" : "text-white/45"
          }`}
        >
          {instance.title}
        </span>
        {/* Spacer to balance the traffic lights so the title stays centered */}
        <span className="w-[52px] shrink-0" aria-hidden />
      </div>

      {/* Content */}
      <div className="mac-scroll relative flex-1 overflow-auto">{children}</div>

      {/* Resize handle */}
      {!maximized && (
        <div
          onPointerDown={startResize}
          className="absolute bottom-0 right-0 z-10 h-4 w-4 cursor-nwse-resize"
        />
      )}
    </motion.div>
  );
}
