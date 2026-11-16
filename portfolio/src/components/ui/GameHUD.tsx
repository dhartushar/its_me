"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { menuPanels, owner, panels } from "@/data/portfolio";
import { useGameStore } from "@/store/gameStore";
import { HelpIcon, MenuIcon, ResetIcon } from "./icons";
import { InfoPanel } from "./InfoPanel";

function RoundButton({
  label,
  onClick,
  children,
  expanded,
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
  expanded?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-expanded={expanded}
      className="pointer-events-auto grid size-11 place-items-center rounded-full border border-white/15 bg-[#141518]/70 text-stone-300 backdrop-blur-sm transition hover:border-white/30 hover:text-stone-50 active:scale-95"
    >
      {children}
    </button>
  );
}

/** Minimal overlay: menu and help top-left, camera reset bottom-left, panels on the right. */
export function GameHUD() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [explored, setExplored] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const activePanel = useGameStore((state) => state.activePanel);
  const hoveredLabel = useGameStore((state) => state.hoveredLabel);
  const ready = useGameStore((state) => state.ready);
  const openPanel = useGameStore((state) => state.openPanel);
  const closePanel = useGameStore((state) => state.closePanel);
  const resetCamera = useGameStore((state) => state.resetCamera);

  // The first opened panel retires the starting hint.
  if (activePanel !== null && !explored) setExplored(true);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closePanel]);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointer = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("pointerdown", onPointer);
    return () => window.removeEventListener("pointerdown", onPointer);
  }, [menuOpen]);

  const choose = (id: Parameters<typeof openPanel>[0]) => {
    setMenuOpen(false);
    openPanel(id);
  };

  const caption = hoveredLabel ?? (explored ? null : "Drag to look around · click the pedestal to begin");

  return (
    <div className="pointer-events-none fixed inset-0 z-10 select-none">
      <div ref={menuRef} className="absolute top-4 left-4 flex items-start gap-2 sm:top-6 sm:left-6">
        <RoundButton label="Menu" onClick={() => setMenuOpen((open) => !open)} expanded={menuOpen}>
          <MenuIcon />
        </RoundButton>
        <RoundButton label="How to explore" onClick={() => choose("help")}>
          <HelpIcon />
        </RoundButton>

        {menuOpen && (
          <nav
            aria-label="Rooms of the portfolio"
            className="panel-enter pointer-events-auto absolute top-14 left-0 w-56 rounded-2xl border border-white/10 bg-[#141518]/90 p-2 text-sm shadow-2xl shadow-black/50 backdrop-blur-md"
          >
            <p className="px-3 pt-2 pb-1 text-[11px] tracking-[0.22em] text-stone-500 uppercase">{owner.name}</p>
            <ul>
              {menuPanels.map((panel) => (
                <li key={panel.id}>
                  <button
                    type="button"
                    onClick={() => choose(panel.id)}
                    className="w-full rounded-lg px-3 py-2 text-left text-stone-200 transition hover:bg-white/10"
                  >
                    {panel.menuLabel}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className="absolute top-5 right-5 hidden text-right sm:top-7 sm:right-7 sm:block">
        <p className="font-serif text-lg text-stone-200">{owner.name}</p>
        <p className="text-xs tracking-wide text-stone-500">{owner.role}</p>
      </div>

      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
        <RoundButton label="Reset camera" onClick={resetCamera}>
          <ResetIcon />
        </RoundButton>
      </div>

      {ready && caption && !activePanel && (
        <p
          key={caption}
          aria-live="polite"
          className="caption-enter absolute bottom-7 left-1/2 max-w-[70vw] -translate-x-1/2 rounded-full bg-black/45 px-4 py-2 text-center text-xs tracking-wide text-stone-300 backdrop-blur-sm sm:bottom-9 sm:text-sm"
        >
          {caption}
        </p>
      )}

      {activePanel && <InfoPanel panel={panels[activePanel]} onClose={closePanel} />}
    </div>
  );
}
