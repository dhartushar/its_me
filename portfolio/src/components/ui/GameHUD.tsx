"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { menuPanels, owner, panels } from "@/data/portfolio";
import { useGameStore } from "@/store/gameStore";
import { HelpIcon, MenuIcon, ResetIcon } from "./icons";
import { InfoPanel } from "./InfoPanel";

function SquareButton({
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
      className="pointer-events-auto grid size-11 place-items-center border-2 border-stone-500/60 bg-[#141518]/80 text-stone-300 shadow-[3px_3px_0_0_rgba(0,0,0,0.5)] backdrop-blur-sm transition hover:border-amber-200/70 hover:text-amber-100 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
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

  const caption = hoveredLabel ?? (explored ? null : "Drag to look around · tap the pedestal to begin");

  return (
    <div className="pointer-events-none fixed inset-0 z-10 select-none">
      <div ref={menuRef} className="absolute top-4 left-4 flex items-start gap-2 sm:top-6 sm:left-6">
        <SquareButton label="Menu" onClick={() => setMenuOpen((open) => !open)} expanded={menuOpen}>
          <MenuIcon />
        </SquareButton>
        <SquareButton label="How to explore" onClick={() => choose("help")}>
          <HelpIcon />
        </SquareButton>

        {menuOpen && (
          <nav
            aria-label="Rooms of the portfolio"
            className="panel-enter pointer-events-auto absolute top-14 left-0 w-60 border-2 border-stone-500/60 bg-[#141518]/92 p-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.5)] backdrop-blur-md"
          >
            <p className="font-pixel px-3 pt-2 pb-1 text-xs tracking-[0.2em] text-stone-500 uppercase">
              {owner.name}
            </p>
            <ul>
              {menuPanels.map((panel) => (
                <li key={panel.id}>
                  <button
                    type="button"
                    onClick={() => choose(panel.id)}
                    className="font-pixel w-full px-3 py-2 text-left text-lg text-stone-200 transition hover:bg-amber-200/10 hover:text-amber-100"
                  >
                    {panel.menuLabel}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className="absolute top-5 right-5 hidden text-right sm:top-6 sm:right-7 sm:block">
        <p className="font-pixel text-2xl leading-tight text-stone-200">{owner.name}</p>
        <p className="font-pixel text-sm tracking-wide text-stone-500">{owner.role}</p>
      </div>

      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
        <SquareButton label="Reset camera" onClick={resetCamera}>
          <ResetIcon />
        </SquareButton>
      </div>

      {ready && caption && !activePanel && (
        <p
          key={caption}
          aria-live="polite"
          className="caption-enter font-pixel absolute bottom-6 left-1/2 max-w-[84vw] -translate-x-1/2 border border-white/10 bg-black/55 px-3 py-1.5 text-center text-xs tracking-wide text-stone-200 backdrop-blur-sm sm:bottom-9 sm:px-4 sm:py-2 sm:text-base"
        >
          {caption}
        </p>
      )}

      {activePanel && <InfoPanel panel={panels[activePanel]} onClose={closePanel} />}
    </div>
  );
}
