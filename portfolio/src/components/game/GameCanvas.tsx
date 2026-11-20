"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Fragment, useRef } from "react";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { getRoom } from "@/rooms/registry";
import type { RoomId } from "@/rooms/types";
import { useGameStore } from "@/store/gameStore";
import { CameraController } from "./CameraController";

/** Wait until the renderer has drawn a frame of this room before revealing it. */
function ReadySignal({ roomId }: { roomId: RoomId }) {
  const frames = useRef(0);
  const roomRendered = useGameStore((state) => state.roomRendered);
  useFrame(() => {
    if (frames.current < 2 && ++frames.current === 2) roomRendered(roomId);
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
      <Fragment key={room.id}>
        <CameraController config={room.camera} />
        <RoomComponent />
        <ReadySignal roomId={room.id} />
      </Fragment>
    </Canvas>
  );
}
