"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { CookieCopy } from "@/lib/content";
import { Flower } from "./marks";

export function ContactForm({ copy, locale }: { copy: CookieCopy["contact"]; locale: string }) {
  const [ready, setReady] = useState(false);
  const noteId = useId();
  const resultId = useId();
  useEffect(() => { setReady(true); }, []);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const previewRef = useRef<HTMLElement>(null);
  const recipient = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const idea = String(data.get("idea") || "").trim();
    const nameField = event.currentTarget.elements.namedItem("name") as HTMLInputElement;
    const ideaField = event.currentTarget.elements.namedItem("idea") as HTMLTextAreaElement;
    nameField.setCustomValidity(name ? "" : copy.invalidName);
    ideaField.setCustomValidity(idea.length >= 10 ? "" : copy.invalidMessage);
    if (!event.currentTarget.reportValidity()) return;
    const body = `${name}\n${email}\n\n${idea}\n\nCookie / ${locale}`;
    setMessage(body);
    setStatus("");
    if (recipient) window.location.href = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(`Cookie — ${name}`)}&body=${encodeURIComponent(body)}`;
    requestAnimationFrame(() => previewRef.current?.focus());
  }

  async function copyMessage() {
    try { await navigator.clipboard.writeText(message); setStatus(copy.copied); }
    catch { setStatus(copy.copyFailed); }
  }

  return <form className="contact-form" method="post" onSubmit={submit} aria-describedby={noteId}>
    <div className="form-row">
      <label>{copy.name}<input name="name" onInput={(event) => event.currentTarget.setCustomValidity("")} autoComplete="name" required maxLength={120} /></label>
      <label>{copy.email}<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
    </div>
    <label>{copy.message}<textarea name="idea" onInput={(event) => event.currentTarget.setCustomValidity("")} required minLength={10} maxLength={5000} rows={3} placeholder={copy.placeholder} /></label>
    <div className="form-bottom"><button className="button button-cream" type="submit" disabled={!ready}><Flower /><span>{recipient ? copy.compose : copy.preview}</span></button><p className="form-note" id={noteId}>{recipient ? copy.draftNote : copy.note}</p></div>
    <noscript><p className="form-note">{copy.noScript}</p></noscript>
    {message && <section className="message-preview" ref={previewRef} tabIndex={-1} aria-labelledby={resultId}><p className="eyebrow" id={resultId}>{copy.result}</p><pre>{message}</pre><button type="button" className="text-link" onClick={copyMessage}><Flower /><span>{copy.copy}</span></button><p role="status">{status}</p></section>}
  </form>;
}
