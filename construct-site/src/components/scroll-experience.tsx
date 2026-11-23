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
    const caption2 = element<HTMLElement>(".family-caption"), label2 = element<HTMLElement>(".connection-label");
    const room = element<HTMLElement>(".sonic-depth"), roomPhoto = element<HTMLElement>(".chamber-photograph");
    const product = element<HTMLElement>(".sonic-product"), shop = element<HTMLElement>(".instrument-shop");
    const soundCaption = element<HTMLElement>(".sonic-caption"), soundLabel = element<HTMLElement>(".sound-label");
    const depthFrames = [...root.querySelectorAll<HTMLElement>(".depth-frame")];
    const familyName = element<HTMLElement>(".family-name"), heroSquare = element<HTMLElement>(".hero-square");
    const progress = element<HTMLElement>(".reading-progress");
    const tracks = [...root.querySelectorAll<HTMLElement>(".stage-track span")];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let motionEnabled = false;
    let frame = 0, resizeFrame = 0, current1 = 0, current2 = 0;
    let metrics = { start1: 0, length1: 1, start2: 0, length2: 1, edge: 200, width: 1000, height: 800, seedWidth: 600, assemblySize: 160, roomSize: 800, height2: 800, productCenter: 59, productTop: 42, darkStart: 0, end: 1 };

    function drawFirst(p: number) {
      const opening = segment(p, .06, .39), orbit = segment(p, .26, .62);
      const flatten = segment(p, .66, .84), expansion = segment(p, .76, .96), remaining = 1 - flatten;
      world.style.transform = `rotateX(${lerp(12, 20, orbit) * opening * remaining}deg) rotateY(${lerp(-22, -10, orbit) * opening * remaining}deg) rotateZ(${-7 * orbit * remaining}deg)`;
      const offsets = [[-.62, -.20, -.46, -5, 1.08], [-.38, .24, -.12, -9, .72], [.12, -.04, .20, 2, 1], [.62, .17, .52, 8, .76]];
      planes.forEach((plane, i) => {
        const [x, y, z, rotation, scale] = offsets[i];
        plane.style.transform = `translate3d(${x * metrics.edge * opening * remaining}px,${y * metrics.edge * opening * remaining}px,${z * metrics.edge * opening * remaining}px) rotateZ(${rotation * opening * remaining}deg) scale(${lerp(1, scale, opening)})`;
        plane.style.opacity = String(segment(p, .025 + i * .025, .15 + i * .025) * (1 - segment(p, .69, .82)));
      });
      const full = Math.hypot(metrics.width, metrics.height) / metrics.edge * 2;
      front.style.transform = `translateZ(${metrics.edge * .35 * opening * remaining}px) scale(${lerp(1, full, expansion)})`;
      front.style.background = `rgba(21,43,69,${segment(p, .71, .82)})`;
      front.style.borderColor = color([61, 101, 233], dark, expansion);
      front.classList.toggle("is-expanding", p > .70);
      front.style.setProperty("--corner-opacity", String(1 - segment(p, .09, .28)));
      const fade = segment(p, .58, .74);
      caption1.style.opacity = String(1 - fade); caption1.style.transform = `translateY(${-22 * fade}px)`;
      label1.style.opacity = String(1 - fade); floor.style.opacity = String(1 - expansion);
      const enter = segment(p, .87, .98);
      handoff.style.opacity = String(enter); handoff.style.transform = `translateY(${20 * (1 - enter)}px)`;
      tracks[0].style.transform = `scaleX(${p})`;
      stage1.dataset.progress = p.toFixed(4);
    }
    function drawSecond(p: number) {
      const opening = segment(p, .03, .24), travel = segment(p, .17, .53), collapse = segment(p, .55, .75);
      const roomCollapse = segment(p, .48, .84);
      const merge = segment(p, .58, .75), connect = segment(p, .78, .97), daylight = segment(p, .78, .95);
      const mobile = metrics.width < 761;
      const fullRoom = Math.max(metrics.width, metrics.height2) / metrics.roomSize * 1.18;
      room.style.transform = `scale(${lerp(.42, fullRoom, opening) * lerp(1, .015, roomCollapse)}) rotate(${lerp(-5, 0, opening)}deg)`;
      room.style.opacity = String(1 - segment(p, .79, .87));
      roomPhoto.style.transform = `scale(${lerp(1.06, 1.4, travel)}) translate3d(${-2 * travel}%,${2 * travel}%,0)`;
      depthFrames.forEach((frame, i) => {
        frame.style.transform = `translate3d(${14 * travel * (i % 2 ? -1 : 1)}px,${-12 * travel}px,${-100 - i * 190 + 480 * travel}px)`;
        frame.style.opacity = String((.26 - i * .025) * opening);
      });
      product.style.left = `${lerp(metrics.productCenter, 50, collapse)}%`;
      product.style.top = `${lerp(metrics.productTop, 44, collapse)}%`;
      product.style.transform = `translate3d(${lerp(-28, 25, travel) * (mobile ? .45 : 1) * (1 - collapse)}px,${-18 * travel * (1 - collapse)}px,0) rotate(${lerp(-8, 4, travel) * (1 - collapse)}deg) scale(${lerp(.68, 1, opening) * lerp(1, .08, collapse)})`;
      product.style.opacity = String(1 - segment(p, .66, .74));
      const shopEnter = segment(p, .21, .39);
      shop.style.opacity = String(shopEnter);
      shop.style.transform = `translate3d(${30 * (1 - shopEnter)}px,${20 * (1 - shopEnter)}px,0)`;
      const soundExit = segment(p, .57, .68);
      soundCaption.style.opacity = String(1 - soundExit);
      soundCaption.style.transform = `translateY(${-18 * soundExit}px)`;
      soundLabel.style.opacity = String(1 - soundExit);
      const spread = mobile ? .64 : 1;
      assembly.style.transform = `rotateY(${lerp(-9, 0, merge)}deg) rotateX(${lerp(13, 0, merge)}deg)`;
      pieces.forEach((piece, i) => {
        const [x, y, z, rotation] = poses[i];
        piece.style.transform = `translate3d(${x * (1 - merge) * spread}px,${y * (1 - merge) * spread}px,${z * (1 - merge)}px) rotateZ(${rotation * (1 - merge)}deg)`;
        piece.style.opacity = String(segment(p, .58, .65) * (1 - segment(p, .70, .78)) * .65);
      });
      const ratio = metrics.seedWidth / 600;
      mark.style.opacity = String(segment(p, .69, .77));
      mark.style.transform = `translate(${97 * ratio * connect}px,${-56 * ratio * connect}px) scale(${lerp(1, 40 * ratio / metrics.assemblySize, connect)})`;
      seed.style.opacity = String(segment(p, .78, .86));
      circles.forEach((circle, i) => { const reveal = segment(p, .79 + i * .012, .9 + i * .012); circle.style.strokeDasharray = reveal >= .999 ? "none" : "1"; circle.style.strokeDashoffset = String(1 - reveal); });
      stage2.style.background = color(dark, paper, daylight);
      caption2.style.color = color([237, 242, 248], [23, 44, 68], daylight);
      caption2.style.opacity = String(segment(p, .73, .83));
      label2.style.opacity = String(segment(p, .73, .83));
      label2.style.color = color([169, 190, 215], [82, 102, 124], daylight);
      familyName.style.opacity = String(segment(p, .93, 1));
      tracks[1].style.transform = `scaleX(${p})`;
      stage2.dataset.progress = p.toFixed(4);
    }
    function request() { if (!frame) frame = requestAnimationFrame(tick); }
    function tick() {
      frame = 0;
      const y = window.scrollY;
      const target1 = !motionEnabled ? .46 : clamp((y - metrics.start1) / metrics.length1);
      const target2 = !motionEnabled ? 1 : clamp((y - metrics.start2) / metrics.length2);
      const old1 = current1, old2 = current2;
      current1 = !motionEnabled || Math.abs(target1 - current1) < .00015 ? target1 : lerp(current1, target1, .21);
      current2 = !motionEnabled || Math.abs(target2 - current2) < .00015 ? target2 : lerp(current2, target2, .21);
      if (old1 !== current1 || stage1.dataset.progress === undefined) drawFirst(current1);
      if (old2 !== current2 || stage2.dataset.progress === undefined) drawSecond(current2);
      const intro = !motionEnabled ? 0 : clamp(y / metrics.height);
      heroSquare.style.transform = `translate3d(0,${-38 * intro}px,0) rotate(${lerp(-8, 6, intro)}deg)`;
      progress.style.transform = `scaleX(${clamp(y / metrics.end)})`;
      const isDark = !motionEnabled ? y > metrics.darkStart - 80 && y < metrics.start2 + metrics.height2 - 80 : y > metrics.start1 + metrics.length1 * .89 && y < metrics.start2 + metrics.length2 * .88;
      root.style.setProperty("--header-ink", isDark ? "#e9f0f8" : "#172c44");
      root.style.setProperty("--header-bg", isDark ? "rgba(21,43,69,.88)" : "rgba(238,241,244,.88)");
      if (Math.abs(target1 - current1) > .00015 || Math.abs(target2 - current2) > .00015) request();
    }
    function measure() {
      resizeFrame = 0;
      const textSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      root.classList.toggle("has-large-text", textSize > 20);
      motionEnabled = !reduce.matches && window.innerHeight >= 600 && textSize <= 20;
      root.classList.toggle("has-motion", motionEnabled);
      const y = window.scrollY;
      metrics = { start1: first.getBoundingClientRect().top + y, length1: Math.max(1, first.offsetHeight - stage1.offsetHeight), start2: second.getBoundingClientRect().top + y, length2: Math.max(1, second.offsetHeight - stage2.offsetHeight), edge: world.offsetWidth, width: window.innerWidth, height: stage1.offsetHeight, seedWidth: seed.getBoundingClientRect().width, assemblySize: Math.max(1, assembly.offsetWidth), roomSize: Math.max(1, room.offsetWidth), height2: stage2.offsetHeight, productCenter: parseFloat(getComputedStyle(product).getPropertyValue("--product-center")), productTop: parseFloat(getComputedStyle(product).getPropertyValue("--product-top")), darkStart: element<HTMLElement>(".dark-world").getBoundingClientRect().top + y, end: Math.max(1, document.documentElement.scrollHeight - window.innerHeight) };
      drawFirst(!motionEnabled ? .46 : current1); drawSecond(!motionEnabled ? 1 : current2);
      request();
    }
    function resize() { if (!resizeFrame) resizeFrame = requestAnimationFrame(measure); }
    const observer = new ResizeObserver(resize);
    observer.observe(root);
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    reduce.addEventListener("change", measure);
    measure();
    const anchor = document.getElementById(window.location.hash.slice(1));
    const anchorFrame = anchor && root.contains(anchor) ? requestAnimationFrame(() => {
      anchor.scrollIntoView({ behavior: "instant", block: "start" });
    }) : 0;
    return () => { cancelAnimationFrame(anchorFrame); cancelAnimationFrame(frame); cancelAnimationFrame(resizeFrame); observer.disconnect(); window.removeEventListener("scroll", request); window.removeEventListener("resize", resize); reduce.removeEventListener("change", measure); root.classList.remove("has-motion", "has-large-text"); };
  }, []);
  return <div className="construct-experience" ref={ref}>{children}</div>;
}
