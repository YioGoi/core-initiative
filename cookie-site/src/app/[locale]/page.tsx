import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { brands, defaultLocale, isLocale, locales } from "@core-initiative/common/config";
import { site } from "@/config/site";
import { content } from "@/lib/content";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ContactForm } from "@/components/contact-form";
import { FlowerFooter } from "@/components/flower-footer";
import { ScrollExperience } from "@/components/scroll-experience";
import { Arrow, Flower, Seed } from "@/components/marks";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = content[locale];
  return {
    title: c.title, description: c.description,
    robots: { index: site.indexable, follow: site.indexable },
    alternates: { canonical: `/${locale}`, languages: { ...Object.fromEntries(locales.map((language) => [language, `/${language}`])), "x-default": `/${defaultLocale}` } },
    openGraph: { title: c.title, description: c.description, url: `/${locale}`, siteName: "Cookie by Core Initiative", type: "website", locale: { nl: "nl_NL", en: "en_GB", tr: "tr_TR" }[locale], alternateLocale: locales.filter((language) => language !== locale).map((language) => ({ nl: "nl_NL", en: "en_GB", tr: "tr_TR" })[language]) },
    twitter: { card: "summary_large_image", title: c.title, description: c.description },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = content[locale];
  const [studioLabel, originLabel] = c.hero.eyebrow.split(" · ");
  const websiteId = `${site.origin}/#website`;
  const graph = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebSite", "@id": websiteId, name: "Cookie", url: site.origin, inLanguage: [...locales], isPartOf: { "@type": "WebSite", "@id": `${brands.core.origin}/#website`, name: "Core Initiative", url: brands.core.origin } },
    { "@type": "WebPage", "@id": `${site.origin}/${locale}#page`, name: c.title, description: c.description, url: `${site.origin}/${locale}`, inLanguage: locale, isPartOf: { "@id": websiteId } },
  ] };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />
    <a className="skip-link" href="#main">{c.skip}</a>
    <header className="site-header" id="top">
      <a className="wordmark" href={`/${locale}`} aria-label="Cookie"><Flower /><span>cookie</span></a>
      <nav className="main-nav" aria-label="Cookie"><a href="#identity">{c.nav.work}</a><a className="approach-link" href="#approach">{c.nav.approach}</a><a href="#contact">{c.nav.contact}<Flower className="nav-flower" /></a></nav>
      <LanguageSwitcher locale={locale} label={c.language} />
    </header>
    <main id="main" tabIndex={-1}>
      <section className="hero section-shell" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow"><span className="status-dot" /><span>{studioLabel} · <span lang="en">{originLabel}</span></span></p>
          <h1 id="hero-title">{c.hero.line}{" "}<br /><em>{c.hero.emphasis}</em></h1>
          <p className="hero-description">{c.hero.body}</p>
          <a className="button" href="#contact"><Flower /><span>{c.hero.cta}</span></a>
        </div>
        <figure className="hero-art">
          <div className="hero-photo"><Image src="/images/petal-still-life.png" alt={c.imageAlt} width={1536} height={1024} sizes="(max-width: 760px) 90vw, 48vw" loading="eager" fetchPriority="high" /><span className="photo-word" aria-hidden="true">Petal.</span></div>
          <div className="hero-note" aria-hidden="true"><span>petal / 01</span><Flower /><p>{c.hero.stamp}</p><span className="note-line" /></div>
          <figcaption><span>{c.hero.caption}</span><span aria-hidden="true">↗</span></figcaption>
          <div className="hero-palette" aria-hidden="true"><i /><i /><i /><i /></div>
        </figure>
        <a className="hero-scroll" href="#perspective"><span aria-hidden="true">↓</span>{c.hero.explore}</a>
        <span className="hero-index" aria-hidden="true">Independent minds.<br />Connected by Core.</span>
      </section>

      <section className="intro section-shell" id="perspective" aria-labelledby="intro-title">
        <p className="eyebrow">{c.intro.label}</p>
        <div><h2 id="intro-title">{c.intro.line}{" "}<br /><em>{c.intro.emphasis}</em></h2><p className="intro-body">{c.intro.body}</p></div>
        <Flower className="intro-flower" />
      </section>

      <section className="identity-scene scene" id="identity" data-scene="identity" aria-labelledby="identity-title">
        <div className="scene-stage">
          <div className="scene-heading section-shell"><p className="eyebrow">{c.identity.label}</p><h2 id="identity-title">{c.identity.title}</h2></div>
          <div className="identity-panels" aria-hidden="true">
            <div className="identity-panel type-panel"><span className="panel-kicker">Petal / Identity study</span><div className="type-specimen">Aa<span>&</span></div><p className="type-alphabet">abcdefghijklmnopqrstuvwxyz<br />ABCDEFGHIJKLMNOPQRSTUVWXYZ</p><div className="panel-bottom"><span>01 / {c.identity.type}</span><span>↗</span></div></div>
            <div className="identity-panel picture-panel"><Image src="/images/petal-still-life.png" alt="" fill sizes="(max-width: 760px) 80vw, 28vw" /><div className="picture-label"><span>Petal.</span><Flower /></div><div className="panel-bottom"><span>02 / {c.identity.expression}</span><span>↗</span></div></div>
            <div className="identity-panel colour-panel"><span className="panel-kicker">A feeling, in colour.</span><Flower /><div className="swatch-stack"><i /><i /><i /></div><div className="panel-bottom"><span>03 / {c.identity.colour}</span><span>↗</span></div></div>
          </div>
          <div className="scene-caption section-shell"><p>{c.identity.body}</p><span className="scene-outcome">{c.identity.outcome}</span><p className="concept-note">{c.identity.note}</p></div>
          <span className="scene-number" aria-hidden="true">01 — 02</span>
        </div>
      </section>

      <section className="services section-shell" aria-labelledby="services-title">
        <div className="section-heading"><p className="eyebrow">{c.services.label}</p><h2 id="services-title">{c.services.title}</h2></div>
        <div className="service-list">{c.services.items.map((item, index) => <article className="service" key={item.name}><span className="service-number">0{index + 1}</span><h3>{item.name}</h3><div><p>{item.text}</p><p className="service-tags">{item.tags}</p></div><Arrow diagonal /></article>)}</div>
      </section>

      <section className="digital-scene scene" id="digital" data-scene="digital" aria-labelledby="digital-title">
        <div className="scene-stage">
          <div className="ink-field" aria-hidden="true"><Flower /></div>
          <div className="scene-heading section-shell"><p className="eyebrow">{c.digital.label}</p><h2 id="digital-title">{c.digital.title}</h2></div>
          <div className="scene-heading scene-heading-on-ink section-shell" aria-hidden="true"><p className="eyebrow">{c.digital.label}</p><div className="scene-title">{c.digital.title}</div></div>
          <div className="prototype-composition" aria-hidden="true">
            <div className="design-label label-left"><span className="selection-dot" />{c.digital.component}</div>
            <div className="browser-mockup"><div className="browser-toolbar"><span><i /><i /><i /></span><span>petal — digital expression</span><span>↗</span></div><div className="petal-screen"><div className="petal-nav"><span className="petal-brand">Petal.</span><span>{c.digital.screenNav}</span><span>↗</span></div><div className="petal-hero"><div><p className="petal-kicker">{c.digital.screenSmall}</p><p className="petal-title">{c.digital.screenTitle}</p><span className="petal-button"><Flower /><span>{c.digital.screenCta}</span></span></div><div className="petal-image"><Image src="/images/petal-still-life.png" alt="" fill sizes="(max-width: 760px) 50vw, 38vw" /></div></div><div className="petal-bottom"><span>{c.digital.screenBody}</span><Flower /><span>{c.digital.screenFooter}</span></div></div></div>
            <div className="floating-component"><span className="component-label">Button / Primary</span><span className="petal-button"><Flower /><span>{c.digital.screenCta}</span></span><div className="component-swatches"><i /><i /><i /><span>↳ Petal / UI</span></div></div>
            <span className="design-label label-right">Petal / Prototype · 01</span>
          </div>
          <div className="scene-caption section-shell"><p>{c.digital.body}</p><p className="concept-note">{c.digital.note}</p></div>
          <div className="scene-caption scene-caption-on-ink section-shell" aria-hidden="true"><p>{c.digital.body}</p><p className="concept-note">{c.digital.note}</p></div>
        </div>
      </section>

      <section className="process section-shell" id="approach" aria-labelledby="process-title">
        <div className="section-heading"><p className="eyebrow">{c.process.label}</p><h2 id="process-title">{c.process.title}</h2></div>
        <ol className="process-list">{c.process.items.map((item, i) => <li key={item.title}><span className="process-number">0{i + 1}</span><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol>
        <div className="tools-note"><span className="tools-mark" aria-hidden="true">↳</span><p>{c.process.tools}</p><span className="tools-tag">Figma Design</span></div>
      </section>

      <section className="family section-shell" aria-labelledby="family-title"><div className="family-mark"><Seed /><Flower /></div><div className="family-copy"><p className="eyebrow">{c.family.label}</p><h2 id="family-title">{c.family.title}</h2><p>{c.family.text}</p><div className="family-links"><a href={`${brands.construct.origin}/${locale}`}><span>Construct</span>{c.family.construct}<Arrow diagonal /></a><a href={`${brands.tool.origin}/${locale}`}><span>Tool</span>{c.family.tool}<Arrow diagonal /></a><a href={`${brands.core.origin}/${locale}`}><span>Core Initiative</span>{c.family.core}<Arrow diagonal /></a></div></div></section>

      <section className="contact section-shell" id="contact" aria-labelledby="contact-title"><div className="contact-heading"><p className="eyebrow">{c.contact.label}</p><h2 id="contact-title">{c.contact.title}{" "}<br /><em>{c.contact.emphasis}</em></h2><p>{c.contact.body}</p><Flower /></div><ContactForm copy={c.contact} locale={locale} /></section>
    </main>
    <FlowerFooter><footer className="footer section-shell"><div className="footer-top"><span>{c.footer.line}</span><a href="#top">{c.footer.top}<span aria-hidden="true"> ↑</span></a></div><div className="footer-word" aria-hidden="true">cookie<Flower /></div><div className="footer-bottom"><a href={`${brands.core.origin}/${locale}`}>{c.footer.origin}<Arrow diagonal /></a><span>Brand & Digital Design</span></div></footer></FlowerFooter>
    <ScrollExperience />
  </>;
}
