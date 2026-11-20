"use client";

import { Html } from "@react-three/drei";
import { Shape } from "three";
import { DEFAULT_ROOM_ID } from "@/rooms/types";
import { useGameStore } from "@/store/gameStore";
import { Interactive } from "./Interactive";
import { materials } from "./materials";

const DEPTH = 2.1;
const PAVEMENT_Y = -0.34;
const arrow = new Shape();
arrow.moveTo(-0.21, 0.75);
arrow.lineTo(0.21, 0.75);
arrow.lineTo(0.21, -0.06);
arrow.lineTo(0.6, -0.06);
arrow.lineTo(0, -0.75);
arrow.lineTo(-0.6, -0.06);
arrow.lineTo(-0.21, -0.06);
arrow.closePath();

interface ReturnPavementProps {
  /** Where the arrival side meets the room's edge. Local +Z points out. */
  edge: [number, number, number];
  rotationY?: number;
}

export function ReturnPavement({ edge, rotationY = 0 }: ReturnPavementProps) {
  const beginRoomTravel = useGameStore((state) => state.beginRoomTravel);
  const traveling = useGameStore((state) => state.travel !== null);
  const returnToHall = () => beginRoomTravel(DEFAULT_ROOM_ID);

  return (
    <group position={edge} rotation={[0, rotationY, 0]}>
      <group position={[0, PAVEMENT_Y, DEPTH / 2]}>
        <Interactive label="Back to Entry Hall" onActivate={returnToHall}>
          <mesh position={[0, -0.18, 0]} material={materials.trim}>
            <boxGeometry args={[2.65, 0.15, DEPTH]} />
          </mesh>
          <mesh position={[0, -0.05, 0]} material={materials.mortar} receiveShadow>
            <boxGeometry args={[1.95, 0.1, DEPTH - 0.06]} />
          </mesh>
          {[-1.14, 1.14].map((x) => (
            <mesh key={x} position={[x, -0.05, 0]} material={materials.mortar} receiveShadow>
              <boxGeometry args={[0.27, 0.1, DEPTH - 0.06]} />
            </mesh>
          ))}
          <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <shapeGeometry args={[arrow]} />
            <meshBasicMaterial color="white" toneMapped={false} />
          </mesh>
        </Interactive>
        <Html center position={[0, 0.01, 0]} zIndexRange={[2, 1]} className="pointer-events-none">
          <button
            type="button"
            aria-label="Back to Entry Hall"
            disabled={traveling}
            onClick={returnToHall}
            className="block size-12 focus-visible:outline-2 focus-visible:outline-white"
          />
        </Html>
      </group>
    </group>
  );
}
