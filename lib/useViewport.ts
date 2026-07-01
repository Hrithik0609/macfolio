"use client";

import { useEffect, useState } from "react";

export function useViewport() {
  const [vp, setVp] = useState({ w: 1440, h: 900 });

  useEffect(() => {
    const update = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    const raf = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", update);
    };
  }, []);

  return vp;
}
