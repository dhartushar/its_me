"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh, PointLight } from "three";
import { useReducedMotion } from "@/hooks/useMediaQuery";
import { materials } from "./materials";

interface TorchProps {
  /** Mount point on the wall face. Local +Z points out of the wall. */
  position: [number, number, number];
  rotationY: number;
  /** Offsets the flicker so torches do not pulse in sync. */
  phase: number;
}

const BASE_INTENSITY = 3.5;

export function Torch({ position, rotationY, phase }: TorchProps) {
  const flame = useRef<Mesh>(null);
  const light = useRef<PointLight>(null);
  const reducedMotion = useReducedMotion();

  useFrame(({ clock }) => {
    if (reducedMotion) return;
    const t = clock.elapsedTime + phase;
    const flicker = 1 + Math.sin(t * 9.1) * 0.06 + Math.sin(t * 15.7) * 0.04 + Math.sin(t * 3.3) * 0.05;
    if (light.current) light.current.intensity = BASE_INTENSITY * flicker;
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
      <mesh ref={flame} position={[0, 0.52, 0.46]} material={materials.flame}>
        <coneGeometry args={[0.09, 0.3, 5]} />
      </mesh>
      <pointLight
        ref={light}
        position={[0, 0.75, 0.7]}
        color="#ff9d4d"
        intensity={BASE_INTENSITY}
        distance={5.5}
        decay={2}
      />
    </group>
  );
}
