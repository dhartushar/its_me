"use client";

import { useGameStore } from "@/store/gameStore";

/** Covers the screen until the scene has drawn its first frame, then fades out. */
export function LoadingScreen() {
  const ready = useGameStore((state) => state.ready);

  return (
    <div
      aria-hidden={ready}
      className={`fixed inset-0 z-20 grid place-items-center bg-[#17181c] transition-opacity duration-700 ${
        ready ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center gap-4" role="status">
        <span className="loader-gem" />
        <p className="font-pixel text-sm tracking-[0.3em] text-stone-500 uppercase">Lighting the torches</p>
      </div>
    </div>
  );
}
