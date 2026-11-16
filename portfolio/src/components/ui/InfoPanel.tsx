"use client";

import { useEffect, useRef } from "react";
import type { PanelContent } from "@/data/portfolio";
import { CloseIcon } from "./icons";

interface InfoPanelProps {
  panel: PanelContent;
  onClose: () => void;
}

/** Dark translucent card: a side panel on desktop, a bottom sheet on phones. */
export function InfoPanel({ panel, onClose }: InfoPanelProps) {
  const dialog = useRef<HTMLElement>(null);
  const titleId = `panel-title-${panel.id}`;

  // Move keyboard focus into the panel so Tab reaches its links and Escape closes it.
  useEffect(() => {
    dialog.current?.focus({ preventScroll: true });
  }, [panel.id]);

  return (
    <section
      key={panel.id}
      ref={dialog}
      tabIndex={-1}
      role="dialog"
      aria-labelledby={titleId}
      className="panel-enter outline-none pointer-events-auto fixed inset-x-3 bottom-3 max-h-[68dvh] overflow-y-auto rounded-2xl border border-white/10 bg-[#141518]/85 p-6 text-stone-200 shadow-2xl shadow-black/60 backdrop-blur-md sm:inset-x-auto sm:top-1/2 sm:right-6 sm:bottom-auto sm:max-h-[min(82dvh,720px)] sm:w-[400px] sm:-translate-y-1/2"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close panel"
        className="absolute top-4 right-4 grid size-9 place-items-center rounded-full text-stone-400 transition hover:bg-white/10 hover:text-stone-100"
      >
        <CloseIcon />
      </button>

      <p className="text-[11px] font-medium tracking-[0.22em] text-amber-300/80 uppercase">{panel.eyebrow}</p>
      <h2 id={titleId} className="mt-2 pr-10 font-serif text-2xl text-stone-50">
        {panel.title}
      </h2>
      {panel.subtitle && <p className="mt-1 text-sm text-stone-400">{panel.subtitle}</p>}

      {panel.paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-[15px] leading-relaxed text-stone-300">
          {paragraph}
        </p>
      ))}

      {panel.items && (
        <div className="mt-5">
          {panel.itemsHeading && (
            <h3 className="mb-3 text-[11px] font-medium tracking-[0.22em] text-stone-500 uppercase">
              {panel.itemsHeading}
            </h3>
          )}
          <ul className="space-y-3">
            {panel.items.map((item) => (
              <li key={item.title} className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                {item.meta && <p className="text-xs text-amber-300/70">{item.meta}</p>}
                <p className="font-medium text-stone-100">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-stone-400">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {panel.groups && (
        <div className="mt-5 space-y-4">
          {panel.groups.map((group) => (
            <div key={group.label}>
              <h3 className="mb-2 text-[11px] font-medium tracking-[0.22em] text-stone-500 uppercase">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {group.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-stone-200"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {panel.links && (
        <dl className="mt-5 divide-y divide-white/5 rounded-xl border border-white/5 bg-white/[0.03]">
          {panel.links.map((link) => (
            <div key={link.label} className="flex items-baseline justify-between gap-4 px-4 py-3 text-sm">
              <dt className="text-stone-500">{link.label}</dt>
              <dd className="min-w-0 truncate text-right">
                {link.href ? (
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-amber-200 underline-offset-4 hover:underline"
                  >
                    {link.value}
                  </a>
                ) : (
                  <span className="text-stone-300">{link.value}</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
