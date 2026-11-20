"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import { Shape } from "three";
import { PILLARS, type PillarVariant } from "@/data/puzzles";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { useGameStore } from "@/store/gameStore";
import { Interactive } from "./Interactive";
import { materials } from "./materials";

interface TorchProps {
  /** Mount point on the wall face. Local +Z points out of the wall. */
  position: [number, number, number];
  rotationY: number;
  /** Offsets the flicker so torches do not pulse in sync. */
  phase: number;
  lit?: boolean;
}

export function Torch({ position, rotationY, phase, lit = true }: TorchProps) {
  const flame = useRef<Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.elapsedTime + phase;
    const flicker = 1 + Math.sin(t * 9.1) * 0.06 + Math.sin(t * 15.7) * 0.04 + Math.sin(t * 3.3) * 0.05;
    if (flame.current) {
      flame.current.scale.set(1, flicker * 1.05, 1);
      flame.current.rotation.y = t * 1.5;
    }
  });

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <mesh position={[0, 0, 0.12]} material={materials.iron} castShadow>
        <boxGeometry args={[0.16, 0.36, 0.1]} />
      </mesh>
      <mesh position={[0, 0.08, 0.32]} rotation={[0.5, 0, 0]} material={materials.iron} castShadow>
        <boxGeometry args={[0.06, 0.06, 0.4]} />
      </mesh>
      <mesh position={[0, 0.24, 0.46]} rotation={[0, Math.PI / 6, 0]} material={materials.woodDark} castShadow>
        <cylinderGeometry args={[0.1, 0.06, 0.32, 6]} />
      </mesh>
      {lit && (
        <>
          <mesh ref={flame} position={[0, 0.52, 0.46]} material={materials.flame}>
            <coneGeometry args={[0.09, 0.3, 5]} />
          </mesh>
          <pointLight position={[0, 0.75, 0.7]} color="#ff9d4d" intensity={3.5} distance={5.5} decay={2} />
        </>
      )}
    </group>
  );
}

const arrow = new Shape();
arrow.moveTo(-0.05, 0.18);
arrow.lineTo(0.05, 0.18);
arrow.lineTo(0.05, 0);
arrow.lineTo(0.15, 0);
arrow.lineTo(0, -0.18);
arrow.lineTo(-0.15, 0);
arrow.lineTo(-0.05, 0);
arrow.closePath();

export function PuzzleTorch({ variant, position, rotationY, phase }: Omit<TorchProps, "lit"> & { variant: PillarVariant }) {
  const lit = useGameStore((state) => state.litTorches[variant]);
  const lightTorch = useGameStore((state) => state.lightTorch);
  const clue = PILLARS[variant];

  return (
    <Interactive label="Torch" position={position} rotationY={rotationY} onActivate={() => lightTorch(variant)}>
      <Torch position={[0, 0, 0]} rotationY={0} phase={phase} lit={lit} />
      <mesh position={[0, 0.25, 0.32]}>
        <boxGeometry args={[0.66, 1.12, 0.55]} />
        <meshBasicMaterial colorWrite={false} depthWrite={false} />
      </mesh>
      {lit && (
        <group position={[0, -0.48, 0.09]}>
          <mesh material={materials.trim}>
            <boxGeometry args={[0.56, 0.54, 0.12]} />
          </mesh>
          <mesh position={[0, 0, 0.065]} rotation={[0, 0, clue.direction * Math.PI / 2]}>
            <shapeGeometry args={[arrow]} />
            <meshBasicMaterial color={clue.color} toneMapped={false} />
          </mesh>
        </group>
      )}
    </Interactive>
  );
}
