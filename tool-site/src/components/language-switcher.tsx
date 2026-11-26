"use client";

import { useEffect, useId, useRef } from "react";
import { languageNames, locales, type Locale } from "@core-initiative/common/config";

export function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const panelId = useId();

  useEffect(() => {
    const details = ref.current;
    if (!details) return;
    function closeOutside(event: PointerEvent) {
      if (event.target instanceof Node && !details!.contains(event.target)) details!.open = false;
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape" || event.defaultPrevented || !details!.open) return;
      event.preventDefault();
      details!.open = false;
      details!.querySelector("summary")?.focus();
    }
    document.addEventListener("pointerdown", closeOutside, true);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside, true);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return <details className="language-switcher" ref={ref} onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.open = false;
  }}>
    <summary className="language-trigger" aria-label={`${label}: ${languageNames[locale]}`} aria-controls={panelId}>
      <svg className="language-globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></svg>
      <span lang={locale}>{languageNames[locale]}</span>
      <svg className="language-chevron" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" focusable="false"><path d="m2 2 4 4 4-4" /></svg>
    </summary>
    <nav className="language-panel" id={panelId} aria-label={label}>
      {locales.map((language) => <a key={language} href={`/${language}`} lang={language} hrefLang={language} aria-current={language === locale ? "page" : undefined}>
        <span>{languageNames[language]}</span>
        {language === locale && <svg className="language-check" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" focusable="false"><path d="m3 8 3 3 7-7" /></svg>}
      </a>)}
    </nav>
  </details>;
}
