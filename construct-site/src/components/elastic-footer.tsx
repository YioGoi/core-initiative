"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Particle = { x: number; y: number; depth: number; phase: number; radius: number };
const clamp = (value: number, low: number, high: number) => Math.max(low, Math.min(high, value));

export function ElasticFooter({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d", { alpha: true });
    if (!root || !canvas || !context) return;
    const surface = root.querySelector<HTMLElement>(".elastic-footer-surface")!;
    const membrane = root.querySelector<SVGSVGElement>(".footer-membrane")!;
    const membranePath = membrane.querySelector("path")!;
    const field = root.querySelector<HTMLElement>(".footer-universe")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const page = document.documentElement;
    let width = 1, height = 1, maxPull = 240;
    let position = 0, velocity = 0, target = 0, distance = 0;
    let anchor = .5, anchorTarget = .5;
    let frame = 0, previousTime = 0, releaseTimer = 0, automaticTimer = 0;
    let automaticReveal = false, bottomSeen = false, automaticReveals = 0;
    let touchY: number | null = null;
    let particles: Particle[] = [];

    const atEnd = () => window.scrollY + window.innerHeight >= page.scrollHeight - 3;
    const resistance = (value: number) => maxPull * (1 - Math.exp(-value / (maxPull * 1.15)));
    const editable = (node: EventTarget | null) => node instanceof Element && !!node.closest("input,textarea,select,[contenteditable]:not([contenteditable=false])");

    // Seeded positions remain stable between pulls and viewport measurements.
    function makeParticles() {
      let seed = 713;
      const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
      particles = Array.from({ length: clamp(Math.round(width * height / 1550), 110, 300) }, () => ({
        x: random() * 2 - 1, y: random() * 2 - 1,
        depth: .35 + random() * .85, phase: random() * Math.PI * 2, radius: .45 + random() * 1.2,
      }));
    }

    function drawParticles(time: number, pull: number) {
      context!.clearRect(0, 0, width, height);
      const seconds = time / 1000;
      for (const particle of particles) {
        const depth = particle.depth;
        const x = width / 2 + particle.x * width * .61 / depth
          + Math.sin(seconds * .13 + particle.phase) * 13 / depth
          + (anchor - .5) * 24 * depth;
        const y = height * .53 + particle.y * height * .61 / depth
          + Math.cos(seconds * .11 + particle.phase) * 10 / depth - pull * depth * .035;
        if (x < -4 || x > width + 4 || y < -4 || y > height + 4) continue;
        const alpha = .22 + depth * .36 + Math.sin(seconds * .36 + particle.phase) * .065;
        context!.beginPath();
        context!.fillStyle = `rgba(186,210,247,${alpha})`;
        context!.arc(x, y, particle.radius * (.65 + depth * .35), 0, Math.PI * 2);
        context!.fill();
      }
    }

    function paint(time: number) {
      const pull = Math.max(0, position);
      surface.style.transform = pull > .05 ? `translate3d(0,${-pull}px,0)` : "";
      const lip = Math.min(48, pull * .24);
      membrane.style.height = `${lip}px`;
      const center = anchor * 1000;
      membranePath.setAttribute("d", `M0 0 H1000 C${(1000 + center) / 2} 0 ${center + 170} 100 ${center} 100 C${center - 170} 100 ${center / 2} 0 0 0 Z`);
      root!.dataset.active = String(pull > .2 || target > 0);
      root!.dataset.pull = pull.toFixed(2);
      if (pull > .2) drawParticles(time, pull);
    }

    function animate(time: number) {
      frame = 0;
      if (reduced.matches || document.hidden) { reset(); return; }
      const dt = Math.min((time - previousTime) / 1000, 1 / 30);
      previousTime = time;
      // A firmer release produces a short, damped rebound rather than a slow collapse.
      const stiffness = target === 0 ? 330 : 240;
      const damping = target === 0 ? 23 : 29;
      velocity += ((target - position) * stiffness - velocity * damping) * dt;
      position += velocity * dt;
      anchor += (anchorTarget - anchor) * Math.min(1, dt * 9);
      if (target === 0 && Math.abs(position) < .08 && Math.abs(velocity) < .8) {
        position = 0;
        velocity = 0;
        root!.dataset.phase = "idle";
      }
      paint(time);
      if (target !== 0 || position !== 0 || velocity !== 0) frame = requestAnimationFrame(animate);
    }

    function requestFrame() {
      if (!frame && !document.hidden && !reduced.matches) {
        previousTime = performance.now();
        frame = requestAnimationFrame(animate);
      }
    }

    function release() {
      window.clearTimeout(releaseTimer);
      if (automaticReveal && atEnd()) return;
      target = 0;
      distance = 0;
      if (position !== 0 || velocity !== 0) {
        root!.dataset.phase = "settling";
        requestFrame();
      }
    }

    function cancelAutomaticReveal() {
      window.clearTimeout(automaticTimer);
      automaticTimer = 0;
      automaticReveal = false;
    }

    function releaseImmediately() {
      cancelAutomaticReveal();
      release();
    }

    function revealOnArrival() {
      if (automaticReveal || reduced.matches || document.hidden) return;
      window.clearTimeout(releaseTimer);
      automaticReveal = true;
      target = maxPull * .82;
      distance = -maxPull * 1.15 * Math.log(1 - .82);
      anchorTarget = .5;
      root!.dataset.phase = "auto-reveal";
      root!.dataset.autoReveals = String(++automaticReveals);
      requestFrame();
      automaticTimer = window.setTimeout(() => {
        cancelAutomaticReveal();
        release();
      }, 1100);
    }

    function reset() {
      cancelAutomaticReveal();
      cancelAnimationFrame(frame);
      window.clearTimeout(releaseTimer);
      frame = 0;
      position = velocity = target = distance = 0;
      touchY = null;
      root!.dataset.phase = "idle";
      paint(performance.now());
      context!.clearRect(0, 0, width, height);
    }

    function pullBy(amount: number, x: number) {
      window.clearTimeout(releaseTimer);
      distance = clamp(distance + amount, 0, maxPull * 4);
      target = resistance(distance);
      anchorTarget = clamp(x / Math.max(1, window.innerWidth), .15, .85);
      root!.dataset.phase = "pulling";
      requestFrame();
    }

    function nestedCanScroll(node: EventTarget | null, delta: number) {
      let element = node instanceof Element ? node : null;
      while (element && element !== document.body && element !== page) {
        if (element instanceof HTMLElement && element.scrollHeight > element.clientHeight + 1
          && /auto|scroll/.test(getComputedStyle(element).overflowY)
          && element.scrollTop < element.scrollHeight - element.clientHeight - 1 && delta > 0) return true;
        element = element.parentElement;
      }
      return false;
    }

    function wheel(event: WheelEvent) {
      if (event.ctrlKey || event.metaKey || reduced.matches || editable(event.target)) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (event.deltaY <= 0 || !atEnd()) { releaseImmediately(); return; }
      if (!event.cancelable || nestedCanScroll(event.target, event.deltaY)) return;
      event.preventDefault();
      const units = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
      pullBy(event.deltaY * units * .6, event.clientX);
      // Trackpads deliver momentum events; settle after the gesture stream goes quiet.
      releaseTimer = window.setTimeout(release, 115);
    }

    function touchStart(event: TouchEvent) {
      if (event.touches.length !== 1 || reduced.matches || editable(event.target)) { touchY = null; release(); return; }
      touchY = event.touches[0].clientY;
    }

    function touchMove(event: TouchEvent) {
      if (touchY === null || event.touches.length !== 1 || reduced.matches) return;
      const touch = event.touches[0];
      const delta = touchY - touch.clientY;
      touchY = touch.clientY;
      if (delta <= 0 || !atEnd()) { releaseImmediately(); return; }
      if (!event.cancelable || nestedCanScroll(event.target, delta)) return;
      event.preventDefault();
      pullBy(delta * 1.15, touch.clientX);
    }

    function touchEnd() { touchY = null; release(); }

    function keyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey
        || reduced.matches || editable(event.target)) return;
      if (event.target instanceof Element && event.target.closest("button,summary")) return;
      if (event.key === "ArrowUp" || event.key === "PageUp" || event.key === "Home") { releaseImmediately(); return; }
      if (!["ArrowDown", "PageDown", " "].includes(event.key) || !atEnd()) return;
      event.preventDefault();
      pullBy(event.key === "ArrowDown" ? 85 : 250, window.innerWidth / 2);
    }

    function keyUp(event: KeyboardEvent) { if (["ArrowDown", "PageDown", " "].includes(event.key)) release(); }

    function syncBoundary() {
      // Suppress native bottom rubber-banding only where our custom gesture takes over.
      const end = atEnd();
      page.classList.toggle("footer-overscroll-boundary", end && !reduced.matches);
      if (!end) {
        releaseImmediately();
        // Rearm only after leaving the edge by a meaningful distance.
        if (page.scrollHeight - window.innerHeight - window.scrollY > 100) bottomSeen = false;
      } else if (!bottomSeen && !reduced.matches && !document.hidden) {
        bottomSeen = true;
        revealOnArrival();
      }
    }

    function measure() {
      const bounds = field.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      maxPull = Math.min(280, window.innerHeight * .32);
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * ratio);
      canvas!.height = Math.round(height * ratio);
      context!.setTransform(ratio, 0, 0, ratio, 0, 0);
      makeParticles();
      if (reduced.matches) reset();
      else paint(performance.now());
      syncBoundary();
    }

    function visibility() { if (document.hidden) reset(); else syncBoundary(); }
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    window.addEventListener("wheel", wheel, { passive: false });
    window.addEventListener("touchstart", touchStart, { passive: true });
    window.addEventListener("touchmove", touchMove, { passive: false });
    window.addEventListener("touchend", touchEnd, { passive: true });
    window.addEventListener("touchcancel", touchEnd, { passive: true });
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);
    window.addEventListener("scroll", syncBoundary, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    window.addEventListener("blur", releaseImmediately);
    document.addEventListener("visibilitychange", visibility);
    reduced.addEventListener("change", measure);
    measure();
    return () => {
      reset();
      observer.disconnect();
      page.classList.remove("footer-overscroll-boundary");
      window.removeEventListener("wheel", wheel);
      window.removeEventListener("touchstart", touchStart);
      window.removeEventListener("touchmove", touchMove);
      window.removeEventListener("touchend", touchEnd);
      window.removeEventListener("touchcancel", touchEnd);
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      window.removeEventListener("scroll", syncBoundary);
      window.removeEventListener("resize", measure);
      window.removeEventListener("blur", releaseImmediately);
      document.removeEventListener("visibilitychange", visibility);
      reduced.removeEventListener("change", measure);
    };
  }, []);

  return <div className="elastic-footer" ref={rootRef} data-phase="idle" data-pull="0" data-active="false" data-auto-reveals="0">
    <div className="footer-universe" aria-hidden="true"><canvas ref={canvasRef} /></div>
    <div className="elastic-footer-surface">
      {children}
      <svg className="footer-membrane" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true"><path /></svg>
    </div>
  </div>;
}
