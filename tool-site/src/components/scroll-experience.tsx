"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t); };

export function ScrollExperience({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const assembly = root.querySelector<HTMLElement>(".assembly-sequence");
    const depth = root.querySelector<HTMLElement>(".depth-sequence");
    const footer = root.querySelector<HTMLElement>(".tool-footer");
    let frame = 0;
    let enabled = false;
    let mobile = false;
    let lastTime = 0;
    let current = 0;
    let target = 0;

    function progress(element: HTMLElement | null) {
      if (!element) return 0;
      const rect = element.getBoundingClientRect();
      const stage = element.querySelector<HTMLElement>(".assembly-stage, .depth-stage");
      return clamp(-rect.top / Math.max(1, rect.height - (stage?.offsetHeight || window.innerHeight)));
    }
    function render(time: number) {
      frame = 0;
      if (!enabled || !root) return;
      target = progress(assembly);
      const dt = lastTime ? Math.min(64, time - lastTime) : 16;
      lastTime = time;
      current += (target - current) * (1 - Math.exp(-dt / 85));
      if (Math.abs(target - current) < .0002) current = target;
      const alignment = smooth((current - .05) / .55);
      const settle = smooth((current - .38) / .42);
      root.style.setProperty("--assembly", String(alignment));
      root.style.setProperty("--settle", String(settle));
      root.style.setProperty("--hero-turn", String(smooth(window.scrollY / Math.max(1, window.innerHeight))));
      const d = progress(depth);
      const spread = smooth(d / .48) * (1 - smooth((d - .68) / .32));
      root.style.setProperty("--spread", String(spread));
      if (footer) {
        const r = footer.getBoundingClientRect();
        root.style.setProperty("--gather", String(smooth((window.innerHeight - r.top) / Math.max(1, r.height * .75))));
      }
      if (current !== target) frame = requestAnimationFrame(render);
    }
    function schedule() { if (!frame && enabled && !document.hidden) { lastTime = 0; frame = requestAnimationFrame(render); } }
    function configure() {
      mobile = window.innerWidth <= 900;
      const largeText = parseFloat(getComputedStyle(document.documentElement).fontSize) > 20;
      root!.classList.toggle("has-large-text", largeText);
      enabled = !motion.matches && window.innerHeight >= (mobile ? 600 : 700) && !largeText;
      root!.classList.toggle("has-motion", enabled && !mobile);
      root!.classList.toggle("has-mobile-motion", enabled && mobile);
      if (!enabled) {
        cancelAnimationFrame(frame); frame = 0;
        for (const name of ["--assembly", "--settle", "--hero-turn", "--spread", "--gather"]) root!.style.removeProperty(name);
      } else { current = progress(assembly); schedule(); }
    }
    function onVisibilityChange() {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; lastTime = 0; }
      else configure();
    }
    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("resize", configure);
    motion.addEventListener("change", configure);
    const observer = new ResizeObserver(configure);
    observer.observe(document.documentElement);
    configure();
    // Fragment targets remain aligned after sticky enhancement changes document height.
    const hash = window.location.hash;
    if (hash) { try { document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView(); } catch { /* Ignore malformed URL fragments. */ } schedule(); }
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", configure);
      motion.removeEventListener("change", configure);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      observer.disconnect();
      root.classList.remove("has-motion", "has-mobile-motion", "has-large-text");
    };
  }, []);
  return <div className="tool-experience" ref={ref}>{children}</div>;
}
