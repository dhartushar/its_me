"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { getRoom } from "@/rooms/registry";
import { useGameStore } from "@/store/gameStore";
import { CameraController } from "./CameraController";

/** Marks the scene as ready after its first rendered frame. */
function ReadySignal() {
  const done = useRef(false);
  const setReady = useGameStore((state) => state.setReady);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    setReady();
  });
  return null;
}

/** Pointer travel (px) above which a press counts as a camera drag, not a click. */
const DRAG_THRESHOLD = 6;

export default function GameCanvas() {
  const roomId = useGameStore((state) => state.currentRoomId);
  const closePanel = useGameStore((state) => state.closePanel);
  const room = getRoom(roomId);
  const RoomComponent = room.Component;
  const isMobile = useIsMobile();
  const pressStart = useRef<[number, number] | null>(null);

  return (
    <Canvas
      onPointerDown={(event) => {
        pressStart.current = [event.clientX, event.clientY];
      }}
      // Clicking empty space (not a drag) closes whatever panel is open.
      onPointerMissed={(event) => {
        const start = pressStart.current;
        if (start && Math.hypot(event.clientX - start[0], event.clientY - start[1]) > DRAG_THRESHOLD) return;
        closePanel();
      }}
      orthographic
      shadows="percentage"
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
      camera={{ near: 0.1, far: 100, position: [20, 20, 20], zoom: 40 }}
      style={{ position: "absolute", inset: 0, touchAction: "none" }}
      aria-label={`${room.name}: an interactive 3D room`}
    >
      <color attach="background" args={[room.background]} />
      <CameraController key={room.id} config={room.camera} />
      <RoomComponent />
      <ReadySignal />
    </Canvas>
  );
}
