"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data/profile";
import { projects } from "@/lib/data/projects";
import { skills } from "@/lib/data/skills";
import { experience } from "@/lib/data/experience";

type Line = { type: "input" | "output"; text: string };

const PROMPT = "hrithik@macfolio ~ %";

const COMMANDS: Record<string, () => string> = {
  help: () =>
    [
      "Available commands:",
      "  about       — who I am",
      "  projects    — list my projects",
      "  skills      — my tech stack",
      "  experience  — work history",
      "  contact     — how to reach me",
      "  socials     — links",
      "  whoami      — quick intro",
      "  clear       — clear the screen",
    ].join("\n"),
  about: () => `${profile.name} — ${profile.title}\n${profile.summary}`,
  whoami: () => `${profile.name} (${profile.title}, ${profile.location})`,
  projects: () =>
    projects.map((p) => `• ${p.name}  →  ${p.liveLabel}`).join("\n"),
  skills: () =>
    skills.map((g) => `${g.label}: ${g.items.join(", ")}`).join("\n"),
  experience: () =>
    experience
      .map((x) => `${x.role} @ ${x.company} (${x.period})`)
      .join("\n"),
  contact: () => `email: ${profile.email}\nphone: ${profile.phone}`,
  socials: () =>
    `linkedin: ${profile.socials.linkedin}\ngithub: ${profile.socials.github}\nportfolio: ${profile.portfolio}`,
};

export function TerminalApp() {
  const [lines, setLines] = useState<Line[]>([
    {
      type: "output",
      text: `Welcome to macfolio terminal.\nType "help" to see available commands.`,
    },
  ]);
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function run(raw: string) {
    const cmd = raw.trim().toLowerCase();
    setLines((prev) => [...prev, { type: "input", text: raw }]);
    if (!cmd) return;
    if (cmd === "clear") {
      setLines([]);
      return;
    }
    const handler = COMMANDS[cmd];
    const output = handler
      ? handler()
      : `zsh: command not found: ${cmd}. Try "help".`;
    setLines((prev) => [...prev, { type: "output", text: output }]);
  }

  return (
    <div
      className="mac-scroll h-full overflow-auto bg-[#1b1b1d]/95 p-4 font-mono text-[13px] leading-relaxed text-[#e6e6e6]"
      ref={scrollRef}
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) =>
        line.type === "input" ? (
          <div key={i} className="flex gap-2">
            <span className="text-mac-max">{PROMPT}</span>
            <span>{line.text}</span>
          </div>
        ) : (
          <pre key={i} className="whitespace-pre-wrap text-white/80">
            {line.text}
          </pre>
        )
      )}
      <div className="flex gap-2">
        <span className="shrink-0 text-mac-max">{PROMPT}</span>
        <input
          ref={inputRef}
          autoFocus
          value={value}
          spellCheck={false}
          autoComplete="off"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              run(value);
              setValue("");
            }
          }}
          className="flex-1 bg-transparent outline-none caret-mac-max"
        />
      </div>
    </div>
  );
}
