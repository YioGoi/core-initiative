"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import type { Copy } from "@/lib/content";

export function ContactForm({ copy, email }: { copy: Copy["contact"]; email?: string }) {
  const id = useId();
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [preview, setPreview] = useState("");
  const [copied, setCopied] = useState(false);
  const [opened, setOpened] = useState(false);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `${copy.name}: ${data.get("name")}\n${copy.email}: ${data.get("email")}\n${copy.business}: ${data.get("business") || "—"}\n\n${data.get("message")}`;
    setPreview(body);
    setCopied(false);
    if (email) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(copy.subject)}&body=${encodeURIComponent(body)}`;
      setOpened(true);
    }
  }

  async function copyMessage() {
    try { await navigator.clipboard.writeText(preview); setCopied(true); }
    catch { document.querySelector<HTMLTextAreaElement>(`#${CSS.escape(id)}-preview`)?.select(); }
  }

  return <form className="contact-form" aria-describedby={`${id}-note`} onSubmit={prepare} onChange={() => { setPreview(""); setCopied(false); setOpened(false); }}>
    <div className="field-pair">
      <label htmlFor={`${id}-name`}>{copy.name}<input id={`${id}-name`} name="name" autoComplete="name" required maxLength={120} /></label>
      <label htmlFor={`${id}-email`}>{copy.email}<input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} /></label>
    </div>
    <label htmlFor={`${id}-business`}>{copy.business} <span>({copy.optional})</span><input id={`${id}-business`} name="business" autoComplete="organization" maxLength={160} /></label>
    <label htmlFor={`${id}-message`}>{copy.message}<textarea id={`${id}-message`} name="message" rows={4} required maxLength={1800} placeholder={copy.placeholder} /></label>
    <div className="form-action"><button className="button button-dark" type="submit" disabled={!ready}>{email ? copy.submit : copy.previewSubmit}</button><p id={`${id}-note`}>{email ? copy.note : copy.previewNote}</p></div>
    <noscript><p>{copy.enable}</p></noscript>
    <div aria-live="polite" className="form-feedback">
      {preview && <div className="message-preview"><p>{opened ? copy.draftReady : copy.ready}</p><label className="sr-only" htmlFor={`${id}-preview`}>{copy.message}</label><textarea id={`${id}-preview`} readOnly value={preview} rows={7} /><button type="button" className="text-button" onClick={copyMessage}>{copied ? copy.copied : copy.copy}</button></div>}
    </div>
  </form>;
}
