export function Flower({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    {[0, 60, 120, 180, 240, 300].map((angle) => <ellipse key={angle} cx="50" cy="29" rx="13" ry="22" transform={`rotate(${angle} 50 50)`} fill="currentColor" />)}
    <circle cx="50" cy="50" r="9" fill="var(--flower-center, currentColor)" />
  </svg>;
}

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false"><path d={diagonal ? "M5 19 19 5M5 5h14v14" : "M4 12h16m-6-6 6 6-6 6"} /></svg>;
}

export function Seed() {
  return <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth=".8" aria-hidden="true" focusable="false">
    <circle cx="60" cy="60" r="25" />
    {[0, 60, 120, 180, 240, 300].map((angle) => <circle key={angle} cx="60" cy="35" r="25" transform={`rotate(${angle} 60 60)`} />)}
  </svg>;
}
