"use client";

import { useEffect, useRef, type ReactNode } from "react";

const clamp = (n: number) => Math.max(0, Math.min(1, n));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const segment = (p: number, a: number, b: number) => { const n = clamp((p - a) / (b - a)); return n * n * n * (n * (n * 6 - 15) + 10); };
const color = (a: number[], b: number[], t: number) => `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], t))).join(",")})`;
const poses = [[-220, -140, -170, -24], [165, -120, 90, 17], [-60, 170, -15, -8], [230, 135, -200, 22], [-210, 50, 110, -15], [100, 210, -120, 12]];
const paper = [238, 241, 244], dark = [21, 43, 69];

export function ScrollExperience({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const current = ref.current;
    if (!current) return;
    const root: HTMLDivElement = current;
    const element = <T extends Element = HTMLElement,>(selector: string) => root.querySelector<T>(selector)!;
    const first = element<HTMLElement>(".unfold-sequence"), second = element<HTMLElement>(".family-sequence");
    const stage1 = element<HTMLElement>(".stage-one"), stage2 = element<HTMLElement>(".stage-two");
    const world = element<HTMLElement>(".world"), front = element<HTMLElement>(".plane-front");
    const planes = [...root.querySelectorAll<HTMLElement>(".plane:not(.plane-front)")];
    const caption1 = element<HTMLElement>(".stage-caption"), label1 = element<HTMLElement>(".stage-one .stage-label");
    const handoff = element<HTMLElement>(".handoff-copy"), floor = element<HTMLElement>(".floor");
    const assembly = element<HTMLElement>(".assembly"), mark = element<HTMLElement>(".final-mark");
    const pieces = [...root.querySelectorAll<HTMLElement>(".piece")];
    const seed = element<SVGSVGElement>(".stage-two .seed"), circles = [...seed.querySelectorAll("circle")];
    const caption2 = element<HTMLElement>(".family-caption"), label2 = element<HTMLElement>(".stage-two .stage-label");
    const familyName = element<HTMLElement>(".family-name"), heroSquare = element<HTMLElement>(".hero-square");
    const progress = element<HTMLElement>(".reading-progress");
    const tracks = [...root.querySelectorAll<HTMLElement>(".stage-track span")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, resizeFrame = 0, current1 = 0, current2 = 0;
    let metrics = { start1: 0, length1: 1, start2: 0, length2: 1, edge: 200, width: 1000, height: 800, seedWidth: 600, assemblySize: 160, darkStart: 0, end: 1 };

    function drawFirst(p: number) {
      const opening = segment(p, .12, .49), orbit = segment(p, .23, .68);
      const flatten = segment(p, .65, .83), expansion = segment(p, .75, .96), remaining = 1 - flatten;
      world.style.transform = `rotateX(${53 * opening * remaining}deg) rotateY(${-22 * opening * remaining}deg) rotateZ(${-28 * orbit * remaining}deg)`;
      planes.forEach((plane, i) => {
        plane.style.transform = `translate3d(${(i - 2) * metrics.edge * .13 * opening * remaining}px,${(i - 2) * metrics.edge * .055 * opening * remaining}px,${(i - 2) * metrics.edge * .44 * opening * remaining}px)`;
        plane.style.opacity = String(1 - segment(p, .64, .77));
      });
      const full = Math.hypot(metrics.width, metrics.height) / metrics.edge * 1.25;
      front.style.transform = `translateZ(${metrics.edge * .74 * opening * remaining}px) scale(${lerp(1, full, expansion)})`;
      front.style.background = color(paper, dark, segment(p, .72, .87));
      front.style.borderColor = color([61, 101, 233], dark, expansion);
      front.classList.toggle("is-expanding", p > .72);
      const fade = segment(p, .58, .74);
      caption1.style.opacity = String(1 - fade); caption1.style.transform = `translateY(${-22 * fade}px)`;
      label1.style.opacity = String(1 - fade); floor.style.opacity = String(1 - expansion);
      const enter = segment(p, .87, .98);
      handoff.style.opacity = String(enter); handoff.style.transform = `translateY(${20 * (1 - enter)}px)`;
      tracks[0].style.transform = `scaleX(${p})`;
      stage1.dataset.progress = p.toFixed(4);
    }
    function drawSecond(p: number) {
      const merge = segment(p, .12, .58), connect = segment(p, .62, .94), daylight = segment(p, .69, .91);
      const spread = metrics.width < 761 ? .64 : 1;
      assembly.style.transform = `rotateY(${lerp(-9, 0, merge)}deg) rotateX(${lerp(13, 0, merge)}deg)`;
      pieces.forEach((piece, i) => {
        const [x, y, z, rotation] = poses[i];
        piece.style.transform = `translate3d(${x * (1 - merge) * spread}px,${y * (1 - merge) * spread}px,${z * (1 - merge)}px) rotateZ(${rotation * (1 - merge)}deg)`;
        piece.style.opacity = String(lerp(.55, .9, merge) * (1 - segment(p, .48, .65)));
      });
      const ratio = metrics.seedWidth / 600;
      mark.style.opacity = String(segment(p, .43, .6));
      mark.style.transform = `translate(${97 * ratio * connect}px,${-56 * ratio * connect}px) scale(${lerp(1, 40 * ratio / metrics.assemblySize, connect)})`;
      seed.style.opacity = String(segment(p, .62, .75));
      circles.forEach((circle, i) => { const reveal = segment(p, .64 + i * .022, .84 + i * .022); circle.style.strokeDasharray = reveal >= .999 ? "none" : "1"; circle.style.strokeDashoffset = String(1 - reveal); });
      stage2.style.background = color(dark, paper, daylight);
      caption2.style.color = color([237, 242, 248], [23, 44, 68], daylight);
      label2.style.color = color([169, 190, 215], [82, 102, 124], daylight);
      familyName.style.opacity = String(segment(p, .87, .98));
      tracks[1].style.transform = `scaleX(${p})`;
      stage2.dataset.progress = p.toFixed(4);
    }
    function request() { if (!frame) frame = requestAnimationFrame(tick); }
    function tick() {
      frame = 0;
      const y = window.scrollY;
      const target1 = reduce.matches ? .46 : clamp((y - metrics.start1) / metrics.length1);
      const target2 = reduce.matches ? 1 : clamp((y - metrics.start2) / metrics.length2);
      const old1 = current1, old2 = current2;
      current1 = reduce.matches || Math.abs(target1 - current1) < .00015 ? target1 : lerp(current1, target1, .21);
      current2 = reduce.matches || Math.abs(target2 - current2) < .00015 ? target2 : lerp(current2, target2, .21);
      if (old1 !== current1 || stage1.dataset.progress === undefined) drawFirst(current1);
      if (old2 !== current2 || stage2.dataset.progress === undefined) drawSecond(current2);
      const intro = reduce.matches ? 0 : clamp(y / metrics.height);
      heroSquare.style.transform = `translate3d(0,${-38 * intro}px,0) rotate(${lerp(-8, 2, intro)}deg)`;
      progress.style.transform = `scaleX(${clamp(y / metrics.end)})`;
      const isDark = reduce.matches ? y > metrics.darkStart - 80 && y < metrics.start2 - 80 : y > metrics.start1 + metrics.length1 * .89 && y < metrics.start2 + metrics.length2 * .83;
      root.style.setProperty("--header-ink", isDark ? "#e9f0f8" : "#172c44");
      root.style.setProperty("--header-bg", isDark ? "rgba(21,43,69,.88)" : "rgba(238,241,244,.88)");
      if (Math.abs(target1 - current1) > .00015 || Math.abs(target2 - current2) > .00015) request();
    }
    function measure() {
      resizeFrame = 0;
      root.classList.toggle("has-motion", !reduce.matches);
      const y = window.scrollY;
      metrics = { start1: first.getBoundingClientRect().top + y, length1: Math.max(1, first.offsetHeight - stage1.offsetHeight), start2: second.getBoundingClientRect().top + y, length2: Math.max(1, second.offsetHeight - stage2.offsetHeight), edge: world.offsetWidth, width: window.innerWidth, height: stage1.offsetHeight, seedWidth: seed.getBoundingClientRect().width, assemblySize: assembly.offsetWidth, darkStart: element<HTMLElement>(".dark-world").getBoundingClientRect().top + y, end: Math.max(1, document.documentElement.scrollHeight - window.innerHeight) };
      drawFirst(reduce.matches ? .46 : current1); drawSecond(reduce.matches ? 1 : current2);
      request();
    }
    function resize() { if (!resizeFrame) resizeFrame = requestAnimationFrame(measure); }
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    reduce.addEventListener("change", measure);
    measure();
    return () => { cancelAnimationFrame(frame); cancelAnimationFrame(resizeFrame); observer.disconnect(); window.removeEventListener("scroll", request); window.removeEventListener("resize", resize); reduce.removeEventListener("change", measure); root.classList.remove("has-motion"); };
  }, []);
  return <div className="construct-experience" ref={ref}>{children}</div>;
}
