import type { Copy } from "@/lib/content";
import { Seed } from "./marks";

function Lines({ lines }: { lines: string[] }) { return <>{lines.map((line) => <span className="line" key={line}>{line}</span>)}</>; }

export function UnfoldScene({ copy }: { copy: Copy["unfold"] }) {
  return <section className="scroll-sequence unfold-sequence" id="perspective" aria-labelledby="unfold-title">
    <div className="stage stage-one">
      <p className="stage-label eyebrow">{copy.label}<span>{copy.hint}</span></p>
      <div className="floor" aria-hidden="true" />
      <div className="perspective" aria-hidden="true"><div className="world">
        {copy.layers.map((layer, i) => <div className={`plane plane-${i}`} key={layer}><span className="plane-title">{layer}</span><span className="plane-line" /></div>)}
        <div className="plane plane-front"><span className="corner" /></div>
      </div></div>
      <div className="stage-caption"><h2 id="unfold-title"><Lines lines={copy.title} /></h2><p>{copy.text}</p></div>
      <div className="handoff-copy"><h2><Lines lines={copy.handoff} /></h2><p>{copy.handoffText}</p></div>
      <div className="stage-track" aria-hidden="true"><span /></div>
    </div>
  </section>;
}

export function FamilyScene({ copy }: { copy: Copy["family"] }) {
  return <section className="scroll-sequence family-sequence" aria-labelledby="connection-title">
    <div className="stage stage-two">
      <p className="stage-label eyebrow">{copy.label}<span>{copy.hint}</span></p>
      <div className="assembly-space" aria-hidden="true"><div className="assembly">{Array.from({ length: 6 }, (_, i) => <div className="piece" key={i} />)}<div className="final-mark" /></div></div>
      <Seed className="seed" />
      <div className="family-caption"><h2 id="connection-title"><Lines lines={copy.title} /></h2><p>{copy.text}</p></div>
      <p className="family-name">{copy.signature}</p>
      <div className="stage-track" aria-hidden="true"><span /></div>
    </div>
  </section>;
}
