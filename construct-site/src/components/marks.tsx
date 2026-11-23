export function SquareMark({ className = "" }: { className?: string }) {
  return <span className={`square-mark ${className}`} aria-hidden="true"><span /></span>;
}

export function Seed({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 600 600" aria-hidden="true" focusable="false" fill="none">
    <circle className="seed-center" cx="300" cy="300" r="112" pathLength="1" />
    <circle cx="300" cy="188" r="112" pathLength="1" /><circle cx="397" cy="244" r="112" pathLength="1" />
    <circle cx="397" cy="356" r="112" pathLength="1" /><circle cx="300" cy="412" r="112" pathLength="1" />
    <circle cx="203" cy="356" r="112" pathLength="1" /><circle cx="203" cy="244" r="112" pathLength="1" />
  </svg>;
}
