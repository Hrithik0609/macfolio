"use client";

import { profile, education, certifications } from "@/lib/data/profile";
import { skills } from "@/lib/data/skills";

export function AboutApp() {
  return (
    <div className="flex h-full min-h-0 bg-[#1e1e22] text-white/90">
      {/* Finder sidebar */}
      <aside className="hidden w-48 shrink-0 flex-col gap-1 border-r border-[var(--hairline)] bg-black/20 p-3 text-[13px] sm:flex">
        <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-wide text-white/35">
          Favorites
        </p>
        {["About Me", "Education", "Skills", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(" ", "-")}`}
            className="flex items-center gap-2 rounded-md px-2 py-1.5 text-white/70 hover:bg-white/10"
          >
            <span className="text-mac-accent">●</span>
            {item}
          </a>
        ))}
      </aside>

      {/* Main */}
      <div className="mac-scroll flex-1 overflow-auto p-7">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-mac-accent to-purple-500 text-4xl font-semibold text-white shadow-lg">
            {profile.name
              .split(" ")
              .map((p) => p[0])
              .join("")}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-white">{profile.name}</h1>
            <p className="text-mac-accent">{profile.title}</p>
            <p className="mt-1 text-sm text-white/50">{profile.location}</p>
          </div>
        </div>

        <section id="about-me" className="mt-7">
          <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-white/40">
            Summary
          </h2>
          <p className="text-[14px] leading-relaxed text-white/75">
            {profile.summary}
          </p>
        </section>

        <section id="education" className="mt-7">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-white/40">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((e) => (
              <div
                key={e.school}
                className="rounded-lg border border-[var(--hairline)] bg-white/[0.03] p-3.5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-medium text-white/90">{e.degree}</p>
                  <p className="shrink-0 text-xs text-white/45">{e.period}</p>
                </div>
                <p className="text-sm text-white/60">{e.school}</p>
                <p className="text-xs text-white/45">{e.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="mt-7">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-white/40">
            Skills
          </h2>
          <div className="space-y-3">
            {skills.map((g) => (
              <div key={g.label}>
                <p className="mb-1.5 text-xs text-white/45">{g.label}</p>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-md bg-white/[0.06] px-2.5 py-1 text-[13px] text-white/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-7">
          <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-white/40">
            Certifications & Contact
          </h2>
          <div className="space-y-2 text-[14px]">
            {certifications.map((c) => (
              <p key={c.name} className="text-white/75">
                🏅 {c.name}{" "}
                <span className="text-white/40">— {c.detail}</span>
              </p>
            ))}
            <p className="text-white/75">
              ✉️{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-mac-accent hover:underline"
              >
                {profile.email}
              </a>
            </p>
            <p className="flex flex-wrap gap-4">
              <a
                href={profile.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-mac-accent hover:underline"
              >
                LinkedIn
              </a>
              <a
                href={profile.socials.github}
                target="_blank"
                rel="noreferrer"
                className="text-mac-accent hover:underline"
              >
                GitHub
              </a>
              <a
                href={profile.portfolio}
                target="_blank"
                rel="noreferrer"
                className="text-mac-accent hover:underline"
              >
                Portfolio
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
