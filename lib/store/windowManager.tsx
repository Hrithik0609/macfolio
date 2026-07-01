"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

export type AppId =
  | "about"
  | "projects"
  | "resume"
  | "terminal"
  | "contact"
  | "safari"
  | "settings";

export type WindowInstance = {
  id: string;
  appId: AppId;
  title: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};

type AppDefaults = {
  title: string;
  w: number;
  h: number;
};

type State = {
  windows: WindowInstance[];
  zCounter: number;
  focusedId: string | null;
};

type Action =
  | { type: "open"; appId: AppId; defaults: AppDefaults }
  | { type: "close"; id: string }
  | { type: "focus"; id: string }
  | { type: "minimize"; id: string }
  | { type: "restore"; id: string }
  | { type: "toggleMax"; id: string }
  | { type: "move"; id: string; x: number; y: number }
  | { type: "resize"; id: string; w: number; h: number };

const CASCADE = 28;
const MENUBAR_H = 28;

function spawnPosition(count: number, w: number, h: number) {
  // Center-ish with a cascade offset per already-open window.
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const baseX = Math.max(24, (vw - w) / 2 - 60);
  const baseY = Math.max(MENUBAR_H + 16, (vh - h) / 2 - 40);
  return {
    x: baseX + count * CASCADE,
    y: baseY + count * CASCADE,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "open": {
      const existing = state.windows.find((w) => w.appId === action.appId);
      const nextZ = state.zCounter + 1;
      if (existing) {
        return {
          ...state,
          zCounter: nextZ,
          focusedId: existing.id,
          windows: state.windows.map((w) =>
            w.id === existing.id ? { ...w, z: nextZ, minimized: false } : w
          ),
        };
      }
      const { w, h, title } = action.defaults;
      const pos = spawnPosition(state.windows.length, w, h);
      const instance: WindowInstance = {
        id: `${action.appId}-${Date.now()}`,
        appId: action.appId,
        title,
        x: pos.x,
        y: pos.y,
        w,
        h,
        z: nextZ,
        minimized: false,
        maximized: false,
      };
      return {
        ...state,
        zCounter: nextZ,
        focusedId: instance.id,
        windows: [...state.windows, instance],
      };
    }
    case "close":
      return {
        ...state,
        windows: state.windows.filter((w) => w.id !== action.id),
        focusedId: state.focusedId === action.id ? null : state.focusedId,
      };
    case "focus": {
      const nextZ = state.zCounter + 1;
      return {
        ...state,
        zCounter: nextZ,
        focusedId: action.id,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, z: nextZ } : w
        ),
      };
    }
    case "minimize":
      return {
        ...state,
        focusedId: state.focusedId === action.id ? null : state.focusedId,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: true } : w
        ),
      };
    case "restore": {
      const nextZ = state.zCounter + 1;
      return {
        ...state,
        zCounter: nextZ,
        focusedId: action.id,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, minimized: false, z: nextZ } : w
        ),
      };
    }
    case "toggleMax":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, maximized: !w.maximized } : w
        ),
      };
    case "move":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, x: action.x, y: action.y } : w
        ),
      };
    case "resize":
      return {
        ...state,
        windows: state.windows.map((w) =>
          w.id === action.id ? { ...w, w: action.w, h: action.h } : w
        ),
      };
    default:
      return state;
  }
}

type WindowManager = {
  windows: WindowInstance[];
  focusedId: string | null;
  open: (appId: AppId, defaults: AppDefaults) => void;
  close: (id: string) => void;
  focus: (id: string) => void;
  minimize: (id: string) => void;
  restore: (id: string) => void;
  toggleMax: (id: string) => void;
  move: (id: string, x: number, y: number) => void;
  resize: (id: string, w: number, h: number) => void;
};

const Ctx = createContext<WindowManager | null>(null);

export function WindowManagerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    windows: [],
    zCounter: 0,
    focusedId: null,
  });

  const open = useCallback(
    (appId: AppId, defaults: AppDefaults) =>
      dispatch({ type: "open", appId, defaults }),
    []
  );
  const close = useCallback((id: string) => dispatch({ type: "close", id }), []);
  const focus = useCallback((id: string) => dispatch({ type: "focus", id }), []);
  const minimize = useCallback(
    (id: string) => dispatch({ type: "minimize", id }),
    []
  );
  const restore = useCallback(
    (id: string) => dispatch({ type: "restore", id }),
    []
  );
  const toggleMax = useCallback(
    (id: string) => dispatch({ type: "toggleMax", id }),
    []
  );
  const move = useCallback(
    (id: string, x: number, y: number) => dispatch({ type: "move", id, x, y }),
    []
  );
  const resize = useCallback(
    (id: string, w: number, h: number) =>
      dispatch({ type: "resize", id, w, h }),
    []
  );

  const value = useMemo<WindowManager>(
    () => ({
      windows: state.windows,
      focusedId: state.focusedId,
      open,
      close,
      focus,
      minimize,
      restore,
      toggleMax,
      move,
      resize,
    }),
    [
      state.windows,
      state.focusedId,
      open,
      close,
      focus,
      minimize,
      restore,
      toggleMax,
      move,
      resize,
    ]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useWindowManager() {
  const ctx = useContext(Ctx);
  if (!ctx)
    throw new Error("useWindowManager must be used within WindowManagerProvider");
  return ctx;
}
