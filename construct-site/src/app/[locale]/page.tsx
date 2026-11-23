import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { brands, defaultLocale, isLocale, locales } from "@core-initiative/common/config";
import { site } from "@/config/site";
import { content } from "@/lib/content";
import { ElasticFooter } from "@/components/elastic-footer";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ContactForm } from "@/components/contact-form";
import { ScrollExperience } from "@/components/scroll-experience";
import { SquareMark, Seed } from "@/components/marks";
import { FamilyScene, UnfoldScene } from "@/components/motion-scenes";

type Props = { params: Promise<{ locale: string }> };
const lines = (text: string[]) => text.map((line) => <span className="line" key={line}>{line}{" "}</span>);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const copy = content[locale];
  const socialLocales = { nl: "nl_NL", en: "en_GB", tr: "tr_TR" };
  return {
    metadataBase: new URL(site.origin), title: copy.metaTitle, description: copy.introduction,
    robots: { index: site.indexable, follow: site.indexable },
    alternates: { canonical: `/${locale}`, languages: { ...Object.fromEntries(locales.map((language) => [language, `/${language}`])), "x-default": `/${defaultLocale}` } },
    openGraph: { type: "website", title: copy.metaTitle, description: copy.introduction, siteName: site.name, url: `/${locale}`, locale: socialLocales[locale], alternateLocale: locales.filter((language) => language !== locale).map((language) => socialLocales[language]) },
    twitter: { card: "summary_large_image", title: copy.metaTitle, description: copy.introduction },
  };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = content[locale];
  const configuredEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  const email = configuredEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(configuredEmail) ? configuredEmail : undefined;
  const pageUrl = new URL(`/${locale}`, site.origin).href;
  const websiteId = `${site.origin}/#website`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebSite", "@id": websiteId, name: site.name, url: `${site.origin}/`, inLanguage: [...locales], isPartOf: { "@type": "WebSite", name: "Core Initiative", url: brands.core.origin } },
    { "@type": "WebPage", "@id": `${pageUrl}#webpage`, url: pageUrl, name: c.metaTitle, description: c.introduction, inLanguage: locale, isPartOf: { "@id": websiteId } },
  ] };

  return <ScrollExperience>
    <a className="skip-link" href="#main">{c.nav.skip}</a>
    <header className="site-head">
      <div className="head-inner wrap">
        <a className="brand" href="#top" aria-label="Construct"><SquareMark /><span><strong>Construct</strong><small>by Core Initiative</small></span></a>
        <nav className="main-nav" aria-label="Construct">
          <a href="#approach">{c.nav.approach}</a><a href="#services">{c.nav.services}</a><a href="#family">{c.nav.family}</a>
        </nav>
        <div className="head-actions"><LanguageSwitcher locale={locale} label={c.nav.language} /><a className="head-contact" href="#contact">{c.nav.contact}</a></div>
      </div><div className="reading-progress" aria-hidden="true" />
    </header>
    <main id="main" tabIndex={-1}>
      <section className="hero wrap" id="top" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow">{c.hero.eyebrow}</p><h1 id="hero-title">{lines(c.hero.title)}</h1><p className="hero-description">{c.hero.text}</p><div className="hero-actions"><a className="button button-dark" href="#contact">{c.hero.primary}</a><a className="text-link" href="#approach">{c.hero.secondary}</a></div></div>
        <div className="hero-art" aria-hidden="true"><div className="hero-orbit" /><div className="hero-square"><div className="hero-inner-square" /><span className="square-node" /></div></div>
        <div className="hero-bottom"><a className="scroll-cue" href="#approach">{c.hero.scroll}</a><a className="origin-note" href="#family"><Seed />{c.hero.note}</a></div>
      </section>
      <section className="bridge wrap" id="approach" aria-labelledby="approach-title"><h2 id="approach-title">{lines(c.bridge.title)}</h2><p>{c.bridge.text}</p></section>
      <UnfoldScene copy={c.unfold} example={c.example} />
      <div className="dark-world">
        <section className="services section-space wrap" id="services" aria-labelledby="services-title">
          <div className="section-intro"><p className="eyebrow">{c.services.eyebrow}</p><h2 id="services-title">{lines(c.services.title)}</h2><p>{c.services.text}</p></div>
          <div className="service-list">{c.services.items.map((item, i) => <article className="service-row" key={item.title}><span className={`service-glyph glyph-${i}`} aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.text}</p><span className="service-detail">{item.detail}</span></div></article>)}</div>
        </section>
        <section className="example section-space wrap" aria-labelledby="example-title">
          <div className="example-intro"><div><p className="eyebrow">{c.example.eyebrow}</p><h2 id="example-title">{lines(c.example.title)}</h2></div><p>{c.example.text}</p></div>
          <figure className="concept-figure"><div className="concept-window"><div className="concept-bar"><span>{c.example.atelier}</span><span aria-hidden="true">◇</span></div><div className="concept-image"><Image src="/images/atelier-still-life.png" alt={c.example.imageAlt} width={1536} height={1024} sizes="(max-width: 760px) 100vw, 88vw" /><div className="concept-copy"><p>{c.example.atelier}</p><h3>{lines(c.example.headline)}</h3><p>{c.example.caption}</p></div></div></div><figcaption>{c.example.note}</figcaption></figure>
          <ul className="concept-tags" aria-label={c.example.eyebrow}>{c.example.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
        </section>
        <section className="process section-space wrap" aria-labelledby="process-title"><div className="section-intro"><p className="eyebrow">{c.process.eyebrow}</p><h2 id="process-title">{lines(c.process.title)}</h2></div><div className="process-list">{c.process.items.map((item) => <article key={item.title}><span className="process-square" aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
      </div>
      <FamilyScene copy={c.family} instrument={c.instrument} />
      <section className="family section-space wrap" id="family" aria-labelledby="family-title">
        <div className="family-intro"><div><p className="eyebrow">{c.family.eyebrow}</p><h2 id="family-title">{lines(c.family.heading)}</h2></div><p>{c.family.introduction}</p></div>
        <div className="family-directory">{c.family.brands.map((brand) => <details key={brand.id} open={brand.id === "tool"} className={`family-member member-${brand.id}`}><summary><span className="member-name">{brands[brand.id].name}</span><span className="member-area">{brand.area}</span><span className="expand-mark" aria-hidden="true" /></summary><p>{brand.text}</p></details>)}</div>
        <div className="maker-work"><div><p className="eyebrow">{c.family.workLabel}</p><p>{c.family.workNote}</p></div><div className="product-links"><a href="https://www.yigit-dogan.dev/projects#mind-palace" target="_blank" rel="noopener noreferrer"><span>Mind Palace</span><small>{c.family.portfolioLink}</small><span className="sr-only">{c.nav.newTab}</span></a><a href="https://www.yigit-dogan.dev/projects#ai-team" target="_blank" rel="noopener noreferrer"><span>AI Team</span><small>{c.family.portfolioLink}</small><span className="sr-only">{c.nav.newTab}</span></a></div></div>
      </section>
      <section className="contact section-space wrap" id="contact" aria-labelledby="contact-title"><div className="contact-intro"><p className="eyebrow">{c.contact.eyebrow}</p><h2 id="contact-title">{lines(c.contact.title)}</h2><p>{c.contact.text}</p>{email && <a className="contact-address" href={`mailto:${email}`}>{email}</a>}</div><ContactForm copy={c.contact} email={email} /></section>
    </main>
    <ElasticFooter><footer className="site-footer wrap"><div className="footer-top"><p>{c.footer.line}</p><a href="#top">{c.footer.top}</a></div><div className="footer-wordmark" aria-hidden="true">Construct<span /></div><div className="footer-bottom"><a href={brands.core.origin}>Core Initiative</a><span>Web & e-commerce</span><span>© {new Date().getFullYear()} Construct</span></div></footer></ElasticFooter>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </ScrollExperience>;
}
