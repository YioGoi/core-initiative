"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import { Flower } from "./marks";

type Petal = { x: number; y: number; depth: number; phase: number; turn: number; tone: number };
type Phase = "wind" | "hold" | "flattening" | "closing" | "closed" | "opening";
const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (n: number) => n * n * (3 - 2 * n);
const mix = (a: number, b: number, p: number) => a + (b - a) * p;

export function FlowerFooter({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const edgeRef = useRef<SVGSVGElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current, field = fieldRef.current, stage = stageRef.current;
    const canvas = canvasRef.current, edge = edgeRef.current, atmosphere = atmosphereRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!root || !field || !stage || !canvas || !edge || !atmosphere || !ctx) return;
    const page = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const colours = ["#9d2945", "#6b293d", "#c16b81", "#dca5b0", "#fff9f1"];
    // Cache native vector flowers with transparent centres; the atmosphere stays visible through them.
    const sprites = colours.map((colour) => {
      const sprite = document.createElement("canvas");
      sprite.width = sprite.height = 100;
      const pen = sprite.getContext("2d")!;
      pen.translate(50, 50);
      pen.fillStyle = colour;
      for (let i = 0; i < 6; i++) {
        const angle = i * Math.PI / 3;
        pen.beginPath();
        pen.ellipse(Math.sin(angle) * 21, -Math.cos(angle) * 21, 13, 22, angle, 0, Math.PI * 2);
        pen.fill();
      }
      pen.globalCompositeOperation = "destination-out";
      pen.beginPath(); pen.arc(0, 0, 8, 0, Math.PI * 2); pen.fill();
      return sprite;
    });
    let width = 1, height = 1, position = 0, targetHeight = 0, velocity = 0;
    let frame = 0, previous = 0, elapsed = 0, windTime = 0, progress = 0, curve = 1;
    let enabled = false, visible = false, bottomSeen = false, pinBottom = false, closures = 0;
    let phase: Phase = "wind";
    let petals: Petal[] = [];
    const atBottom = () => page.scrollHeight - innerHeight - scrollY <= 3;

    function changePhase(next: Phase) {
      phase = next; elapsed = 0;
      root!.dataset.phase = next;
    }
    function stop() { cancelAnimationFrame(frame); frame = 0; previous = 0; }
    function schedule() {
      if (!frame && enabled && visible && !document.hidden && phase !== "closed") frame = requestAnimationFrame(draw);
    }
    function paintSection() {
      const open = Math.max(0, position);
      root!.style.setProperty("--wind-open", `${open}px`);
      edge!.style.height = `${Math.min(62, open * .23) * curve}px`;
      root!.dataset.openHeight = open.toFixed(2);
      root!.dataset.curve = curve.toFixed(3);
      // Only a closure already started at the native bottom keeps that edge in place.
      // An upward native scroll cancels this lock in syncScroll before the next frame.
      if (pinBottom && (phase === "flattening" || phase === "closing")) {
        const end = Math.max(0, page.scrollHeight - innerHeight);
        if (Math.abs(scrollY - end) > .5) scrollTo({ top: end, behavior: "instant" });
      }
    }
    function makePetals() {
      let seed = 419;
      const random = () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; };
      petals = Array.from({ length: Math.min(650, Math.max(220, Math.round(width * height / 650))) }, () => ({
        x: random(), y: random(), depth: .12 + random() * .88,
        phase: random() * Math.PI * 2, turn: random() * 2 - 1, tone: Math.floor(random() * colours.length),
      }));
      root!.dataset.flowers = String(petals.length);
    }
    function syncScroll() {
      const remaining = Math.max(0, page.scrollHeight - innerHeight - scrollY);
      const rect = root!.getBoundingClientRect();
      visible = rect.top < innerHeight + 40 && rect.bottom > -40;
      if (remaining > 18 && pinBottom) {
        pinBottom = false;
        targetHeight = height;
        changePhase("opening");
      }
      if (bottomSeen && remaining > 150) {
        bottomSeen = false;
        pinBottom = false;
        targetHeight = height;
        changePhase("opening");
        if (!visible) { position = height; velocity = 0; curve = 1; changePhase("wind"); paintSection(); }
      }
      if (enabled && atBottom() && !bottomSeen && !document.hidden) {
        bottomSeen = true;
        pinBottom = true;
        root!.dataset.closures = String(++closures);
        changePhase("hold");
      }
      if (!visible) stop(); else schedule();
    }
    function draw(time: number) {
      frame = 0;
      if (!enabled || !visible || document.hidden) { previous = 0; return; }
      const milliseconds = previous ? Math.min(33.33, time - previous) : 16.67;
      previous = time;
      elapsed += milliseconds;
      windTime += milliseconds / 1000;
      const remaining = Math.max(0, page.scrollHeight - innerHeight - scrollY);
      const travel = Math.max(250, height + (root!.querySelector("footer")?.offsetHeight || 200));
      progress += (clamp(1 - remaining / travel) - progress) * (1 - Math.exp(-milliseconds / 85));
      if (phase === "hold" && elapsed >= 1050) changePhase("flattening");
      if (phase === "flattening") {
        curve = 1 - smooth(clamp(elapsed / 240));
        if (elapsed >= 240) { curve = 0; targetHeight = 0; changePhase("closing"); }
      } else if (phase === "wind" || phase === "opening" || phase === "hold") {
        curve += (1 - curve) * (1 - Math.exp(-milliseconds / 100));
      }
      const dt = milliseconds / 1000;
      const stiffness = targetHeight === 0 ? 330 : 240;
      const damping = targetHeight === 0 ? 23 : 29;
      velocity += ((targetHeight - position) * stiffness - velocity * damping) * dt;
      position += velocity * dt;
      if (Math.abs(targetHeight - position) < .08 && Math.abs(velocity) < .8) {
        position = targetHeight; velocity = 0;
        if (phase === "closing") { changePhase("closed"); pinBottom = false; }
        if (phase === "opening") changePhase("wind");
      }
      paintSection();
      ctx!.clearRect(0, 0, width, height);
      if (phase === "closed") { previous = 0; return; }
      atmosphere!.style.transform = `translate3d(${Math.sin(windTime * .08) * 7}px,${(progress - .5) * -12}px,0) scale(1.03)`;
      const shrink = smooth(progress);
      for (const petal of petals) {
        const x = (petal.x * (width + 100) + windTime * (5 + petal.depth * 16)) % (width + 100) - 50
          + Math.sin(windTime * .3 + petal.phase) * (4 + petal.depth * 9);
        const y = height * (.08 + petal.y * .84) + Math.sin(windTime * .45 + petal.phase) * (3 + petal.depth * 11)
          + (progress - .5) * (petal.depth - .5) * 20;
        const size = mix(3 + petal.depth * petal.depth * 17, 1.5 + petal.depth * 5.5, shrink);
        ctx!.save();
        ctx!.translate(x, y);
        ctx!.rotate(petal.phase + windTime * petal.turn * .25);
        ctx!.globalAlpha = .18 + petal.depth * .58;
        ctx!.drawImage(sprites[petal.tone], -size / 2, -size / 2, size, size);
        ctx!.restore();
      }
      schedule();
    }
    function measure() {
      const shouldEnable = !reduced.matches && parseFloat(getComputedStyle(page).fontSize) <= 20;
      root!.dataset.ready = String(shouldEnable);
      if (!shouldEnable) {
        stop(); enabled = false; pinBottom = false; bottomSeen = false;
        root!.style.removeProperty("--wind-open");
        edge!.style.height = "";
        atmosphere!.style.transform = "";
        ctx!.clearRect(0, 0, width, height);
        changePhase("wind");
        return;
      }
      const nextWidth = Math.max(1, stage!.clientWidth);
      const nextHeight = Math.max(1, stage!.clientHeight);
      if (!enabled || nextWidth !== width || nextHeight !== height) {
        const fraction = enabled ? position / height : 1;
        width = nextWidth; height = nextHeight;
        position = height * fraction;
        targetHeight = phase === "closed" || phase === "closing" ? 0 : height;
        const ratio = Math.min(devicePixelRatio || 1, 1.75);
        canvas!.width = Math.round(width * ratio); canvas!.height = Math.round(height * ratio);
        ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
        makePetals();
      }
      enabled = true;
      paintSection();
      syncScroll();
    }
    function visibility() { if (document.hidden) stop(); else measure(); }
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    const footer = root.querySelector("footer");
    if (footer) observer.observe(footer);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule(); else stop();
    }, { rootMargin: "40px 0px" });
    intersection.observe(root);
    window.addEventListener("scroll", syncScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", measure);
    measure();
    return () => {
      stop(); observer.disconnect(); intersection.disconnect();
      window.removeEventListener("scroll", syncScroll);
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", measure);
      root.style.removeProperty("--wind-open");
      edge.style.height = "";
      atmosphere.style.transform = "";
    };
  }, []);

  return <div className="flower-footer" ref={rootRef} data-ready="false" data-phase="wind" data-closures="0">
    <div className="footer-wind" ref={fieldRef} aria-hidden="true">
      <div className="footer-wind-stage" ref={stageRef}>
        <div className="footer-wind-atmosphere" ref={atmosphereRef}><Image src="/images/cookie-atmosphere.png" alt="" fill sizes="100vw" /></div>
        <div className="footer-wind-haze" />
        <div className="footer-wind-fallback"><Flower /><Flower /><Flower /></div>
        <canvas ref={canvasRef} />
      </div>
      <svg className="footer-wind-edge" ref={edgeRef} viewBox="0 0 1000 100" preserveAspectRatio="none"><path d="M0 0 C250 0 330 100 500 100 C670 100 750 0 1000 0 V100 H0 Z" /></svg>
    </div>
    {children}
  </div>;
}
