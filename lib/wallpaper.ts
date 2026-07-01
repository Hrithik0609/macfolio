import type { CSSProperties } from "react";

export type Wallpaper = { id: string; name: string; photo: string };

// High-res macOS-style backgrounds (Unsplash photo IDs, verified reachable).
export const WALLPAPERS: Wallpaper[] = [
  { id: "aurora", name: "Aurora", photo: "photo-1614850523459-c2f4c699c52e" },
  { id: "valley", name: "Valley", photo: "photo-1506744038136-46273834b3fb" },
  { id: "earth", name: "Earth", photo: "photo-1451187580459-43490279c0fa" },
  {
    id: "northern",
    name: "Northern Lights",
    photo: "photo-1419242902214-272b3f66ee7a",
  },
  { id: "nebula", name: "Nebula", photo: "photo-1462331940025-496dfbfc7564" },
  { id: "waves", name: "Waves", photo: "photo-1545972154-9bb223aac798" },
];

export const DEFAULT_WALLPAPER = WALLPAPERS[0].id;

const GRADIENT = [
  "radial-gradient(ellipse at 18% 6%, rgba(255,173,96,0.45), rgba(255,122,89,0.15) 30%, rgba(255,122,89,0) 55%)",
  "radial-gradient(ellipse at 88% 16%, rgba(120,92,255,0.5), rgba(82,64,200,0.2) 35%, rgba(82,64,200,0) 62%)",
  "linear-gradient(160deg, #ff8a5b 0%, #d2477f 26%, #6a3fb0 52%, #243c8f 78%, #0a1f4a 100%)",
].join(", ");

export function wallpaperUrl(photo: string, w = 2880) {
  return `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=${w}&q=85`;
}

// Full-screen background style. The photo paints on top of a gradient
// fallback (CSS stacks front-to-back), so it never falls through to black.
export function wallpaperStyleFor(photo: string): CSSProperties {
  return {
    backgroundColor: "#0b1f3a",
    backgroundImage: `url("${wallpaperUrl(photo)}"), ${GRADIENT}`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
}

export function wallpaperById(id: string): Wallpaper {
  return WALLPAPERS.find((w) => w.id === id) ?? WALLPAPERS[0];
}

// Default wallpaper used by the boot preload and login screen.
export const WALLPAPER_URL = wallpaperUrl(WALLPAPERS[0].photo);
export const wallpaperStyle = wallpaperStyleFor(WALLPAPERS[0].photo);
