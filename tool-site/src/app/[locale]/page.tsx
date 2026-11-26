import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brands, defaultLocale, isLocale, locales, type Locale } from "@core-initiative/common/config";
import { content } from "@/lib/content";
import { site } from "@/config/site";
import { Arrow, PhaseInstrument, SeedMark, ToolMark } from "@/components/marks";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ContactForm } from "@/components/contact-form";
import { ScrollExperience } from "@/components/scroll-experience";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = content[locale];
  return {
    title: copy.meta.title, description: copy.meta.description,
    alternates: { canonical: `${site.origin}/${locale}`, languages: { ...Object.fromEntries(locales.map(l => [l, `${site.origin}/${l}`])), "x-default": `${site.origin}/${defaultLocale}` } },
    openGraph: { title: copy.meta.title, description: copy.meta.description, siteName: "Tool by Core Initiative", url: `${site.origin}/${locale}`, type: "website", locale: { nl: "nl_NL", en: "en_GB", tr: "tr_TR" }[locale], alternateLocale: locales.filter(l => l !== locale).map(l => ({ nl: "nl_NL", en: "en_GB", tr: "tr_TR" })[l]) },
    twitter: { card: "summary_large_image", title: copy.meta.title, description: copy.meta.description },
    robots: { index: site.indexable, follow: site.indexable },
  };
}

function localLink(origin: string, locale: Locale) { return `${origin}/${locale}`; }

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = content[locale];
  const familyOrigins = [brands.cookie.origin, brands.construct.origin, brands.core.origin];
  const websiteId = `${site.origin}/#website`;
  const graph = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebSite", "@id": websiteId, name: "Tool", url: site.origin, inLanguage: [...locales], isPartOf: { "@type": "WebSite", "@id": `${brands.core.origin}/#website`, name: "Core Initiative", url: brands.core.origin } },
    { "@type": "WebPage", "@id": `${site.origin}/${locale}#page`, name: c.meta.title, description: c.meta.description, url: `${site.origin}/${locale}`, inLanguage: locale, isPartOf: { "@id": websiteId } },
  ] };
  return <ScrollExperience>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />
    <a className="skip-link" href="#main">{c.skip}</a>
    <header className="site-header">
      <a className="brand" href={`/${locale}`} aria-label="Tool by Core Initiative"><ToolMark /><span className="brand-name">tool<span className="brand-period">.</span></span></a>
      <nav className="main-nav" aria-label={c.hero.eyebrow}>
        <a href="#approach">{c.nav[0]}</a><a href="#expertise">{c.nav[1]}</a><a href="#collective">{c.nav[2]}</a>
      </nav>
      <div className="header-actions"><LanguageSwitcher locale={locale} label={c.language} /><a className="header-contact" href="#contact" aria-label={c.contactAction}><span>{c.contactAction}</span></a></div>
    </header>
    <main id="main" tabIndex={-1}>
      <section className="hero wrap" id="top" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><span className="signal-dot" />{c.hero.eyebrow}</p>
          <h1 id="hero-title"><span>{c.hero.title[0]}</span>{" "}<span className="accent">{c.hero.title[1]}</span></h1>
          <p className="hero-description">{c.hero.description}</p>
          <a href="#contact" className="button button-signal"><span>{c.hero.action}</span></a>
          <a href="#approach" className="hero-explore">{c.hero.explore}<span aria-hidden="true">↓</span></a>
        </div>
        <figure className="hero-device">
          <div className="device-top"><span className="eyebrow">{c.hero.instrument}</span><span className="device-symbol" aria-hidden="true">φ / 001</span></div>
          <div className="hero-instrument"><PhaseInstrument id="hero" /><span className="instrument-axis axis-x" aria-hidden="true" /><span className="instrument-axis axis-y" aria-hidden="true" /></div>
          <figcaption className="device-bottom"><div className="signal-legend">{c.hero.labels.map((label, i) => <span key={label}><i aria-hidden="true">0{i + 1}</i>{label}</span>)}</div><span className="device-light" aria-hidden="true" /></figcaption>
        </figure>
        <div className="hero-foot"><a href={localLink(brands.core.origin, locale)} className="core-signature"><SeedMark /><span>Core Initiative<small>{c.hero.note}</small></span></a><span className="mono">{c.hero.index}</span></div>
      </section>

      <section className="bridge wrap" id="approach" aria-labelledby="bridge-title">
        <p className="eyebrow"><span className="section-number">01—</span>{c.bridge.label}</p>
        <div className="bridge-content"><h2 id="bridge-title">{c.bridge.title}{" "}<span>{c.bridge.emphasis}</span></h2><div><p>{c.bridge.text}</p><p className="bridge-foot"><span className="tiny-mark" aria-hidden="true" />{c.bridge.foot}</p></div></div>
      </section>

      <section className="assembly-sequence" id="system" aria-labelledby="system-title">
        <div className="assembly-stage wrap">
          <div className="sequence-heading"><p className="eyebrow">{c.system.label}</p><h2 id="system-title">{c.system.title}</h2><p>{c.system.text}</p></div>
          <div className="assembly-study">
            <div className="assembly-grid" aria-hidden="true" />
            <div className="assembly-wheel" aria-hidden="true"><PhaseInstrument id="assembly" /><span className="wheel-center-label">{c.system.center}</span></div>
            <div className="workflow-line" aria-hidden="true"><span /><span /><span /></div>
            <ol className="workflow">{c.system.steps.map((step, i) => <li className={`workflow-module module-${i}`} key={step.title}>
              <div className="module-head"><span className="mono">0{i + 1}</span><span className="module-led" aria-hidden="true" /></div>
              <span className="module-icon" aria-hidden="true">{i === 0 ? <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M9 12h30v24H9zM9 14l15 12 15-12M9 35l11-12m19 12L28 23" /></svg> : i === 1 ? <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M13 6h17l6 6v30H13zM30 6v8h6M19 22h11m-11 6h11m-11 6h7" /></svg> : <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="24" cy="24" r="17" /><path d="m15 24 6 6 13-13" /></svg>}</span>
              <h3>{step.title}</h3><p>{step.detail}</p><span className="module-tag"><span aria-hidden="true">↳</span>{step.tag}</span>
            </li>)}</ol>
            <p className="workflow-resolution"><span className="signal-dot" />{c.system.aligned}</p>
          </div>
          <div className="sequence-bottom"><div><p className="mono">{c.system.concept}</p><p className="concept-note">{c.system.description}</p></div><span className="sequence-meter" aria-hidden="true"><span /></span></div>
        </div>
      </section>

      <section className="services wrap" id="expertise" aria-labelledby="services-title">
        <div className="section-intro"><p className="eyebrow">{c.services.label}</p><h2 id="services-title">{c.services.title}</h2><p>{c.services.intro}</p></div>
        <div className="service-list">{c.services.items.map((item, i) => <article className="service-row" key={item.title}><span className="service-index mono">/ 0{i + 1}</span><div><h3>{item.title}</h3><span className="service-detail">{item.detail}</span></div><p>{item.text}</p><span className={`service-glyph glyph-${i}`} aria-hidden="true"><ToolMark /></span></article>)}</div>
      </section>

      <section className="depth-sequence" id="beneath" aria-labelledby="depth-title">
        <div className="depth-stage wrap">
          <div className="depth-copy"><p className="eyebrow">{c.depth.label}</p><h2 id="depth-title">{c.depth.title}{" "}<span>{c.depth.emphasis}</span></h2><p>{c.depth.text}</p><ol className="layer-key">{c.depth.layers.map((l, i) => <li key={l}><span>0{i + 1}</span>{l}</li>)}</ol></div>
          <figure className="depth-study"><div className="deck-perspective"><div className="depth-deck">
            <div className="deck-plane plane-connections" aria-hidden="true"><div className="plane-label">03 / {c.depth.layers[2]}</div><svg viewBox="0 0 500 300" fill="none" stroke="currentColor" strokeWidth="1"><path d="M60 150h100l45-70h100l45 70h90M160 150l45 70h100l45-70M250 80v140" />{[[60,150],[160,150],[205,80],[305,80],[350,150],[440,150],[205,220],[305,220]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="12" fill="#343039" /><circle cx={x} cy={y} r="3" fill="#d8dd95" /></g>)}</svg></div>
            <div className="deck-plane plane-logic" aria-hidden="true"><div className="plane-label">02 / {c.depth.layers[1]}</div><div className="logic-route"><span /><i /><span /><i /><span /></div><div className="logic-lines"><span /><span /><span /></div><ToolMark /></div>
            <div className="deck-plane plane-interface"><div className="interface-top"><ToolMark /><span>{c.depth.interface}</span><span className="interface-dots" aria-hidden="true">···</span></div><div className="interface-content"><p>{c.depth.task}</p>{c.depth.rows.map((r,i)=><div className="interface-row" key={r}><span className={`row-state state-${i}`} aria-hidden="true" /><span>{r}</span><span className="row-track" aria-hidden="true"><i /></span><span aria-hidden="true">↗</span></div>)}</div><div className="interface-bottom"><span className="signal-dot" />{c.system.bottom}</div></div>
          </div></div><figcaption className="mono">{c.depth.note}</figcaption></figure>
          <p className="depth-foot">{c.depth.lower}</p>
        </div>
      </section>

      <section className="product-section wrap" aria-labelledby="product-title">
        <div className="product-art" aria-hidden="true"><div className="palace-room room-1" /><div className="palace-room room-2" /><div className="palace-room room-3" /><span className="palace-orb" /><span className="palace-axis" /><span className="product-art-caption mono">{c.product.figure}</span></div>
        <div className="product-copy"><p className="eyebrow">{c.product.label}</p><h2 id="product-title">{c.product.title}</h2><p>{c.product.text}</p><a className="text-link" href="https://www.yigit-dogan.dev/projects#mind-palace" target="_blank" rel="noopener noreferrer">{c.product.action}<span className="sr-only"> ({c.product.external})</span></a><p className="mono product-note">{c.product.note}</p></div>
      </section>

      <section className="collective wrap" id="collective" aria-labelledby="collective-title">
        <div className="collective-heading"><SeedMark /><p className="eyebrow">{c.family.label}</p></div><div className="collective-body"><h2 id="collective-title">{c.family.title}</h2><p>{c.family.text}</p></div>
        <div className="family-links">{c.family.links.map((b,i)=><a key={b.name} href={localLink(familyOrigins[i],locale)}><span className="mono">0{i+1}</span><span className="family-name">{b.name}<small>{b.focus}</small></span><Arrow diagonal /></a>)}</div><p className="concept-note">{c.family.note}</p>
      </section>

      <section className="contact wrap" id="contact" aria-labelledby="contact-title"><div className="contact-intro"><p className="eyebrow">{c.contact.label}</p><h2 id="contact-title">{c.contact.title}</h2><p>{c.contact.description}</p><ToolMark className="contact-mark" /></div><ContactForm copy={c.contact} locale={locale} /></section>
    </main>
    <footer className="tool-footer wrap"><div className="footer-resolution"><div className="footer-mark" aria-hidden="true"><svg viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.5"><circle className="footer-ring footer-ring-0" cx="100" cy="100" r="74" strokeDasharray="310 465" /><circle className="footer-ring footer-ring-1" cx="100" cy="100" r="52" strokeDasharray="215 327" /><circle className="footer-ring footer-ring-2" cx="100" cy="100" r="30" strokeDasharray="125 189" /><circle cx="100" cy="100" r="3" fill="currentColor" /></svg></div><p>{c.footer.line}<span>{c.footer.end}</span></p><a href="#top" className="back-top" aria-label={c.footer.back}>↑</a></div><div className="footer-wordmark" aria-hidden="true">tool<span>.</span></div><div className="footer-bottom"><a href={localLink(brands.core.origin,locale)}>Tool by Core Initiative</a><span>{c.footer.rights}</span><span className="prototype-label"><i aria-hidden="true" />{c.footer.prototype}</span></div></footer>
  </ScrollExperience>;
}
