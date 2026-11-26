export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h15m-6-6 6 6-6 6"} /></svg>;
}

export function ToolMark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false"><g stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M8.4 33A18 18 0 1 1 39.6 33" /><path d="M35.3 17.5a13 13 0 1 1-22.6 0" /><path d="M17.1 28a8 8 0 1 1 13.8 0" /></g><circle cx="24" cy="24" r="2" fill="currentColor" /></svg>;
}

export function SeedMark() {
  return <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth=".8" aria-hidden="true" focusable="false"><circle cx="50" cy="50" r="23" />{Array.from({ length: 6 }, (_, i) => { const a = i * Math.PI / 3; return <circle key={i} cx={50 + 23 * Math.cos(a)} cy={50 + 23 * Math.sin(a)} r="23" />; })}</svg>;
}

export function PhaseInstrument({ id }: { id: string }) {
  return <svg className="phase-instrument" viewBox="0 0 600 600" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <radialGradient id={`${id}-metal`} cx=".32" cy=".24"><stop stopColor="#4c4850" /><stop offset=".6" stopColor="#2d2a31" /><stop offset="1" stopColor="#242128" /></radialGradient>
      <linearGradient id={`${id}-edge`} x1="80" y1="50" x2="500" y2="550" gradientUnits="userSpaceOnUse"><stop stopColor="#c0b7c7" stopOpacity=".48" /><stop offset=".45" stopColor="#4b454f" stopOpacity=".1" /><stop offset="1" stopColor="#b8aebb" stopOpacity=".3" /></linearGradient>
      <radialGradient id={`${id}-center`} cx=".25" cy=".15"><stop stopColor="#444048" /><stop offset="1" stopColor="#252229" /></radialGradient>
    </defs>
    <circle cx="300" cy="310" r="244" fill="#100e14" opacity=".3" />
    <circle cx="300" cy="300" r="243" fill={`url(#${id}-metal)`} stroke={`url(#${id}-edge)`} />
    <circle cx="300" cy="300" r="236" stroke="#131116" strokeWidth="2" />
    <circle cx="300" cy="300" r="228" stroke="#84778f" strokeOpacity=".15" />
    {Array.from({ length: 72 }, (_, i) => { const a = i * Math.PI / 36; const r = i % 6 === 0 ? 209 : 216; return <path key={i} d={`M${300 + r * Math.sin(a)} ${300 - r * Math.cos(a)}L${300 + 222 * Math.sin(a)} ${300 - 222 * Math.cos(a)}`} stroke={i % 6 === 0 ? "#a49cae" : "#625c69"} strokeWidth={i % 6 === 0 ? 1.2 : .8} />; })}
    {[188, 144, 100].map((r, i) => <g className={`phase-ring phase-ring-${i}`} key={r}>
      <circle cx="300" cy="300" r={r} stroke="#151318" strokeWidth="19" />
      <circle cx="300" cy="300" r={r} stroke="#4e4756" strokeWidth="16" />
      <circle cx="300" cy="300" r={r} stroke={i === 1 ? "#afa0bb" : "#d8dd95"} strokeWidth="8" strokeDasharray={`${r * 4.5} ${r * Math.PI * 2}`} strokeLinecap="round" transform="rotate(-126 300 300)" />
      <circle cx="300" cy={300 - r} r="5" fill="#e1e5ac" stroke="#2d2933" strokeWidth="2" />
    </g>)}
    <circle cx="300" cy="300" r="61" fill={`url(#${id}-center)`} stroke={`url(#${id}-edge)`} strokeWidth="2" />
    <circle cx="300" cy="300" r="54" stroke="#17151c" strokeWidth="1" />
    <path d="M300 252v14" stroke="#d8dd95" strokeWidth="3" strokeLinecap="round" />
    <path d="M286 305h28m-14-14v28" stroke="#bfb6ca" strokeWidth="1" />
    {[0, 1, 2, 3].map(i => <g key={i} transform={`rotate(${i * 90} 300 300)`}><circle cx="300" cy="70" r="3" fill="#1a171e" stroke="#746a7c" strokeWidth=".7" /><path d="m298 70 4 0" stroke="#8a7e92" strokeWidth=".7" /></g>)}
  </svg>;
}
