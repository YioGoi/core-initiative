"use client";

import { useEffect } from "react";

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const segment = (n: number, from: number, to: number) => clamp((n - from) / (to - from));
const smooth = (n: number) => n * n * (3 - 2 * n);
const smoother = (n: number) => n * n * n * (n * (n * 6 - 15) + 10);

export function ScrollExperience() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const identity = document.querySelector<HTMLElement>('[data-scene="identity"]');
    const digital = document.querySelector<HTMLElement>('[data-scene="digital"]');
    if (!identity || !digital) return;
    const panels = Array.from(identity.querySelectorAll<HTMLElement>(".identity-panel"));
    const boards = identity.querySelector<HTMLElement>(".identity-panels");
    const photograph = identity.querySelector<HTMLImageElement>(".picture-panel > img");
    const ink = digital.querySelector<HTMLElement>(".ink-field");
    const browser = digital.querySelector<HTMLElement>(".prototype-composition");
    const component = digital.querySelector<HTMLElement>(".floating-component");
    let frame = 0;
    let enabled = false;
    let identityTop = 0;
    let digitalTop = 0;
    let identityLength = 1;
    let digitalLength = 1;
    let cardWidth = 1;
    let identityProgress = 0;
    let previousTime = 0;
    let headingTop = 45;
    let captionTop = 0;

    function draw(time: number) {
      frame = 0;
      if (!enabled) return;
      const y = window.scrollY;
      const target = clamp((y - identityTop) / identityLength);
      const elapsed = previousTime ? Math.min(64, time - previousTime) : 16.67;
      const visible = y > identityTop - innerHeight && y < identityTop + identityLength + innerHeight;
      const difference = target - identityProgress;
      identityProgress = visible && Math.abs(difference) > .0001
        ? identityProgress + difference * (1 - Math.exp(-elapsed / 75))
        : target;
      previousTime = time;
      const p = identityProgress;
      const lift = smoother(segment(p, .015, .25));
      const settle = smoother(segment(p, .73, .96));

      panels.forEach((panel, i) => {
        const direction = i - 1;
        const opening = smoother(segment(p, i === 2 ? .16 : .09, i === 2 ? .81 : .74));
        const arc = Math.sin(opening * Math.PI);
        const x = direction * cardWidth * (.055 + opening * 1.045);
        const y = i === 1 ? -lift * 13 - Math.sin(p * Math.PI) * 5 : 12 - arc * 33 + opening * 3;
        const z = i === 1
          ? 32 + lift * 44 - settle * 50
          : -100 + lift * 40 + opening * 40 + arc * 25;
        const rotateX = i === 1 ? 5 - lift * 9 + settle * 5 : 9 - opening * 6 - arc * 5;
        const rotateY = i === 1 ? -4 + lift * 7 - settle * 3 : -direction * (11 + arc * 9 - settle * 5);
        const rotateZ = direction * (6 + arc * 8 + opening * 2 - settle * 2);
        panel.style.transform = `translate(-50%, -50%) translate3d(${x}px,${y}px,${z}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
      });
      if (photograph) {
        const drift = smoother(segment(p, .05, .92));
        photograph.style.transform = `translate3d(${(drift - .5) * cardWidth * .065}px,${Math.sin(drift * Math.PI) * -cardWidth * .025}px,0) scale(1.12)`;
      }
      boards?.style.setProperty("--floor-scale", String(.65 + smoother(segment(p, .1, .85)) * 1.05));
      boards?.style.setProperty("--floor-opacity", String(.16 - lift * .055 + settle * .025));
      identity!.style.setProperty("--outcome", String(smooth(segment(p, .66, .91))));

      const d = clamp((y - digitalTop) / digitalLength);
      const bloom = smooth(segment(d, .02, .44));
      const arrival = smooth(segment(d, .2, .7));
      const finish = smooth(segment(d, .68, .94));
      if (ink) ink.style.transform = `translate(-50%,-50%) scale(${.4 + bloom * 12}) rotate(${bloom * 25}deg)`;
      if (browser) {
        browser.style.transform = `translate3d(0,${(1 - arrival) * 100}px,0) scale(${.58 + arrival * .42}) rotate(${(1 - arrival) * -8}deg)`;
        browser.style.opacity = String(segment(d, .17, .35));
      }
      if (component) {
        component.style.transform = `translate3d(${(1 - finish) * 80}px,${(1 - finish) * 25}px,0) rotate(${7 - finish * 5}deg)`;
        component.style.opacity = String(segment(d, .65, .83));
      }
      // Clip the light text to the same circle as the ink, preserving contrast throughout the reveal.
      const radius = Math.min(innerWidth, innerHeight) * .15 * (.4 + bloom * 12);
      digital!.style.setProperty("--heading-clip", `circle(${radius}px at ${innerWidth / 2}px ${innerHeight / 2 - headingTop}px)`);
      digital!.style.setProperty("--caption-clip", `circle(${radius}px at ${innerWidth / 2}px ${innerHeight / 2 - captionTop}px)`);
      if (Math.abs(target - identityProgress) > .0001) frame = requestAnimationFrame(draw);
      else previousTime = 0;
    }

    function requestDraw() { if (!frame && enabled && !document.hidden) frame = requestAnimationFrame(draw); }
    function measure() {
      enabled = !reduced.matches && innerWidth >= 761 && innerHeight >= 700 && parseFloat(getComputedStyle(root).fontSize) <= 20;
      root.classList.toggle("motion-on", enabled);
      root.classList.toggle("large-text", parseFloat(getComputedStyle(root).fontSize) > 20);
      cancelAnimationFrame(frame);
      frame = 0;
      previousTime = 0;
      identityTop = identity!.getBoundingClientRect().top + scrollY;
      digitalTop = digital!.getBoundingClientRect().top + scrollY;
      identityLength = Math.max(1, identity!.offsetHeight - innerHeight);
      digitalLength = Math.max(1, digital!.offsetHeight - innerHeight);
      cardWidth = panels[0]?.offsetWidth || 1;
      headingTop = digital!.querySelector<HTMLElement>(".scene-heading")?.offsetTop || 45;
      captionTop = digital!.querySelector<HTMLElement>(".scene-caption")?.offsetTop || 0;
      identityProgress = clamp((scrollY - identityTop) / identityLength);
      if (!enabled) {
        panels.forEach((panel) => panel.style.removeProperty("transform"));
        photograph?.style.removeProperty("transform");
        boards?.style.removeProperty("--floor-scale");
        boards?.style.removeProperty("--floor-opacity");
        [ink, browser, component].forEach((node) => node?.removeAttribute("style"));
        identity!.style.removeProperty("--outcome");
        digital!.style.removeProperty("--heading-clip");
        digital!.style.removeProperty("--caption-clip");
      }
      requestDraw();
    }
    function onVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        previousTime = 0;
      } else measure();
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("scroll", requestDraw, { passive: true });
    window.addEventListener("resize", measure);
    document.addEventListener("visibilitychange", onVisibilityChange);
    reduced.addEventListener("change", measure);
    const anchorFrame = requestAnimationFrame(() => {
      if (location.hash) {
        let id = location.hash.slice(1);
        try { id = decodeURIComponent(id); } catch { return; }
        const target = document.getElementById(id);
        target?.scrollIntoView({ behavior: "instant", block: "start" });
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(anchorFrame);
      observer.disconnect();
      window.removeEventListener("scroll", requestDraw);
      window.removeEventListener("resize", measure);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      reduced.removeEventListener("change", measure);
      root.classList.remove("motion-on", "large-text");
      [ink, browser, component].forEach((node) => node?.removeAttribute("style"));
      panels.forEach((panel) => panel.style.removeProperty("transform"));
      photograph?.style.removeProperty("transform");
      boards?.style.removeProperty("--floor-scale");
      boards?.style.removeProperty("--floor-opacity");
      identity!.style.removeProperty("--outcome");
      digital!.style.removeProperty("--heading-clip");
      digital!.style.removeProperty("--caption-clip");
    };
  }, []);
  return null;
}
