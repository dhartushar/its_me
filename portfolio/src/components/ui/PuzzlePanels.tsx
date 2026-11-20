"use client";

import { useState } from "react";
import { BEDCHAMBER_CODE, NOTE_ORDER, PILLARS } from "@/data/puzzles";
import { useGameStore } from "@/store/gameStore";

export function BrickNote() {
  return (
    <ol className="font-pixel mt-5 grid grid-cols-3 gap-2 border border-amber-950/50 bg-[#ddc89c] p-3 text-center text-stone-900 shadow-inner">
      {NOTE_ORDER.map((variant) => (
        <li key={variant} className="grid justify-items-center gap-2">
          <span aria-hidden="true" className="size-5 border border-black/35" style={{ backgroundColor: PILLARS[variant].color }} />
          {PILLARS[variant].name}
        </li>
      ))}
    </ol>
  );
}

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "Clear", "0", "Delete"];

export function BedchamberKeypad() {
  const [code, setCode] = useState("");
  const [incorrect, setIncorrect] = useState(false);
  const submit = useGameStore((state) => state.submitBedchamberCode);

  const press = (key: string) => {
    setIncorrect(false);
    if (key === "Clear" || key === "Delete") {
      setCode(key === "Clear" ? "" : code.slice(0, -1));
      return;
    }
    const next = code + key;
    if (next.length < BEDCHAMBER_CODE.length) {
      setCode(next);
    } else if (!submit(next)) {
      setCode("");
      setIncorrect(true);
    }
  };

  return (
    <div className="font-pixel mt-4">
      <output aria-label="Combination" className="block border border-stone-600 bg-black/45 p-2 text-center text-2xl tracking-[0.35em] text-amber-200">
        {code.padEnd(BEDCHAMBER_CODE.length, "·")}
      </output>
      <p role="status" className="mt-1 min-h-5 text-sm text-red-300">{incorrect && "That combination did not open the lock."}</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {KEYS.map((key) => (
          <button key={key} type="button" onClick={() => press(key)} className="min-h-11 border border-stone-500 bg-stone-800 text-lg text-stone-100 hover:border-amber-300 hover:text-amber-200 active:bg-stone-700">
            {key}
          </button>
        ))}
      </div>
    </div>
  );
}
