import Image from "next/image";
import type { Copy } from "@/lib/content";
import { Seed } from "./marks";

function Lines({ lines }: { lines: string[] }) { return <>{lines.map((line) => <span className="line" key={line}>{line}{" "}</span>)}</>; }

export function UnfoldScene({ copy, example }: { copy: Copy["unfold"]; example: Copy["example"] }) {
  return <section className="scroll-sequence unfold-sequence" id="perspective" aria-labelledby="unfold-title">
    <div className="stage stage-one">
      <p className="stage-label eyebrow">{copy.label}<span>{copy.hint}</span></p>
      <div className="scene-grid" aria-hidden="true" />
      <div className="floor" aria-hidden="true" />
      <div className="perspective" aria-hidden="true"><div className="world">
        <div className="plane plane-0 atelier-layer">
          <Image src="/images/atelier-workshop.png" alt="" fill sizes="(max-width: 760px) 65vw, 480px" />
          <span className="image-layer-label">{copy.layers[0]}</span>
        </div>
        <div className="plane plane-1 material-layer">
          <span className="layer-kicker">{copy.layers[1]}</span>
          <span className="material-word">{example.atelier}</span>
          <div className="material-palette"><i /><i /><i /></div>
          <div className="material-layout"><span /><span /><span /></div>
        </div>
        <div className="plane plane-2 website-layer">
          <div className="study-browser"><span>{example.atelier}</span><span className="study-browser-mark" /></div>
          <div className="study-hero">
            <Image src="/images/atelier-still-life.png" alt="" fill sizes="(max-width: 760px) 60vw, 480px" />
            <div className="study-headline"><Lines lines={example.headline} /></div>
          </div>
          <div className="study-bottom"><span>{copy.study.collection}</span><span className="study-rule" /></div>
          <div className="study-tiles"><span /><span /><span /></div>
        </div>
        <div className="plane plane-3 object-layer">
          <span className="product-frame" />
          <Image src="/images/atelier-blue-vase.png" alt="" fill sizes="(max-width: 760px) 50vw, 400px" />
          <div className="commerce-fragment"><span>{copy.study.product}<small>{copy.study.finish}</small></span><span className="commerce-bag" /></div>
        </div>
        <div className="plane plane-front"><span className="corner" /></div>
      </div></div>
      <div className="stage-caption"><h2 id="unfold-title"><Lines lines={copy.title} /></h2><p>{copy.text}</p><small className="scene-note">{copy.study.note}</small></div>
      <div className="handoff-copy"><h2><Lines lines={copy.handoff} /></h2><p>{copy.handoffText}</p></div>
      <div className="stage-track" aria-hidden="true"><span /></div>
    </div>
  </section>;
}

export function FamilyScene({ copy, instrument }: { copy: Copy["family"]; instrument: Copy["instrument"] }) {
  return <section className="scroll-sequence family-sequence" id="sound-space" aria-labelledby="instrument-title connection-title">
    <div className="stage stage-two">
      <p className="stage-label sound-label eyebrow">{instrument.label}<span>{instrument.hint}</span></p>
      <p className="stage-label connection-label eyebrow">{copy.label}<span>{copy.hint}</span></p>
      <div className="sonic-depth" aria-hidden="true">
        <div className="chamber-photograph"><Image src="/images/synth-chamber.png" alt="" fill sizes="100vw" /></div>
        <div className="chamber-vignette" />
        <div className="depth-volume"><div className="depth-camera">{Array.from({ length: 6 }, (_, i) => <div className="depth-frame" key={i} />)}</div></div>
        <div className="chamber-light" />
      </div>
      <div className="sonic-product">
        <div className="instrument-outline" aria-hidden="true" />
        <div className="instrument-object"><Image src="/images/touch-synth-cutout.png" alt={instrument.imageAlt} fill sizes="(max-width: 760px) 90vw, 720px" /></div>
        <div className="instrument-shop" aria-hidden="true">
          <span className="shop-product">{instrument.product}</span>
          <span className="shop-edition">{instrument.edition}</span>
          <div className="shop-swatches"><i /><i /><i /></div>
          <span className="shop-finish">{instrument.finish}</span>
          <span className="shop-action">{instrument.action}<span className="commerce-bag" /></span>
        </div>
      </div>
      <div className="sonic-caption"><h2 id="instrument-title"><Lines lines={instrument.title} /></h2><p>{instrument.text}</p><small className="scene-note">{instrument.note}</small></div>
      <div className="assembly-space" aria-hidden="true"><div className="assembly">{Array.from({ length: 6 }, (_, i) => <div className="piece" key={i} />)}<div className="final-mark" /></div></div>
      <Seed className="seed" />
      <div className="family-caption"><h2 id="connection-title"><Lines lines={copy.title} /></h2><p>{copy.text}</p></div>
      <p className="family-name">{copy.signature}</p>
      <div className="stage-track" aria-hidden="true"><span /></div>
    </div>
  </section>;
}
