"use client";

import dynamic from "next/dynamic";
import { Component, type ReactNode } from "react";
import { panels } from "@/data/portfolio";
import { GameHUD } from "./ui/GameHUD";
import { LoadingScreen } from "./ui/LoadingScreen";

// three.js needs the browser, so the canvas is never rendered on the server.
const GameCanvas = dynamic(() => import("./game/GameCanvas"), { ssr: false });

/** Plain-text version of the portfolio for browsers without WebGL. */
function Fallback() {
  const sections = [panels.profile, panels.about, panels.projects, panels.skills];
  return (
    <main className="mx-auto max-w-2xl space-y-10 px-6 py-16 text-stone-300">
      <p className="text-sm text-stone-500">
        This browser could not start the 3D room, so here is the portfolio as a page.
      </p>
      {sections.map((panel) => (
        <section key={panel.id}>
          <h2 className="font-pixel text-2xl text-stone-100">{panel.title}</h2>
          {panel.subtitle && <p className="text-stone-500">{panel.subtitle}</p>}
          {panel.paragraphs?.map((text) => (
            <p key={text} className="mt-3">
              {text}
            </p>
          ))}
          {panel.items?.map((item) => (
            <p key={item.title} className="mt-3">
              <strong className="text-stone-100">{item.title}</strong> {item.meta && `(${item.meta})`} {item.text}
            </p>
          ))}
          {panel.groups?.map((group) => (
            <p key={group.label} className="mt-2">
              <strong className="text-stone-100">{group.label}:</strong> {group.tags.join(", ")}
            </p>
          ))}
          {panel.links?.map((link) => (
            <p key={link.label} className="mt-2">
              {link.label}: {link.href ? <a className="text-amber-200 underline" href={link.href}>{link.value}</a> : link.value}
            </p>
          ))}
        </section>
      ))}
    </main>
  );
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}

export function Experience() {
  return (
    <SceneBoundary>
      <main className="fixed inset-0 overflow-hidden">
        <h1 className="sr-only">Tushar Dhar, software developer: an interactive portfolio room</h1>
        <GameCanvas />
        <GameHUD />
        <LoadingScreen />
      </main>
    </SceneBoundary>
  );
}
