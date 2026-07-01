import type { ComponentType, ReactNode } from "react";
import type { AppId } from "@/lib/store/windowManager";
import { AboutApp } from "@/components/apps/AboutApp";
import { ProjectsApp } from "@/components/apps/ProjectsApp";
import { ResumeApp } from "@/components/apps/ResumeApp";
import { TerminalApp } from "@/components/apps/TerminalApp";
import { ContactApp } from "@/components/apps/ContactApp";
import { SafariApp } from "@/components/apps/SafariApp";
import { SettingsApp } from "@/components/apps/SettingsApp";

export type AppDef = {
  id: AppId;
  title: string;
  component: ComponentType;
  icon: ReactNode;
  w: number;
  h: number;
};

function IconBox({
  glyph,
  from,
  to,
  bg,
  ring,
}: {
  glyph: string;
  from?: string;
  to?: string;
  bg?: string;
  ring?: boolean;
}) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center rounded-[22%] shadow-md ${
        ring ? "ring-1 ring-white/10" : ""
      }`}
      style={{
        background: bg ?? `linear-gradient(145deg, ${from}, ${to})`,
        containerType: "size",
      }}
    >
      {/* cqmin sizes the glyph relative to the icon box, so it scales with dock magnification. */}
      <span style={{ fontSize: "56cqmin", lineHeight: 1 }}>{glyph}</span>
    </div>
  );
}

export const APPS: Record<AppId, AppDef> = {
  about: {
    id: "about",
    title: "About Me",
    component: AboutApp,
    w: 720,
    h: 540,
    icon: <IconBox glyph="👤" from="#5b9dff" to="#1f5fd6" />,
  },
  projects: {
    id: "projects",
    title: "Projects",
    component: ProjectsApp,
    w: 760,
    h: 540,
    icon: <IconBox glyph="📁" from="#7ec8ff" to="#2f8fe0" />,
  },
  resume: {
    id: "resume",
    title: "Resume",
    component: ResumeApp,
    w: 720,
    h: 600,
    icon: <IconBox glyph="📄" from="#ff8a8a" to="#e23b3b" />,
  },
  terminal: {
    id: "terminal",
    title: "Terminal",
    component: TerminalApp,
    w: 640,
    h: 420,
    icon: <IconBox glyph=">_" bg="#1c1c1e" ring />,
  },
  contact: {
    id: "contact",
    title: "Mail",
    component: ContactApp,
    w: 600,
    h: 480,
    icon: <IconBox glyph="✉️" from="#7fd4ff" to="#1f8ef1" />,
  },
  safari: {
    id: "safari",
    title: "Safari",
    component: SafariApp,
    w: 820,
    h: 580,
    icon: <IconBox glyph="🧭" from="#f3f5f8" to="#cdd6e2" />,
  },
  settings: {
    id: "settings",
    title: "Settings",
    component: SettingsApp,
    w: 680,
    h: 520,
    icon: <IconBox glyph="⚙️" from="#c7ccd4" to="#7c8595" />,
  },
};

// Dock display order.
export const DOCK_ORDER: AppId[] = [
  "about",
  "projects",
  "resume",
  "terminal",
  "contact",
  "safari",
  "settings",
];
