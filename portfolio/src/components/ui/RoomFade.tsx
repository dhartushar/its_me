"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { DEFAULT_ROOM_ID } from "@/rooms/types";
import { useGameStore } from "@/store/gameStore";

export function RoomFade() {
  const curtain = useRef<HTMLDivElement>(null);
  const phase = useGameStore((state) => state.travel?.phase);
  const leavingHall = useGameStore((state) => state.currentRoomId === DEFAULT_ROOM_ID);
  const commitRoomTravel = useGameStore((state) => state.commitRoomTravel);
  const finishRoomTravel = useGameStore((state) => state.finishRoomTravel);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (phase !== "departing" && phase !== "arriving") return;
    const departing = phase === "departing";
    const advance = departing ? commitRoomTravel : finishRoomTravel;
    if (reducedMotion || !curtain.current?.animate) {
      advance();
      return;
    }

    const fade = curtain.current.animate(departing ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 1 }, { opacity: 0 }], {
      delay: departing && leavingHall ? 150 : 0,
      duration: departing ? 370 : 490,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      fill: "both",
    });
    void fade.finished.then(advance, () => {});
    return () => fade.cancel();
  }, [phase, leavingHall, commitRoomTravel, finishRoomTravel, reducedMotion]);

  return (
    <div
      ref={curtain}
      aria-hidden="true"
      className={`fixed inset-0 z-30 bg-black ${phase ? "pointer-events-auto" : "pointer-events-none"}`}
      style={{ opacity: !reducedMotion && (phase === "loading" || phase === "arriving") ? 1 : 0 }}
    />
  );
}
